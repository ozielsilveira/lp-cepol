import { GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";
import CryptoJS from "crypto-js";

// Obtém variáveis de ambiente e verifica se todas estão definidas
const getEnvVariables = () => {
    const envVars = {
        region: import.meta.env.VITE_CLOUDFLARE_R2_REGION || '',
        endpoint: import.meta.env.VITE_CLOUDFLARE_R2_ENDPOINT || '',
        accessKeyId: import.meta.env.VITE_CLOUDFLARE_R2_ACCESS_KEY_ID || '',
        secretAccessKey: import.meta.env.VITE_CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
        bucketName: import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_NAME || '',
    };

    const missingEnvVars = Object.entries(envVars)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
    }

    return envVars as Required<typeof envVars>;
};

// Inicializa o cliente S3 apenas quando necessário
let s3Client: S3Client | null = null;

const getS3Client = async () => {
    if (!s3Client) {
        const { region, endpoint, accessKeyId, secretAccessKey } = getEnvVariables();

        if (!accessKeyId || !secretAccessKey) {
            throw new Error("Missing required AWS credentials");
        }

        s3Client = new S3Client({
            region,
            endpoint,
            credentials: {
                accessKeyId,
                secretAccessKey
            },
        });
    }

    return s3Client;
};

// Função auxiliar para calcular o hash SHA-256 de um buffer usando crypto nativo
const generateFileHash = async (buffer: Buffer): Promise<string> => {
    const wordArray = CryptoJS.lib.WordArray.create(buffer);

    return CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
};

// Upload de arquivo para R2
export const UploadFileToR2 = async (file: File, key: string): Promise<string> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Gera um hash único baseado no conteúdo do arquivo
        const hash = await generateFileHash(buffer);
        const uniqueKey = `${key}-${hash}`;

        const { bucketName } = getEnvVariables();

        const params = {
            Bucket: bucketName,
            Key: uniqueKey,
            Body: buffer,
            ContentType: file.type,
            ACL: 'public-read' as ObjectCannedACL,
        };

        const s3 = await getS3Client();
        const a = await s3.send(new PutObjectCommand(params));
        console.log("retorno:", a);
        // Construir a URL no formato correto
        const endpointParts = import.meta.env.VITE_CLOUDFLARE_R2_ENDPOINT.split('.');
        const correctEndpoint = `${endpointParts[1]}.${endpointParts[2]}.${endpointParts[3]}`;

        return `https://${correctEndpoint}/${uniqueKey}`;
    } catch (error) {
        console.error("Erro no upload para R2:", error);
        throw new Error("Falha ao fazer upload do arquivo.");
    }
};

// Recupera um arquivo do R2
export const GetFileFromR2 = async (key: string): Promise<File> => {
    try {
        const params = { Bucket: getEnvVariables().bucketName, Key: key };
        const { Body } = await (await getS3Client()).send(new GetObjectCommand(params));

        if (!Body || !(Body instanceof ReadableStream)) {
            throw new Error("Resposta inválida do servidor.");
        }

        // Convertendo ReadableStream para Buffer
        const reader = Body.getReader();
        const chunks: Uint8Array[] = [];

        let done = false;
        while (!done) {
            const { value, done: chunkDone } = await reader.read();
            if (value) chunks.push(value);
            done = chunkDone;
        }

        const buffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));

        return new File([buffer], key);
    } catch (error) {
        console.error("Erro ao buscar arquivo do R2:", error);
        throw new Error("Falha ao recuperar arquivo.");
    }
};