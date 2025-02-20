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
  createEquipment,
  deleteEquipment,
  Equipment,
  fetchEquipments,
  updateEquipment,
} from "../../redux/slices/equipamentSlice";

const equipmentType = ["Processing", "Analytics"];

export const EquipmentslManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: IRootState) => state.equipment);
  const { register, handleSubmit, reset, setValue, control } = useForm<Equipment>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const loading = useAppSelector((state) => state.equipment.loading);

  useEffect(() => {
    if (list.length === 0 && !loading ) {
      dispatch(fetchEquipments());
    }
  }, [dispatch, list.length, loading]);

  const handleOpen = () => {
    setOpen(true);
    setIsEditing(false);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<Equipment> =  async (data) => {
    try {
      if (isEditing) {
        if (data.id) {
          await dispatch(
            updateEquipment(data as Required<Equipment>)
          ).unwrap();
        }
      } else {
        await dispatch(createEquipment(data)).unwrap();
      }
      handleClose();
      dispatch(fetchEquipments()); // Atualiza a lista após a ação
    } catch (error) {
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
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this professional?")) {
      dispatch(deleteEquipment(id));
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
        >
          Add Equipment
        </Button>
      </Box>
      {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", width:"100%", my: 4 }}>
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
                      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '120px' }}>
                          {equipment.imageUrl && <Box component={'img'} src={`${equipment.imageUrl}`} sx={{width:'130px'}}/>}
                          <Typography variant="caption" sx={{textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                            {equipment.imageUrl || "No Image"}
                          </Typography>
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
            <TextField
              {...register("imageUrl")}
              label="Image URL"
              fullWidth
              margin="normal"
              required
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
    </Box>
  );
};
