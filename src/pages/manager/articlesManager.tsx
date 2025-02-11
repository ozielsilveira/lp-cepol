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
import { AppDispatch, IRootState } from '../../redux/store';
import { Article, createArticle, deleteArticle, fetchArticles, updateArticle } from '../../redux/slices/articlesSlice';

export const ArticlesManager: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list } = useSelector((state: IRootState) => state.articles);
    console.log(list);
    const { register, handleSubmit, reset, setValue } = useForm<Article>();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!list || list.length === 0) {
            dispatch(fetchArticles());
        }
    }, [dispatch, list]);

    const handleOpen = () => {
        setOpen(true);
        setIsEditing(false);
        reset();
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

  const onSubmit: SubmitHandler<Article> = async (data) => {
    try {
      if (isEditing) {
        if (data.id) {
          dispatch(updateArticle(data as Required<Article>));
          
        }
      } else {
        await dispatch(createArticle(data)).unwrap();
        console.log("data", data);
      }
      handleClose();
      dispatch(fetchArticles()); // Atualiza a lista após a ação
    } catch (error) {
      console.error("Erro ao salvar Article:", error);
    }
   
  };

    const handleEdit = (article: Article) => {
        setIsEditing(true);
        setOpen(true);
        setValue('id', article.id);
        setValue('title', article.title);
        setValue('description', article.description);
        setValue('author', article.author);
        setValue('publishedDate', article.publishedDate);
        setValue('bodyText', article.bodyText);
        setValue('secondText', article.secondText);
        setValue('images.0.title', article.images?.[0]?.title || '');
        setValue('images.0.description', article.images?.[0]?.description || '');
        setValue('images.0.url', article.images?.[0]?.url || '');
       

    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this professional?')) {
            dispatch(deleteArticle(id));
        }
    };

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Article Manager</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    Add Article
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>description</TableCell>
                            {/* <TableCell>author</TableCell>
                            <TableCell>publishedDate</TableCell> */}
                            <TableCell>bodyText</TableCell>
                            <TableCell>secondText</TableCell>
                            <TableCell>Image Title</TableCell>
                            <TableCell>Image Description</TableCell>
                            <TableCell>Image url</TableCell>

                            <TableCell>Professional</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(list) && list.map((articles) => (
                            <TableRow key={articles.id}>
                                <TableCell>{articles.title}</TableCell>
                                <TableCell>{articles.description}</TableCell>
                                {/* <TableCell>{articles.author}</TableCell>
                                <TableCell>{articles.publishedDate}</TableCell> */}
                                <TableCell>{articles.bodyText}</TableCell>
                                <TableCell>{articles.secondText}</TableCell>
                                <TableCell>{articles.images?.[0]?.title || 'No Image'}</TableCell>
                                <TableCell>{articles.images?.[0]?.description || 'No Image'}</TableCell>
                                <TableCell>{articles.images?.[0]?.url || 'No Image'}</TableCell>


                                <TableCell>{articles.professional?.name}</TableCell>


                    
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleEdit(articles)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(articles.id)}
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
                        {/* <TextField
                            {...register('author')}
                            label="Author"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            {...register('publishedDate')}
                            label="Published Date"
                            fullWidth
                            margin="normal"
                            required
                        /> */}
                        <TextField
                            {...register('bodyText')}
                            label="Body text"
                            fullWidth
                            margin="normal"
                            required
                           
                            
                        />
                          <TextField
                            {...register('secondText')}
                            label="Second Text"
                            fullWidth
                            margin="normal"
                            required
                           
                            
                        />
                        <TextField
                            {...register('images.0.title')}
                            label="Image Title"
                            fullWidth
                            margin="normal"
                            required
                           
                        />
                           <TextField
                            {...register('images.0.description')}
                            label="Image Description"
                            fullWidth
                            margin="normal"
                            required
                           
                        />
                        <TextField
                            {...register('images.0.url')}
                            label="Image One url"
                            fullWidth
                            margin="normal"
                            required
                           
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

