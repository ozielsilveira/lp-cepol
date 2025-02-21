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
// import {
//   createResearch,
//   deleteResearch,
//   fetchResearch,
//   Research,
//   updateResearch,
// } from "../../redux/slices/researchSlice";
// import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";
// import { fetchProfessionals } from "../../redux/slices/professionalSlice";
// import { ImageInput } from "../../components/imageInput";
// // import { TextFieldForms } from "../../components/texfFieldForms";

// export const ResearchManager: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { list } = useSelector((state: IRootState) => state.research);
//   const professionalList = useAppSelector((state) => state.professional.list);
//   const { register, handleSubmit, reset, setValue, control } =
//     useForm<Research>();
//   const [open, setOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const loading = useAppSelector((state) => state.research.loading);
//   const {imageOneUrl, imageTwoUrl, loading: uploadLoading} = useAppSelector((state) => state.image);

//   useEffect(() => {
//     if (list.length === 0) {
//       dispatch(fetchResearch());
//     }
//     if (professionalList.length === 0) {
//       dispatch(fetchProfessionals());
//     }
//     // dispatch(fetchResearch());
//   }, [dispatch]);

//   const handleOpen = () => {
//     setOpen(true);
//     setIsEditing(false);
//     reset();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     reset();
//   };

//   const onSubmit: SubmitHandler<Research> = async (data) => {
//     try {
//       if (isEditing) {
//         if (data.id) {
//           await dispatch(updateResearch(data as Required<Research>)).unwrap();
//         }
//       } else {
//         await dispatch(createResearch(data)).unwrap();
//       }
//       handleClose();
//       dispatch(fetchResearch()); // Atualiza a lista após a ação
//     } catch (error) {
//       console.error("Erro ao salvar research:", error);
//     }
//   };

//   const handleEdit = (research: Research) => {
//     setIsEditing(true);
//     setOpen(true);
//     setValue("id", research.id);
//     setValue("title", research.title);
//     setValue("description", research.description);
//     setValue("bodyText", research.bodyText);
//     setValue("secondText", research.secondText);
//     setValue("images.0.title", research.images?.[0]?.title || "");
//     setValue("images.0.description", research.images?.[0]?.description || "");
//     setValue("images.0.url", research.images?.[0]?.url || "");
//     setValue("images.1.title", research.images?.[1]?.title || "");
//     setValue("images.1.description", research.images?.[1]?.description || "");
//     setValue("images.1.url", research.images?.[1]?.url || "");
//     setValue("professionalId", research.professionalId || "");
//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this research?")) {
//       dispatch(deleteResearch(id));
//     }
//   };
// console.log("imageOneUrl", imageOneUrl)
// console.log("imageTwoUrl", imageTwoUrl)

//   useEffect(() => {
//     if (imageOneUrl) {
//       setValue("images.0.url", imageOneUrl);
//     }
//     if (imageTwoUrl) {
//       setValue("images.1.url", imageTwoUrl);
//     }
//   }, [imageOneUrl, imageTwoUrl, setValue]);

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h4">Research Manager</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={handleOpen}
//         >
//           Add Research
//         </Button>
//       </Box>
//       {loading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             width: "100%",
//             my: 4,
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>BodyText</TableCell>
//                 <TableCell>SecondText</TableCell>
//                 <TableCell>Image Title</TableCell>
//                 <TableCell>Image Description</TableCell>
//                 <TableCell>Image url</TableCell>

//                 <TableCell align="right">Ações</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Array.isArray(list) &&
//                 list.map((research) => (
//                   <TableRow key={research.id}>
//                     <TableCell>{research.title}</TableCell>
//                     <TableCell>{research.description}</TableCell>
//                     <TableCell>{research.bodyText}</TableCell>
//                     <TableCell>{research.secondText}</TableCell>
//                     <TableCell>{research.images?.[0]?.title || ""}</TableCell>
//                     <TableCell>
//                       {research.images?.[0]?.description || ""}
//                     </TableCell>
//                     <TableCell>
//                       {research.images?.[0]?.url || "No Image"}
//                     </TableCell>
//                     <TableCell>
//                       {research.professional?.name || "No Professional"}
//                     </TableCell>
//                     {/* <TableCell>
//                                     {new Date(research.createdAt).toLocaleString('pt-BR', {
//                                         day: '2-digit',
//                                         month: '2-digit',
//                                         year: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit',
//                                         second: '2-digit',
//                                     })}
//                                 </TableCell> */}
//                     <TableCell align="right">
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(research)}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(research.id)}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
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
//               multiline
//             />
//             <TextField
//               {...register("bodyText")}
//               label="BodyText"
//               fullWidth
//               margin="normal"
//               required
//               multiline
//               sx={{
//                 height: "112px !important",
//                 "& .MuiOutlinedInput-root": {
//                   height: "100% !important",
//                 },
//                 mb: 2,
//               }}
//             />
//             <TextField
//               {...register("secondText")}
//               label="SecondText "
//               fullWidth
//               margin="normal"
//               required
//               multiline
//               sx={{ height: "45px" }}
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
//               value={imageOneUrl || ""}
//               margin="normal"
//               required
//             />
//             <ImageInput
//               imageUrl={imageOneUrl}
//               uploadLoading={uploadLoading}
//               imageType="imageOne"
//             />
//             <TextField
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
//             <Controller
//               name="images.1.url"
//               control={control}
//               render={({ field }) => (
//                 <Box>
//                   <TextField
//                     {...field}
//                     {...register("images.1.url")}
//                     label="Image Two url"
//                     fullWidth
//                     value={imageTwoUrl || ""}
//                     margin="normal"
//                     required
//                   />
//                   <ImageInput
//                     imageUrl={imageTwoUrl}
//                     uploadLoading={uploadLoading}
//                     imageType="imageTwo"
//                   />
//                 </Box>
//               )}
//             />
//             <Controller
//               name="professionalId"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Professional"
//                   fullWidth
//                   select
//                   margin="normal"
//                   required
//                   value={field.value || ""}
//                   onChange={(e) => field.onChange(e.target.value)}
//                 >
//                   {professionalList &&
//                     professionalList.map((type) => (
//                       <MenuItem value={type.id} key={type.id}>
//                         {type.name}
//                       </MenuItem>
//                     ))}
//                 </TextField>
//               )}
//             />
//             {/* <TextField
//                             {...register('hierarchy', { valueAsNumber: true })}
//                             label="hierarchy"
//                             fullWidth
//                             margin="normal"
//                             required
//                             type="number"

//                         />
//                         <TextField
//                             {...register('createdAt')}
//                             label="Created At"
//                             fullWidth
//                             margin="normal"
//                             required
//                             type="datetime-local"
//                             slotProps={{
//                                 inputLabel: {
//                                     shrink: true,
//                                 },
//                             }}
//                         /> */}
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
  Alert,
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
  Snackbar,
  styled,
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
import {
  createResearch,
  deleteResearch,
  fetchResearch,
  Research,
  updateResearch,
} from "../../redux/slices/researchSlice";
import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";
import { fetchProfessionals } from "../../redux/slices/professionalSlice";
import { ImageInput } from "../../components/imageInput";
import { setImageUrls } from "../../redux/slices/fileUploadSlice"; // Importe a nova ação

export const ResearchManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, loading, error } = useSelector(
    (state: IRootState) => state.research
  );
  const professionalList = useAppSelector((state) => state.professional.list);
  const { register, handleSubmit, reset, setValue, control } =
    useForm<Research>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const {
    imageOneUrl,
    imageTwoUrl,
    loading: uploadLoading,
  } = useAppSelector(
    (state) => state.image // Corrigido de "image" para "fileUpload"
  );

  useEffect(() => {
    if (list.length === 0 && status === "idle") {
      dispatch(fetchResearch());
    }
    if (professionalList.length === 0) {
      dispatch(fetchProfessionals());
    }
  }, [dispatch, list.length, professionalList.length, status]);

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
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null })); // Limpa as URLs ao abrir para criação
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null })); // Limpa as URLs ao fechar
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<Research> = async (data) => {
    try {
      if (isEditing) {
        if (data.id) {
          await dispatch(updateResearch(data as Required<Research>)).unwrap();
          setSnackbarMessage("Research atualizado com sucesso!");
          setSnackbarSeverity("success");
        }
      } else {
        await dispatch(createResearch(data)).unwrap();
        setSnackbarMessage("Research cadastrado com sucesso!");
        setSnackbarSeverity("success");
      }
      handleClose();
      dispatch(fetchResearch());
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao salvar Research";
      setSnackbarMessage(`Erro: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Erro ao salvar Research:", error);
    }
  };

  const handleEdit = (research: Research) => {
    setIsEditing(true);
    setOpen(true);
    setValue("id", research.id);
    setValue("title", research.title);
    setValue("description", research.description);
    setValue("bodyText", research.bodyText);
    setValue("secondText", research.secondText);
    setValue("images.0.title", research.images?.[0]?.title || "");
    setValue("images.0.description", research.images?.[0]?.description || "");
    setValue("images.0.url", research.images?.[0]?.url || "");
    setValue("images.1.title", research.images?.[1]?.title || "");
    setValue("images.1.description", research.images?.[1]?.description || "");
    setValue("images.1.url", research.images?.[1]?.url || "");
    setValue("professionalId", research.professionalId || "");

    // Define as URLs no fileUploadSlice para refletir no ImageInput
    dispatch(
      setImageUrls({
        imageOneUrl: research.images?.[0]?.url || null,
        imageTwoUrl: research.images?.[1]?.url || null,
      })
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this research?")) {
      dispatch(deleteResearch(id));
      setSnackbarMessage("Research excluído com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Research Manager</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpen}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Add Research"
          )}
        </Button>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            my: 4,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>BodyText</TableCell>
                <TableCell>SecondText</TableCell>
                <TableCell>Image One Title</TableCell>
                <TableCell>Image One Description</TableCell>
                <TableCell>Image One URL</TableCell>
                <TableCell>Image Two Title</TableCell>
                <TableCell>Image Two Description</TableCell>
                <TableCell>Image Two URL</TableCell>
                <TableCell>Professional</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(list) &&
                list.map((research) => (
                  <TableRow key={research.id}>
                    <TableCell>{research.title}</TableCell>
                    <TableCell>{research.description}</TableCell>
                    <TableCell>
                      <TypographyStyled>{research.bodyText}</TypographyStyled>
                    </TableCell>
                    <TableCell>
                      <TypographyStyled>{research.secondText}</TypographyStyled>
                    </TableCell>
                    <TableCell>{research.images?.[0]?.title || ""}</TableCell>
                    <TableCell>
                      {research.images?.[0]?.description || ""}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          width: "120px",
                          alignItems: "center",
                        }}
                      >
                        {research.images?.[0]?.url ? (
                          <Box
                            component={"img"}
                            onClick={() =>
                              window.open(
                                `${research.images?.[0]?.url}`,
                                "_blank"
                              )
                            }
                            src={research.images[0].url}
                            sx={{
                              width: "130px",
                              maxHeight: "100px", // Altura fixa para consistência
                              objectFit: "cover", // Mantém a proporção da imagem
                              borderRadius: "4px", // Opcional: para estética
                            }}
                            onError={(e) => (e.currentTarget.src = "")} // Caso a imagem falhe ao carregar
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "130px",
                              height: "100px", // Altura fixa igual à da imagem
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px dashed gray", // Visual de placeholder
                              borderRadius: "4px",
                            }}
                          >
                            <Typography variant="caption" color="textSecondary">
                              No Image
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{research.images?.[1]?.title || ""}</TableCell>
                    <TableCell>
                      {research.images?.[1]?.description || ""}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          width: "120px",
                          alignItems: "center",
                        }}
                      >
                        {research.images?.[1]?.url ? (
                          <Box
                            component={"img"}
                            onClick={() =>
                              window.open(
                                `${research.images?.[1]?.url}`,
                                "_blank"
                              )
                            }
                            src={research.images[1].url}
                            sx={{
                              width: "130px",
                              maxHeight: "100px", // Altura fixa para consistência
                              objectFit: "cover", // Mantém a proporção da imagem
                              borderRadius: "4px", // Opcional: para estética
                            }}
                            onError={(e) => (e.currentTarget.src = "")} // Caso a imagem falhe ao carregar
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "130px",
                              height: "100px", // Altura fixa igual à da imagem
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px dashed gray", // Visual de placeholder
                              borderRadius: "4px",
                            }}
                          >
                            <Typography variant="caption" color="textSecondary">
                              No Image
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {research.professional?.name || "No Professional"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        disabled={loading}
                        color="primary"
                        onClick={() => handleEdit(research)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        disabled={loading}
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
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Typography>
      )}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "70vw", // 70% da largura da viewport
            maxWidth: "none", // Remove o limite padrão de largura máxima
            borderRadius: "8px", // Opcional: personalização estética
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isEditing ? "Edit Research" : "Add Research"}
          </DialogTitle>
          <DialogContent>
            <TextField
              {...register("title")}
              label="Title"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              margin="normal"
              required
              multiline
            />
            <TextField
              {...register("bodyText")}
              label="BodyText"
              fullWidth
              margin="normal"
              required
              multiline
              sx={{
                height: "112px !important",
                "& .MuiOutlinedInput-root": { height: "100% !important" },
                mb: 2,
              }}
            />
            <TextField
              {...register("secondText")}
              label="SecondText"
              fullWidth
              margin="normal"
              required
              multiline
              sx={{ height: "45px" }}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={uploadLoading}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog> */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "60vw",
            maxWidth: "none",
            borderRadius: "8px",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isEditing ? "Edit Research" : "Add Research"}
          </DialogTitle>
          <DialogContent>
            <TextField
              {...register("title")}
              label="Title"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              margin="normal"
              required
              multiline
            />
            <TextField
              {...register("bodyText")}
              label="Body Text"
              fullWidth
              margin="normal"
              required
              multiline
              rows={8} // Aumenta o número de linhas visíveis
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: "200px", // Altura mínima maior
                  alignItems: "flex-start", // Alinha o texto no topo
                  padding: "12px", // Mais espaço interno
                  borderRadius: "8px", // Bordas arredondadas
                },
                "& .MuiInputBase-input": {
                  fontSize: "1rem", // Tamanho de fonte confortável
                  lineHeight: "1.5", // Espaçamento entre linhas
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)", // Borda padrão
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main", // Borda ao passar o mouse
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px", // Borda mais grossa ao focar
                },
                mb: 2, // Margem inferior para espaçamento
              }}
              placeholder="Digite o texto principal aqui..." // Placeholder útil
            />
            <TextField
              {...register("secondText")}
              label="Second Text"
              fullWidth
              margin="normal"
              required
              multiline
              rows={4} // Menor que bodyText, mas ainda espaçoso
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: "120px", // Altura mínima adequada
                  alignItems: "flex-start", // Alinha o texto no topo
                  padding: "12px", // Mais espaço interno
                  borderRadius: "8px", // Bordas arredondadas
                },
                "& .MuiInputBase-input": {
                  fontSize: "1rem", // Tamanho de fonte confortável
                  lineHeight: "1.5", // Espaçamento entre linhas
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)", // Borda padrão
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main", // Borda ao passar o mouse
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px", // Borda mais grossa ao focar
                },
                mb: 2, // Margem inferior para espaçamento
              }}
              placeholder="Digite o texto secundário aqui..." // Placeholder útil
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={uploadLoading}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const TypographyStyled = styled(Typography)(() => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "200px",
  maxHeight: "300px",
}));
