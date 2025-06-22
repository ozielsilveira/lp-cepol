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
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ImageInput } from "../../components/imageInput";
import {
  AboutUs,
  createAboutUs,
  deleteAboutUs,
  fetchAboutUs,
  updateAboutUs,
} from "../../redux/slices/aboutUsSlice";
import { setImageUrls } from "../../redux/slices/fileUploadSlice";
import { AppDispatch, useAppSelector } from "../../redux/store";

export const AboutUsManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, loading, error } = useAppSelector(
    (state) => state.aboutUs
  );
  const { register, handleSubmit, reset, setValue } = useForm<AboutUs>();
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
  } = useAppSelector((state) => state.image);

  useEffect(() => {
    if (list.length === 0 && !loading && status === "idle") {
      dispatch(fetchAboutUs());
    }
  }, [dispatch, list.length, loading, status]);

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
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
    setSnackbarOpen(false); // Limpar snackbar
    setSnackbarMessage(""); // Limpar mensagem
    setSnackbarSeverity("success"); // Resetar para success
  };

  const onSubmit: SubmitHandler<AboutUs> = async (data) => {
    try {
      const cleanedData = { ...data };

      if (cleanedData.images) {
        cleanedData.images = cleanedData.images.filter((img) => img?.url);

        if (cleanedData.images.length === 0) {
          delete cleanedData.images;
        }
      }
      if (isEditing) {
        if (data.id) {
          await dispatch(
            updateAboutUs(cleanedData as Required<AboutUs>)
          ).unwrap();
          setSnackbarMessage("About Us atualizado com sucesso!");
          setSnackbarSeverity("success");
        }
      } else {
        await dispatch(createAboutUs(cleanedData)).unwrap();
        setSnackbarMessage("About Us cadastrado com sucesso!");
        setSnackbarSeverity("success");
      }
      handleClose();
      dispatch(fetchAboutUs()); // Atualiza a lista após a ação
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao salvar about us";
      setSnackbarMessage(`Erro: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Erro ao salvar about us:", error);
    }
  };

  const handleEdit = (aboutUs: AboutUs) => {
    setIsEditing(true);
    setOpen(true);
    setValue("id", aboutUs.id);
    setValue("bodyText", aboutUs.bodyText);
    setValue("secondText", aboutUs.secondText);
    setValue("images.0.title", aboutUs.images?.[0]?.title || "");
    setValue("images.0.description", aboutUs.images?.[0]?.description || "");
    setValue("images.0.url", aboutUs.images?.[0]?.url || "");
    setValue("images.1.title", aboutUs.images?.[1]?.title || "");
    setValue("images.1.description", aboutUs.images?.[1]?.description || "");
    setValue("images.1.url", aboutUs.images?.[1]?.url || "");

    dispatch(
      setImageUrls({
        imageOneUrl: aboutUs.images?.[0]?.url || null,
        imageTwoUrl: aboutUs.images?.[1]?.url || null,
      })
    );
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this about us entry?")
    ) {
      dispatch(deleteAboutUs(id));
      setSnackbarMessage("About Us excluído com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ p: { xs: 0, md: 3 }, pt: { xs: 2 } }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" sx={{ fontSize: { xs: "22px", md: "2rem" } }}>
          About Us Manager
        </Typography>
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
            !isXs && "Add About Us"
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
                <TableCell>Body Text</TableCell>
                <TableCell>Second Text</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Image One Title</TableCell>
                <TableCell>Image Two Title</TableCell>
                <TableCell>Images</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.isArray(list) &&
                list.map((aboutUs) => (
                  <TableRow key={aboutUs.id}>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {aboutUs.bodyText.length > 50
                          ? `${aboutUs.bodyText.substring(0, 50)}...`
                          : aboutUs.bodyText}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {aboutUs.secondText.length > 50
                          ? `${aboutUs.secondText.substring(0, 50)}...`
                          : aboutUs.secondText}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(aboutUs.createdAt)}</TableCell>
                    <TableCell>{aboutUs.images?.[0]?.title || ""}</TableCell>
                    <TableCell>{aboutUs.images?.[1]?.title || ""}</TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          maxWidth: 200,
                        }}
                      >
                        {aboutUs.images && aboutUs.images.length > 0 ? (
                          aboutUs.images.map((image, index) => (
                            <Box
                              key={index}
                              component="img"
                              onClick={() => window.open(image.url, "_blank")}
                              src={image.url}
                              sx={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              onError={(e) => (e.currentTarget.src = "")}
                            />
                          ))
                        ) : (
                          <Box
                            sx={{
                              width: "60px",
                              height: "60px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px dashed gray",
                              borderRadius: "4px",
                            }}
                          >
                            <Typography variant="caption" color="textSecondary">
                              No Images
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(aboutUs)}
                        disabled={loading}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(aboutUs.id)}
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {isEditing ? "Edit About Us" : "Add About Us"}
          </DialogTitle>
          <DialogContent>
            <TextField
              {...register("bodyText")}
              label="Body Text"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              {...register("secondText")}
              label="Second Text"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Images
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <TextField
                  {...register("images.0.title")}
                  label="Image One Title"
                  fullWidth
                  margin="normal"
                />
                <ImageInput
                  imageUrl={imageOneUrl}
                  imageType="imageOne"
                  uploadLoading={uploadLoading}
                />
                <TextField
                  {...register("images.1.title")}
                  label="Image Two Title"
                  fullWidth
                  margin="normal"
                />
                <ImageInput
                  imageUrl={imageTwoUrl}
                  imageType="imageTwo"
                  uploadLoading={uploadLoading}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={uploadLoading}
            >
              {uploadLoading ? (
                <CircularProgress size={20} color="inherit" />
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
