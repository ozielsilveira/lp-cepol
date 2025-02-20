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
import {
  createResearch,
  deleteResearch,
  fetchResearch,
  Research,
  updateResearch,
} from "../../redux/slices/researchSlice";
import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";
import { fetchProfessionals } from "../../redux/slices/professionalSlice";
// import { TextFieldForms } from "../../components/texfFieldForms";

export const ResearchManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: IRootState) => state.research);
  const professionalList = useAppSelector((state) => state.professional.list);
  const { register, handleSubmit, reset, setValue, control } = useForm<Research>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const loading = useAppSelector((state) => state.research.loading);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchResearch());
    }
    if (professionalList.length === 0) {
      dispatch(fetchProfessionals());
    }
    // dispatch(fetchResearch());
    
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

  const onSubmit: SubmitHandler<Research> = async (data) => {
      try {
          if (isEditing) {
            if (data.id) {
              await dispatch(
                updateResearch(data as Required<Research>)
              ).unwrap();
            }
          } else {
            await dispatch(createResearch(data)).unwrap();
          }
          handleClose();
          dispatch(fetchResearch()); // Atualiza a lista após a ação
        } catch (error) {
          console.error("Erro ao salvar research:", error);
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
    setValue("professionalId", research.professionalId || "");
  };
console.log(professionalList);
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this research?")) {
      dispatch(deleteResearch(id));
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
          Add Research
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
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>BodyText</TableCell>
              <TableCell>SecondText</TableCell>
              <TableCell>Image Title</TableCell>
              <TableCell>Image Description</TableCell>
              <TableCell>Image url</TableCell>

              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(list) &&
              list.map((research) => (
                <TableRow key={research.id}>
                  <TableCell>{research.title}</TableCell>
                  <TableCell>{research.description}</TableCell>
                  <TableCell>{research.bodyText}</TableCell>
                  <TableCell>{research.secondText}</TableCell>
                  <TableCell>{research.images?.[0]?.title || ""}</TableCell>
                  <TableCell>
                    {research.images?.[0]?.description || ""}
                  </TableCell>
                  <TableCell>
                    {research.images?.[0]?.url || "No Image"}
                  </TableCell>
                  <TableCell>
                    {research.professional?.name || "No Professional"}
                  </TableCell>
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
)}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isEditing ? "Edit Professional" : "Add Professional"}
          </DialogTitle>
          <DialogContent>
            <TextField
              {...register("title")}
              label="title"
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
                height: '112px !important', 
                '& .MuiOutlinedInput-root': {
                  height: '100% !important', 
                },
                mb: 2,
              }}
            />
            <TextField
              {...register("secondText")}
              label="SecondText "
              fullWidth
              margin="normal"
              required
              multiline
              sx={{height:'45px'}}
            />
            <TextField
              {...register("images.0.title")}
              label="Image Title"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("images.0.description")}
              label="Image Description"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              {...register("images.0.url")}
              label="Image One url"
              fullWidth
              margin="normal"
              required
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
            </TextField>)
          } />
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
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
