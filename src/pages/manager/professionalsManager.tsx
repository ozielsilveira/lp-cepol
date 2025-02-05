import { Add, Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProfessional,
    deleteProfessional,
    fetchProfessionals,
    Professional,
    updateProfessional,
} from '../../redux/slices/professionalSlice';
import { AppDispatch, IRootState } from '../../redux/store';

const ProfessionalManager: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list } = useSelector((state: IRootState) => state.professional);
    const { register, handleSubmit, reset, setValue } = useForm<Professional>();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (list.length === 0) {
            dispatch(fetchProfessionals());
        }
    }, [dispatch, list.length]);

    const handleOpen = () => {
        setOpen(true);
        setIsEditing(false);
        reset();
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<Professional> = (data) => {
        if (isEditing) {
            if (data.id) {
                dispatch(updateProfessional(data as Required<Professional>));
            }
        } else {
            dispatch(createProfessional(data));
        }
        handleClose();
    };

    const handleEdit = (professional: Professional) => {
        setIsEditing(true);
        setOpen(true);
        setValue('id', professional.id);
        setValue('name', professional.name);
        setValue('role', professional.role);
        setValue('bio', professional.bio);
        setValue('hierarchy', professional.hierarchy);
        setValue('imageUrl', professional.imageUrl);
        setValue('createdAt', professional.createdAt);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this professional?')) {
            dispatch(deleteProfessional(id));
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Professional Manager</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    Add Professional
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Cargo</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Image URL</TableCell>
                            <TableCell>Hierarchy</TableCell>

                            <TableCell>Criado em</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(list) && list.map((professional) => (
                            <TableRow key={professional.id}>
                                <TableCell>{professional.name}</TableCell>
                                <TableCell>{professional.role}</TableCell>
                                <TableCell>{professional.bio}</TableCell>
                                <TableCell>{professional.imageUrl}</TableCell>
                                <TableCell>{professional.hierarchy}</TableCell>

                                <TableCell>
                                    {new Date(professional.createdAt).toLocaleString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(professional)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(professional.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{isEditing ? 'Edit Professional' : 'Add Professional'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            {...register('name')}
                            label="Name"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('role')}
                            label="Role"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('bio')}
                            label="Bio"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('imageUrl')}
                            label="Image URL"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('hierarchy', { valueAsNumber: true })}
                            label="hierarchy"
                            fullWidth
                            margin="normal"
                            required
                            type="number"
                            
                        />
                        <TextField
                            {...register('createdAt')}
                            label="Created At"
                            fullWidth
                            margin="normal"
                            required
                            type="datetime-local"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default ProfessionalManager;