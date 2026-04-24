import { Add, Delete, Edit, ExpandMore, ImageOutlined, Search } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  styled,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ImageInput } from "../../components/imageInput";
import { setImageUrls } from "../../redux/slices/fileUploadSlice";
import { fetchProfessionals } from "../../redux/slices/professionalSlice";
import {
  createResearch,
  deleteResearch,
  fetchResearch,
  Research,
  updateResearch,
} from "../../redux/slices/researchSlice";
import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";

export const ResearchManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
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
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const {
    imageOneUrl,
    imageTwoUrl,
    loading: uploadLoading,
  } = useAppSelector((state) => state.image);

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

  const filteredList = useMemo(() => {
    if (!Array.isArray(list)) return [];
    if (!searchTerm.trim()) return list;
    const lower = searchTerm.toLowerCase();
    return list.filter(
      (r) =>
        r.title?.toLowerCase().includes(lower) ||
        r.description?.toLowerCase().includes(lower) ||
        r.professional?.name?.toLowerCase().includes(lower)
    );
  }, [list, searchTerm]);

  const handleOpen = () => {
    setOpen(true);
    setIsEditing(false);
    reset();
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<Research> = async (data) => {
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
            updateResearch(cleanedData as Required<Research>)
          ).unwrap();
          setSnackbarMessage("Research updated successfully!");
          setSnackbarSeverity("success");
        }
      } else {
        await dispatch(createResearch(cleanedData)).unwrap();
        setSnackbarMessage("Research created successfully!");
        setSnackbarSeverity("success");
      }
      handleClose();
      dispatch(fetchResearch());
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error while saving Research";
      setSnackbarMessage(`Error: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Erro ao salvar Research:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    dispatch(setImageUrls({ imageOneUrl: null, imageTwoUrl: null }));
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("success");
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

    dispatch(
      setImageUrls({
        imageOneUrl: research.images?.[0]?.url || null,
        imageTwoUrl: research.images?.[1]?.url || null,
      })
    );
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteAction = () => {
    if (deleteConfirmId) {
      dispatch(deleteResearch(deleteConfirmId));
      setSnackbarMessage("Research deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setDeleteConfirmId(null);
    }
  };

  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.4rem", md: "1.8rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Research
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {Array.isArray(list) ? list.length : 0} research(es) registered
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
          disabled={loading}
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1.2,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
            "&:hover": {
              boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "New Research"
          )}
        </Button>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Search by title, description or professional..."
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: "text.secondary", fontSize: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          maxWidth: 480,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
          },
        }}
      />

      {/* Content */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 300,
          }}
        >
          <CircularProgress />
        </Box>
      ) : filteredList.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <ImageOutlined sx={{ fontSize: 56, mb: 2, opacity: 0.4 }} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {searchTerm
              ? "No research found"
              : "No research registered"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {searchTerm
              ? "Try searching with different terms."
              : 'Click "New Research" to get started.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {filteredList.map((research) => (
            <Grid item xs={12} sm={6} lg={4} key={research.id}>
              <ResearchCard
                research={research}
                onEdit={handleEdit}
                onDelete={handleDelete}
                loading={loading}
                theme={theme}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {/* Dialog Form */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={isXs}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: isXs ? 0 : "16px",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{
              fontWeight: 700,
              fontSize: "1.3rem",
              pb: 1,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            {isEditing ? "Edit Research" : "New Research"}
          </DialogTitle>
          <DialogContent sx={{ pt: "24px !important" }}>
            {/* Basic Info */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600, letterSpacing: 1 }}
            >
              Basic Information
            </Typography>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <TextField
                  {...register("title")}
                  label="Título"
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("description")}
                  label="Descrição"
                  fullWidth
                  required
                  multiline
                  rows={2}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="professionalId"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Professional"
                      fullWidth
                      select
                      size="small"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {professionalList &&
                        professionalList.map((type) => (
                          <MenuItem value={type.id} key={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Texts */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600, letterSpacing: 1 }}
            >
              Content
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <TextField
                {...register("bodyText")}
                label="Body Text"
                fullWidth
                required
                multiline
                rows={6}
                size="small"
                placeholder="Enter the main text here..."
                sx={{ mb: 2 }}
              />
              <TextField
                {...register("secondText")}
                label="Second Text"
                fullWidth
                required
                multiline
                rows={3}
                size="small"
                placeholder="Enter the secondary text here..."
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Images */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600, letterSpacing: 1 }}
            >
              Images
            </Typography>
            <Grid container spacing={3} sx={{ mt: 0.5 }}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "12px",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                  >
                    Main Image
                  </Typography>
                  <TextField
                    {...register("images.0.title")}
                    label="Título"
                    fullWidth
                    size="small"
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    {...register("images.0.description")}
                    label="Descrição"
                    fullWidth
                    size="small"
                    sx={{ mb: 1.5 }}
                  />
                  <ImageInput
                    imageUrl={imageOneUrl}
                    uploadLoading={uploadLoading}
                    imageType="imageOne"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "12px",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 600 }}
                  >
                    Secondary Image
                  </Typography>
                  <TextField
                    {...register("images.1.title")}
                    label="Título"
                    fullWidth
                    size="small"
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    {...register("images.1.description")}
                    label="Descrição"
                    fullWidth
                    size="small"
                    sx={{ mb: 1.5 }}
                  />
                  <ImageInput
                    imageUrl={imageTwoUrl}
                    uploadLoading={uploadLoading}
                    imageType="imageTwo"
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              gap: 1,
            }}
          >
            <Button
              onClick={handleClose}
              sx={{ borderRadius: "8px", textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={uploadLoading}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
              }}
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
          sx={{ width: "100%", borderRadius: "10px" }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        sx={{ "& .MuiDialog-paper": { borderRadius: "12px", maxWidth: 400 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Delete Research
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this research? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteConfirmId(null)}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteAction}
            variant="contained"
            color="error"
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

/* ─── Research Card Component ─── */

interface ResearchCardProps {
  research: Research;
  onEdit: (research: Research) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  theme: any;
}

const ResearchCard: React.FC<ResearchCardProps> = ({
  research,
  onEdit,
  onDelete,
  loading,
  theme,
}) => {
  const hasImage = !!research.images?.[0]?.url;

  return (
    <Card
      sx={{
        borderRadius: "14px",
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Image thumbnail */}
      {hasImage && (
        <Box
          sx={{
            height: 160,
            overflow: "hidden",
            borderBottom: `1px solid ${theme.palette.divider}`,
            cursor: "pointer",
          }}
          onClick={() => window.open(research.images![0].url, "_blank")}
        >
          <Box
            component="img"
            src={research.images![0].url}
            alt={research.images?.[0]?.title || research.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </Box>
      )}

      <CardContent sx={{ flex: 1, p: 2.5, pb: 1 }}>
        {/* Title */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            mb: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {research.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.5,
          }}
        >
          {research.description}
        </Typography>

        {/* Professional chip */}
        {research.professional?.name && (
          <Chip
            label={research.professional.name}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: "6px",
              fontSize: "0.72rem",
              height: 24,
              mb: 0.5,
            }}
          />
        )}

        {/* Expandable body text */}
        {research.bodyText && (
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              mt: 1.5,
              "&:before": { display: "none" },
              backgroundColor: "transparent",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ fontSize: 18 }} />}
              sx={{
                minHeight: 32,
                px: 0,
                "& .MuiAccordionSummary-content": { my: 0 },
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                View content
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.78rem",
                  lineHeight: 1.6,
                  maxHeight: 120,
                  overflow: "auto",
                }}
              >
                {research.bodyText}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          px: 2.5,
          py: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: "flex-end",
          gap: 0.5,
        }}
      >
        <Tooltip title="Edit" arrow>
          <IconButton
            size="small"
            onClick={() => onEdit(research)}
            disabled={loading}
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.16),
              },
            }}
          >
            <Edit sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <IconButton
            size="small"
            onClick={() => onDelete(research.id)}
            disabled={loading}
            sx={{
              color: theme.palette.error.main,
              backgroundColor: alpha(theme.palette.error.main, 0.08),
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.16),
              },
            }}
          >
            <Delete sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export const TypographyStyled = styled(Typography)(() => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "200px",
  maxHeight: "300px",
}));
