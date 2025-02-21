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
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createProfessional,
//   deleteProfessional,
//   fetchProfessionals,
//   Professional,
//   updateProfessional,
// } from "../../redux/slices/professionalSlice";
// import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";
// import { ImageInput } from "../../components/imageInput";
// import { setImageUrls } from "../../redux/slices/fileUploadSlice";

// const ProfessionalManager: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { list } = useSelector((state: IRootState) => state.professional);
//   const loading = useAppSelector((state) => state.professional.loading);
//   const { imageOneUrl, loading: uploadLoading } = useAppSelector(
//     (state) => state.image
//   );

//   const { register, handleSubmit, reset, setValue } = useForm<Professional>();
//   const [open, setOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (list.length === 0) {
//       dispatch(fetchProfessionals());
//     }
//   }, [dispatch, list.length]);

//   useEffect(() => {
//     if (imageOneUrl) {
//       setValue("imageUrl", imageOneUrl); // Atualiza o campo imageUrl quando o upload é concluído
//     }
//   }, [imageOneUrl, setValue]);

//   // const handleImage = (url: string) => {
//   //   setValue("imageUrl", url);
//   // }

//   const handleOpen = () => {
//     setOpen(true);
//     setIsEditing(false);
//     reset();
//     dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
//   };

//   const handleClose = () => {
//     setOpen(false);
//     reset();
//     dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
//   };

//   const onSubmit: SubmitHandler<Professional> = async (data) => {
//     try {
//       if (isEditing) {
//         if (data.id) {
//           await dispatch(
//             updateProfessional(data as Required<Professional>)
//           ).unwrap();
//         }
//       } else {
//         await dispatch(createProfessional(data)).unwrap();
//       }
//       handleClose();
//       dispatch(fetchProfessionals());
//     } catch (error) {
//       console.error("Erro ao salvar profissional:", error);
//     }
//   };

//   const handleEdit = async (professional: Professional) => {
//     setIsEditing(true);
//     setOpen(true);
//     setValue("id", professional.id);
//     setValue("name", professional.name);
//     setValue("role", professional.role);
//     setValue("bio", professional.bio);
//     setValue("hierarchy", professional.hierarchy);
//     setValue("imageUrl", professional.imageUrl);
//     setValue("createdAt", professional.createdAt);

//     dispatch(
//       setImageUrls({
//         imageOneUrl: professional.imageUrl || null,
//       })
//     );
//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this professional?")) {
//       dispatch(deleteProfessional(id));
//     }
//   };

//   // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && e.target.files[0]) {
//   //     dispatch(uploadFile(e.target.files[0]));
//   //   }
//   // };

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h4">Professional Manager</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={handleOpen}
//         >
//           Add Professional
//         </Button>
//       </Box>
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Nome</TableCell>
//                 <TableCell>Cargo</TableCell>
//                 <TableCell>Descrição</TableCell>
//                 <TableCell>Image URL</TableCell>
//                 <TableCell>Hierarchy</TableCell>
//                 <TableCell>Criado em</TableCell>
//                 <TableCell align="right">Ações</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Array.isArray(list) &&
//                 list.map((professional) => (
//                   <TableRow key={professional.id}>
//                     <TableCell>{professional.name}</TableCell>
//                     <TableCell>{professional.role}</TableCell>
//                     <TableCell>{professional.bio}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           flexDirection: "column",
//                           width: "120px",
//                         }}
//                       >
//                         <Box
//                           onClick={() => window.open(`${professional.imageUrl}`, "_blank")}
//                           component={"img"}
//                           src={`${professional.imageUrl}`}
//                           sx={{ width: "130px" }}
//                         />
//                       </Box>
//                     </TableCell>
//                     <TableCell>{professional.hierarchy}</TableCell>
//                     <TableCell>
//                       {new Date(professional.createdAt).toLocaleString(
//                         "pt-BR",
//                         {
//                           day: "2-digit",
//                           month: "2-digit",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           second: "2-digit",
//                         }
//                       )}
//                     </TableCell>
//                     <TableCell align="right">
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(professional)}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(professional.id)}
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
//               {...register("name")}
//               label="Name"
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               {...register("role")}
//               label="Role"
//               fullWidth
//               margin="normal"
//               required
//             />
//             {/* <TextField
//               {...register("bio")}
//               label="Bio"
//               fullWidth
//               margin="normal"
//               required
//             /> */}
//             <TextField
//               {...register("bio")}
//               label="Bio"
//               fullWidth
//               margin="normal"
//               required
//               multiline
//               rows={4} // Menor que bodyText, mas ainda espaçoso
//               variant="outlined"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   minHeight: "120px", // Altura mínima adequada
//                   alignItems: "flex-start", // Alinha o texto no topo
//                   padding: "12px", // Mais espaço interno
//                   borderRadius: "8px", // Bordas arredondadas
//                 },
//                 "& .MuiInputBase-input": {
//                   fontSize: "1rem", // Tamanho de fonte confortável
//                   lineHeight: "1.5", // Espaçamento entre linhas
//                 },
//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(0, 0, 0, 0.23)", // Borda padrão
//                 },
//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "primary.main", // Borda ao passar o mouse
//                 },
//                 "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderWidth: "2px", // Borda mais grossa ao focar
//                 },
//                 mb: 2, // Margem inferior para espaçamento
//               }}
//               placeholder="Digite a sua Biografia aqui..." // Placeholder útil
//             />
//             <TextField
//               {...register("imageUrl")}
//               label="Image URL"
//               fullWidth
//               margin="normal"
//               value={imageOneUrl || ""}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <ImageInput
//               imageUrl={imageOneUrl}
//               imageType="imageOne"
//               // handleImage={handleImage}
//               uploadLoading={uploadLoading}
//             ></ImageInput>
//             {/* <Box display="flex" alignItems="center" justifyContent="center" gap={2} margin="normal">
//               <Button
//                 variant="outlined"
//                 component="label"
//                 disabled={uploadLoading}
//               >
//                 {uploadLoading ? "Uploading..." : "Upload Image"}
//                 <input
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//               </Button>
//               {uploadLoading && <CircularProgress size={24} />}
//             </Box> */}
//             <TextField
//               {...register("hierarchy", { valueAsNumber: true })}
//               label="Hierarchy"
//               fullWidth
//               margin="normal"
//               required
//               type="number"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               disabled={uploadLoading}
//             >
//               {isEditing ? "Update" : "Add"}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </Box>
//   );
// };

// export default ProfessionalManager;

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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProfessional,
  deleteProfessional,
  fetchProfessionals,
  Professional,
  updateProfessional,
} from "../../redux/slices/professionalSlice";
import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";
import { ImageInput } from "../../components/imageInput";
import { setImageUrls } from "../../redux/slices/fileUploadSlice";

const ProfessionalManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, loading, error } = useSelector(
    (state: IRootState) => state.professional
  );
  const { imageOneUrl, loading: uploadLoading } = useAppSelector(
    (state) => state.image
  );

  const { register, handleSubmit, reset, setValue } = useForm<Professional>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (list.length === 0 && status === "idle") {
      dispatch(fetchProfessionals());
    }
  }, [dispatch, list.length, status]);

  useEffect(() => {
    if (imageOneUrl) {
      setValue("imageUrl", imageOneUrl); // Atualiza o campo imageUrl quando o upload é concluído
    }
  }, [imageOneUrl, setValue]);

  const handleOpen = () => {
    setOpen(true);
    setIsEditing(false);
    reset();
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<Professional> = async (data) => {
    try {
      if (isEditing) {
        if (data.id) {
          await dispatch(
            updateProfessional(data as Required<Professional>)
          ).unwrap();
          setSnackbarMessage("Profissional atualizado com sucesso!");
          setSnackbarSeverity("success");
        }
      } else {
        await dispatch(createProfessional(data)).unwrap();
        setSnackbarMessage("Profissional cadastrado com sucesso!");
        setSnackbarSeverity("success");
      }
      handleClose();
      dispatch(fetchProfessionals());
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao salvar profissional";
      setSnackbarMessage(`Erro: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Erro ao salvar profissional:", error);
    }
  };

  const handleEdit = async (professional: Professional) => {
    setIsEditing(true);
    setOpen(true);
    setValue("id", professional.id);
    setValue("name", professional.name);
    setValue("role", professional.role);
    setValue("bio", professional.bio);
    setValue("hierarchy", professional.hierarchy);
    setValue("imageUrl", professional.imageUrl || "");
    setValue("createdAt", professional.createdAt);

    dispatch(
      setImageUrls({
        imageOneUrl: professional.imageUrl || null,
      })
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this professional?")) {
      dispatch(deleteProfessional(id));
      setSnackbarMessage("Profissional excluído com sucesso!");
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
        <Typography variant="h4">Professional Manager</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpen}
          disabled={loading || uploadLoading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Add Professional"
          )}
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
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
              {Array.isArray(list) &&
                list.map((professional) => (
                  <TableRow key={professional.id}>
                    <TableCell>{professional.name}</TableCell>
                    <TableCell>{professional.role}</TableCell>
                    <TableCell>{professional.bio}</TableCell>
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
                        {professional.imageUrl ? (
                          <Box
                            component={"img"}
                            onClick={() =>
                              window.open(
                                `${professional?.imageUrl || ""}`,
                                "_blank"
                              )
                            }
                            src={professional.imageUrl}
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
                    <TableCell>{professional.hierarchy}</TableCell>
                    <TableCell>
                      {new Date(professional.createdAt).toLocaleString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        }
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(professional)}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Edit />
                        )}
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(professional.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Delete />
                        )}
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
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isEditing ? "Edit Professional" : "Add Professional"}
          </DialogTitle>
          <DialogContent>
            <TextField
              {...register("name")}
              label="Name"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("role")}
              label="Role"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("bio")}
              label="Bio"
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  minHeight: "120px",
                  alignItems: "flex-start",
                  padding: "12px",
                  borderRadius: "8px",
                },
                "& .MuiInputBase-input": {
                  fontSize: "1rem",
                  lineHeight: "1.5",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "2px",
                },
                mb: 2,
              }}
              placeholder="Digite a sua Biografia aqui..."
            />
            <ImageInput
              imageUrl={imageOneUrl}
              imageType="imageOne"
              uploadLoading={uploadLoading}
            />
            <TextField
              {...register("hierarchy", { valueAsNumber: true })}
              label="Hierarchy"
              fullWidth
              margin="normal"
              required
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || uploadLoading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isEditing ? (
                "Update"
              ) : (
                "Add"
              )}
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

export default ProfessionalManager;
