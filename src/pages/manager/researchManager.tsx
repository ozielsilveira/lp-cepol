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
import { createResearch, deleteResearch, fetchResearch, Research, updateResearch } from '../../redux/slices/researchSlice';
import { AppDispatch, IRootState } from '../../redux/store';

export const ResearchManager: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list } = useSelector((state: IRootState) => state.research);
    console.log(list);
    const { register, handleSubmit, reset, setValue } = useForm<Research>();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {

        dispatch(fetchResearch());

    }, [dispatch]);

    const handleOpen = () => {
        setOpen(true);
        setIsEditing(false);
        reset();
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<Research> = (data) => {
        if (isEditing) {
            if (data.id) {
                dispatch(updateResearch(data as Required<Research>));
            }
        } else {
            dispatch(createResearch(data));
        }
        handleClose();
    };

    const handleEdit = (research: Research) => {
        setIsEditing(true);
        setOpen(true);
        setValue('id', research.id);
        setValue('title', research.title);
        setValue('description', research.description);
        setValue('bodyText', research.bodyText);
        setValue('secondText', research.secondText);
        // setValue('imageUrl', research.imageUrl);
        // setValue('createdAt', research.createdAt);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this research?')) {
            dispatch(deleteResearch(id));
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Research Manager</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    Add Research
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>bodyText</TableCell>
                            <TableCell>secondText</TableCell>



                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(list) && list.map((research) => (
                            <TableRow key={research.id}>
                                <TableCell>{research.title}</TableCell>
                                <TableCell>{research.description}</TableCell>
                                <TableCell>{research.bodyText}</TableCell>
                                <TableCell>{research.secondText}</TableCell>


                                {/* <TableCell>
                                    {new Date(research.createdAt).toLocaleString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}
                                </TableCell> */}
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(research)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(research.id)}
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
                            {...register('title')}
                            label="title"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('description')}
                            label="Description"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('bodyText')}
                            label="BodyText"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('secondText')}
                            label="SecondText "
                            fullWidth
                            margin="normal"
                            required
                        />
                        {/* <TextField
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
                        /> */}
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

