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

// const ProfessionalManager: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { list } = useSelector((state: IRootState) => state.professional);
//   const loading = useAppSelector((state) => state.professional.loading);
//   const uploadedImageUrl = useAppSelector((state) => state.image.result);
//   const { register, handleSubmit, reset, setValue } = useForm<Professional>();
//   const [open, setOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (list.length === 0) {
//       dispatch(fetchProfessionals());
//     }
//   }, [dispatch, list.length]);

//   const handleOpen = () => {
//     setOpen(true);
//     setIsEditing(false);
//     reset();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     reset();

//   };
// const setImageUrl = (url: string) => {
//     setValue("imageUrl", uploadedImageUrl);
// }

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
//       dispatch(fetchProfessionals()); // Atualiza a lista após a ação
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

//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm("Are you sure you want to delete this professional?")) {
//       dispatch(deleteProfessional(id));
//     }
//   };

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
//                     <TableCell>{professional.imageUrl}</TableCell>
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
//             <TextField
//               {...register("bio")}
//               label="Bio"
//               fullWidth
//               margin="normal"
//               required
//             />
//             {/* <TextField
//               {...register("imageUrl")}
//               label="Image URL"
//               fullWidth
//               margin="normal"
//               required
//               // disabled
//             /> */}
//             <TextField
//               {...register("hierarchy", { valueAsNumber: true })}
//               label="hierarchy"
//               fullWidth
//               margin="normal"
//               required
//               type="number"
//             />
//             {/* <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => {
//                                 if (e.target.files && e.target.files[0]) {
//                                     setSelectedFile(e.target.files[0]);
//                                 }
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
  const { list } = useSelector((state: IRootState) => state.professional);
  const loading = useAppSelector((state) => state.professional.loading);
  const { imageOneUrl, loading: uploadLoading } = useAppSelector(
    (state) => state.image
  );

  const { register, handleSubmit, reset, setValue } = useForm<Professional>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchProfessionals());
    }
  }, [dispatch, list.length]);

  useEffect(() => {
    if (imageOneUrl) {
      setValue("imageUrl", imageOneUrl); // Atualiza o campo imageUrl quando o upload é concluído
    }
  }, [imageOneUrl, setValue]);

  // const handleImage = (url: string) => {
  //   setValue("imageUrl", url);
  // }

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

  const onSubmit: SubmitHandler<Professional> = async (data) => {
    try {
      if (isEditing) {
        if (data.id) {
          await dispatch(
            updateProfessional(data as Required<Professional>)
          ).unwrap();
        }
      } else {
        await dispatch(createProfessional(data)).unwrap();
      }
      handleClose();
      dispatch(fetchProfessionals());
    } catch (error) {
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
    setValue("imageUrl", professional.imageUrl);
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
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     dispatch(uploadFile(e.target.files[0]));
  //   }
  // };

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
        >
          Add Professional
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
                        }}
                      >
                        <Box
                          component={"img"}
                          src={`${professional.imageUrl}`}
                          sx={{ width: "130px" }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            textAlign: "center",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {professional.imageUrl || "No Image"}
                        </Typography>
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
            />
            <TextField
              {...register("imageUrl")}
              label="Image URL"
              fullWidth
              margin="normal"
              value={imageOneUrl || ""}
              InputProps={{
                readOnly: true,
              }}
            />
            <ImageInput
              imageUrl={imageOneUrl}
              imageType="imageOne"
              // handleImage={handleImage}
              uploadLoading={uploadLoading}
            ></ImageInput>
            {/* <Box display="flex" alignItems="center" justifyContent="center" gap={2} margin="normal">
              <Button
                variant="outlined"
                component="label"
                disabled={uploadLoading}
              >
                {uploadLoading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {uploadLoading && <CircularProgress size={24} />}
            </Box> */}
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
              disabled={uploadLoading}
            >
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProfessionalManager;
