import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../../redux/store";
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
  const { register, handleSubmit, reset, setValue } = useForm<Equipment>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // const list = [
  //   { id: '1', name: "Espectrofotômetro", model: "UV-1800", type: "Processing" },
  //   { id: '2', name: "Cromatógrafo Gasoso", model: "GC-2020", type: "Analytics" },
  //   { id: '3', name: "Balança Analítica", model: "AX324", type: "Analytics" },
  //   { id: '4', name: "Microscópio Óptico", model: "CX33", type: "Analytics" },
  //   { id: '5', name: "Centrífuga", model: "5804R", type: "Processing" },
  //   { id: '6', name: "Centrífuga", model: "5804R", type: "Processing" },
  //   { id: '7', name: "Centrífuga", model: "5804R", type: "Processing" },
  //   { id: '8', name: "Centrífuga", model: "5804R", type: "Analytics" },
  //   { id: '9', name: "Centrífuga", model: "5804R", type: "Analytics" },
  //   { id: '10', name: "Centrífuga", model: "5804R", type: "Processing" },
  // ];

  

  const handleOpen = () => {
    setOpen(true);
    setIsEditing(false);
    reset();
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<Equipment> = (data) => {
    if (isEditing) {
      if (data.id) {
        dispatch(updateEquipment(data as Required<Equipment>));
      }
    } else {
      dispatch(createEquipment(data));
    }
    handleClose();
    dispatch(fetchEquipments());
  };

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchEquipments());
    }
  }, [dispatch, list.length, onSubmit]);

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
                  <TableCell>{equipment.imageUrl}</TableCell>

                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(equipment)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(equipment.id)}
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
            <TextField
              {...register("type")}
              label="type"
              fullWidth
              select
              margin="normal"
              required
            >
              {equipmentType &&
                equipmentType.map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
            </TextField>
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
