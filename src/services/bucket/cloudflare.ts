import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from 'stream';
import crypto from 'crypto';

// GET ENV VARIABLES
const getEnvVariables = () => {
    const envVars = {
        region: process.env.CLOUDFLARE_R2_REGION,
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
        bucketName: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    };

    const missingEnvVars = Object.entries(envVars).filter(([value]) => !value).map(([key]) => key);

    if (missingEnvVars.length > 0) {
        console.error("Missing environment variables:", missingEnvVars);
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    return envVars;
};

// SEND FILE TO R2
export const UploadFileToR2 = async (file: File, key: string) => {
    const { accessKeyId, bucketName, endpoint, region, secretAccessKey } = getEnvVariables();

    if (!region || !endpoint || !accessKeyId || !secretAccessKey || !bucketName) {
        console.error("Missing environment variables:", {
            region,
            endpoint,
            accessKeyId,
            secretAccessKey,
            bucketName,
        });
        throw new Error("Missing required environment variables.");
    }

    const s3Client = new S3Client({
        region,
        endpoint,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a unique hash for the file
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    const uniqueKey = `${key}-${hash}`;

    const params = {
        Bucket: bucketName,
        Key: uniqueKey,
        Body: buffer,
        ContentType: file.type,
    };

    try {
        const s3 = await s3Client.send(new PutObjectCommand(params));
        console.log(`Upload para R2 bem-sucedido: ${s3}`);
        const fileUrl = `${endpoint}/${uniqueKey}`;
        return fileUrl;
    } catch (error) {
        console.error("Erro no upload para R2:", error);
        throw new Error("Upload falhou.");
    }
};

// GET FILE FROM R2
export const GetFileFromR2 = async (key: string): Promise<File> => {
    const { accessKeyId, bucketName, endpoint, region, secretAccessKey } = getEnvVariables();

    const s3Client = new S3Client({
        region: region!,
        endpoint: endpoint!,
        credentials: {
            accessKeyId: accessKeyId!,
            secretAccessKey: secretAccessKey!,
        },
    });

    const params = {
        Bucket: bucketName!,
        Key: key,
    };

    try {
        const { Body } = await s3Client.send(new GetObjectCommand(params));

        if (!(Body instanceof Readable)) {
            throw new Error("Received body is not a readable stream.");
        }

        const chunks: Buffer[] = [];
        for await (const chunk of Body) {
            chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);
        const blob = new Blob([buffer]);
        return new File([blob], key);
    } catch (error) {
        console.error("Error fetching file from R2:", error);
        throw new Error(`File fetch failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
};

