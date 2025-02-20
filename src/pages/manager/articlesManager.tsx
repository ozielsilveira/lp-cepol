// import { Add, Delete, Edit } from "@mui/icons-material";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   MenuItem,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";
// import {
//   Article,
//   createArticle,
//   deleteArticle,
//   fetchArticles,
//   updateArticle,
// } from "../../redux/slices/articlesSlice";
// import { fetchProfessionals } from "../../redux/slices/professionalSlice";
// import { ImageInput } from "../../components/imageInput";

// export const ArticlesManager: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const professionalList = useAppSelector((state) => state.professional.list);
//   const loading = useAppSelector((state) => state.articles.loading);
//   const { list } = useSelector((state: IRootState) => state.articles);
//   const { register, handleSubmit, reset, setValue, control } = useForm<Article>();
//   const [open, setOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (!list || list.length === 0) {
//       dispatch(fetchArticles());
//     }
//     if (professionalList.length === 0) {
//       dispatch(fetchProfessionals());
//     }
//   }, [dispatch, list]);

//   const handleOpen = () => {
//     setOpen(true);
//     setIsEditing(false);
//     reset();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     reset();
//   };
//  ;
//   const onSubmit: SubmitHandler<Article> = async (data) => {
//       try {
//           if (isEditing) {
//             if (data.id) {
//               await dispatch(
//                 updateArticle(data as Required<Article>)
//               ).unwrap();
//             }
//           } else {
//             await dispatch(createArticle(data)).unwrap();
//           }
//           handleClose();
//           dispatch(fetchArticles()); // Atualiza a lista após a ação
//         } catch (error) {
//           console.error("Erro ao salvar article:", error);
//         }
//   };

//   const handleEdit = (article: Article) => {
//     setIsEditing(true);
//     setOpen(true);
//     setValue("id", article.id);
//     setValue("title", article.title);
//     setValue("description", article.description);
//     setValue("author", article.author);
//     setValue("publishedDate", article.publishedDate);
//     setValue("bodyText", article.bodyText);
//     setValue("secondText", article.secondText);
//     setValue("images.0.title", article.images?.[0]?.title || "");
//     setValue("images.0.description", article.images?.[0]?.description || "");
//     setValue("images.0.url", article.images?.[0]?.url || "");
//     setValue("images.1.title", article.images?.[1]?.title || "");
//     setValue("images.1.description", article.images?.[1]?.description || "");
//     setValue("images.1.url", article.images?.[1]?.url || "");
//     setValue("professionalId", article.professionalId || "");
//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this professional?")) {
//       dispatch(deleteArticle(id));
//     }
//   };

//     const { result: imageOneUrl, loading: uploadLoading } = useAppSelector(
//       (state) => state.image
//     );

//    useEffect(() => {
//       if (imageOneUrl) {
//         setValue("images.0.url", imageOneUrl); // Atualiza o campo imageUrl quando o upload é concluído
//       }
//     }, [imageOneUrl, setValue]);

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h4">Article Manager</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={handleOpen}
//         >
//           Add Article
//         </Button>
//       </Box>
//  {loading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", width:"100%", my: 4 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>description</TableCell>
//               {/* <TableCell>author</TableCell>
//                             <TableCell>publishedDate</TableCell> */}
//               <TableCell>bodyText</TableCell>
//               <TableCell>secondText</TableCell>
//               <TableCell>Image One Title</TableCell>
//               <TableCell>Image One Description</TableCell>
//               <TableCell>Image One url</TableCell>
//               <TableCell>Image Two Title</TableCell>
//               <TableCell>Image Two Description</TableCell>
//               <TableCell>Image Two url</TableCell>
//               <TableCell>Professional</TableCell>
//               <TableCell align="right">Ações</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Array.isArray(list) &&
//               list.map((articles) => (
//                 <TableRow key={articles.id}>
//                   <TableCell>{articles.title}</TableCell>
//                   <TableCell>{articles.description}</TableCell>
//                   {/* <TableCell>{articles.author}</TableCell>
//                                 <TableCell>{articles.publishedDate}</TableCell> */}
//                   <TableCell>{articles.bodyText}</TableCell>
//                   <TableCell>{articles.secondText}</TableCell>
//                   <TableCell>
//                     {articles.images?.[0]?.title || "No Image"}
//                   </TableCell>
//                   <TableCell>
//                     {articles.images?.[0]?.description || "No Image"}
//                   </TableCell>
//                   <TableCell>
//                     {articles.images?.[0]?.url || "No Image"}
//                   </TableCell>
//                   <TableCell>
//                     {articles.images?.[1]?.title || "No Image"}
//                   </TableCell>
//                   <TableCell>
//                     {articles.images?.[1]?.description || "No Image"}
//                   </TableCell>
//                   <TableCell>
//                     {articles.images?.[1]?.url || "No Image"}
//                   </TableCell>

//                   <TableCell>{articles.professional?.name}</TableCell>

//                   <TableCell align="right">
//                     <IconButton
//                       color="primary"
//                       onClick={() => handleEdit(articles)}
//                     >
//                       <Edit />
//                     </IconButton>
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(articles.id)}
//                     >
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
// )}
//       <Dialog open={open} onClose={handleClose}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <DialogTitle>
//             {isEditing ? "Edit Professional" : "Add Professional"}
//           </DialogTitle>
//           <DialogContent>
//             <TextField
//               {...register("title")}
//               label="title"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("description")}
//               label="Description"
//               fullWidth
//               margin="normal"
//               required
//             />
//             {/* <TextField
//                             {...register('author')}
//                             label="Author"
//                             fullWidth
//                             margin="normal"
//                             required
//                         />
//                         <TextField
//                             {...register('publishedDate')}
//                             label="Published Date"
//                             fullWidth
//                             margin="normal"
//                             required
//                         /> */}
//             <TextField
//               {...register("bodyText")}
//               label="Body text"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("secondText")}
//               label="Second Text"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("images.0.title")}
//               label="Image One Title"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("images.0.description")}
//               label="Image One Description"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("images.0.url")}
//               label="Image One url"
//               fullWidth
//               margin="normal"
//               required
//             />
//               <ImageInput imageUrl={imageOneUrl} 
//                         // handleImage={handleImage} 
//                         uploadLoading={uploadLoading}></ImageInput>
//              <TextField
//               {...register("images.1.title")}
//               label="Image Two Title"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("images.1.description")}
//               label="Image Two Description"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("images.1.url")}
//               label="Image Two One url"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <Controller
//               name="professionalId"
//               control={control}
//               render={({ field }) => (
//             <TextField
//             {...field}
//               label="Professional"
//               fullWidth
//               select
//               margin="normal"
//               required
//               value={field.value || ""} 
//               onChange={(e) => field.onChange(e.target.value)} 
//             >
//               {professionalList &&
//                 professionalList.map((type) => (
//                   <MenuItem value={type.id} key={type.id}>
//                     {type.name}
//                   </MenuItem>
//                 ))}
//             </TextField>)
//           } />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button type="submit" variant="contained" color="primary">
//               {isEditing ? "Update" : "Add"}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </Box>
//   );
// };

import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";
import {
  Article,
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from "../../redux/slices/articlesSlice";
import { fetchProfessionals } from "../../redux/slices/professionalSlice";
import { ImageInput } from "../../components/imageInput";

export const ArticlesManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const professionalList = useAppSelector((state) => state.professional.list);
  const loading = useAppSelector((state) => state.articles.loading);
  const { list } = useSelector((state: IRootState) => state.articles);
  const { imageOneUrl, imageTwoUrl, loading: uploadLoading } = useAppSelector(
    (state) => state.image
  );

  const { register, handleSubmit, reset, setValue, control } = useForm<Article>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!list || list.length === 0) {
      dispatch(fetchArticles());
    }
    if (professionalList.length === 0) {
      dispatch(fetchProfessionals());
    }
  }, [dispatch, list]);

  useEffect(() => {
    if (imageOneUrl) {
      setValue("images.0.url", imageOneUrl);
    }
    if (imageTwoUrl) {
      setValue("images.1.url", imageTwoUrl);
    }
  }, [imageOneUrl, imageTwoUrl, setValue]);

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
          await dispatch(updateArticle(data as Required<Article>)).unwrap();
        }
      } else {
        await dispatch(createArticle(data)).unwrap();
      }
      handleClose();
      dispatch(fetchArticles());
    } catch (error) {
      console.error("Erro ao salvar article:", error);
    }
  };

  const handleEdit = (article: Article) => {
    setIsEditing(true);
    setOpen(true);
    setValue("id", article.id);
    setValue("title", article.title);
    setValue("description", article.description);
    setValue("author", article.author);
    setValue("publishedDate", article.publishedDate);
    setValue("bodyText", article.bodyText);
    setValue("secondText", article.secondText);
    setValue("images.0.title", article.images?.[0]?.title || "");
    setValue("images.0.description", article.images?.[0]?.description || "");
    setValue("images.0.url", article.images?.[0]?.url || "");
    setValue("images.1.title", article.images?.[1]?.title || "");
    setValue("images.1.description", article.images?.[1]?.description || "");
    setValue("images.1.url", article.images?.[1]?.url || "");
    setValue("professionalId", article.professionalId || "");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(deleteArticle(id));
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Article Manager</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpen}>
          Add Article
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>description</TableCell>
                <TableCell>bodyText</TableCell>
                <TableCell>secondText</TableCell>
                <TableCell>Image One Title</TableCell>
                <TableCell>Image One Description</TableCell>
                <TableCell>Image One url</TableCell>
                <TableCell>Image Two Title</TableCell>
                <TableCell>Image Two Description</TableCell>
                <TableCell>Image Two url</TableCell>
                <TableCell>Professional</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(list) &&
                list.map((articles) => (
                  <TableRow key={articles.id}>
                    <TableCell>{articles.title}</TableCell>
                    <TableCell>{articles.description}</TableCell>
                    <TableCell>{articles.bodyText}</TableCell>
                    <TableCell>{articles.secondText}</TableCell>
                    <TableCell>{articles.images?.[0]?.title || "No Image"}</TableCell>
                    <TableCell>{articles.images?.[0]?.description || "No Image"}</TableCell>
                    <TableCell>{articles.images?.[0]?.url || "No Image"}</TableCell>
                    <TableCell>{articles.images?.[1]?.title || "No Image"}</TableCell>
                    <TableCell>{articles.images?.[1]?.description || "No Image"}</TableCell>
                    <TableCell>{articles.images?.[1]?.url || "No Image"}</TableCell>
                    <TableCell>{articles.professional?.name}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEdit(articles)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(articles.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{isEditing ? "Edit Article" : "Add Article"}</DialogTitle>
          <DialogContent>
            <TextField {...register("title")} label="title" fullWidth margin="normal" required />
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("bodyText")}
              label="Body text"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("secondText")}
              label="Second Text"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("images.0.title")}
              label="Image One Title"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("images.0.description")}
              label="Image One Description"
              fullWidth
              margin="normal"
              required
            />
            <ImageInput
              imageUrl={imageOneUrl}
              uploadLoading={uploadLoading}
              imageType="imageOne"
            />
            <TextField
              {...register("images.1.title")}
              label="Image Two Title"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("images.1.description")}
              label="Image Two Description"
              fullWidth
              margin="normal"
              required
            />
            <ImageInput
              imageUrl={imageTwoUrl}
              uploadLoading={uploadLoading}
              imageType="imageTwo"
            />
            <Controller
              name="professionalId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Professional"
                  fullWidth
                  select
                  margin="normal"
                  required
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {professionalList &&
                    professionalList.map((type) => (
                      <MenuItem value={type.id} key={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                </TextField>
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={uploadLoading}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};