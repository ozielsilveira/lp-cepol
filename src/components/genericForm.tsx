import { Box, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

interface FormData {
    title: string;
    description: string;
}

interface GenericFormProps {
    item: FormData;
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    itemType: string;
}

export default function GenericForm({ item, onSubmit, onCancel, itemType }: GenericFormProps) {
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: item,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label={`Título do ${itemType}`}
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label={`Descrição do ${itemType}`}
                            multiline
                            rows={4}
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="button" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained">
                        Salvar
                    </Button>
                </Box>
            </Box>
        </form>
    );
}

