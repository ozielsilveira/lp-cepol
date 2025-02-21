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
  createEquipment,
  deleteEquipment,
  Equipment,
  fetchEquipments,
  updateEquipment,
} from "../../redux/slices/equipamentSlice";
import { ImageInput } from "../../components/imageInput";
import { setImageUrls } from "../../redux/slices/fileUploadSlice";

const equipmentType = ["Processing", "Analytics"];

export const EquipmentslManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, loading, error } = useSelector(
    (state: IRootState) => state.equipment
  );
  const { register, handleSubmit, reset, setValue, control } =
    useForm<Equipment>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

   const { imageOneUrl, loading: uploadLoading } = useAppSelector(
      (state) => state.image
    );
  
  useEffect(() => {
    if (list.length === 0 && !loading && status === "idle") {
      dispatch(fetchEquipments());
    }
  }, [dispatch, list.length, loading, status]);

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

  const onSubmit: SubmitHandler<Equipment> = async (data) => {
    try {
      if (isEditing) {
        if (data.id) {
          await dispatch(updateEquipment(data as Required<Equipment>)).unwrap();
          setSnackbarMessage("Equipment atualizado com sucesso!");
          setSnackbarSeverity("success");
        }
      } else {
        await dispatch(createEquipment(data)).unwrap();
        setSnackbarMessage("Equipment cadastrado com sucesso!");
        setSnackbarSeverity("success");
      }
      handleClose();
      dispatch(fetchEquipments()); // Atualiza a lista após a ação
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao salvar equipment";
      setSnackbarMessage(`Erro: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Erro ao salvar equipment:", error);
    }
  };

  const handleEdit = (equipment: Equipment) => {
    setIsEditing(true);
    setOpen(true);
    setValue("id", equipment.id);
    setValue("name", equipment.name);
    setValue("type", equipment.type);
    setValue("imageUrl", equipment.imageUrl);
    setValue("description", equipment.description);

    dispatch(
      setImageUrls({
        imageOneUrl: equipment.imageUrl || null,
      })
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this professional?")) {
      dispatch(deleteEquipment(id));
      setSnackbarMessage("Equipment excluído com sucesso!");
      setSnackbarSeverity("success");
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
        <Typography variant="h4">Equipment Manager</Typography>
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
            "Add Equipment"
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
                <TableCell>Nome</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Image URL</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.isArray(list) &&
                list.map((equipment) => (
                  <TableRow key={equipment.id}>
                    <TableCell>{equipment.name}</TableCell>
                    <TableCell>{equipment.description}</TableCell>
                    <TableCell>{equipment.type}</TableCell>
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
                        {equipment?.imageUrl ? (
                          <Box
                            component={"img"}
                            onClick={() =>
                              window.open(
                                `${equipment?.imageUrl || ""}`,
                                "_blank"
                              )
                            }
                            src={equipment.imageUrl}
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

                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(equipment)}
                        disabled={loading}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(equipment.id)}
                        disabled={loading}
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
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isEditing ? "Edit Equipment" : "Add Equipment"}
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
              {...register("description")}
              label="Model"
              fullWidth
              margin="normal"
              required
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Type"
                  fullWidth
                  select
                  margin="normal"
                  required
                  value={field.value || ""} // Garante que o valor inicial seja refletido
                  onChange={(e) => field.onChange(e.target.value)} // Atualiza o valor no form
                >
                  {equipmentType.map((type) => (
                    <MenuItem value={type} key={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <ImageInput
              imageUrl={imageOneUrl}
              imageType="imageOne"
              uploadLoading={uploadLoading}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
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
