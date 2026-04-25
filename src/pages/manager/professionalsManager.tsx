import { Add, Delete, Edit, ImageOutlined, Search, ExpandMore, Badge, Work } from "@mui/icons-material";
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
  Snackbar,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
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
  const theme = useTheme();
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
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    if (list.length === 0 && status === "idle") {
      dispatch(fetchProfessionals());
    }
  }, [dispatch, list.length, status]);

  useEffect(() => {
    if (imageOneUrl) {
      setValue("imageUrl", imageOneUrl);
    }
  }, [imageOneUrl, setValue]);

  const filteredList = useMemo(() => {
    if (!Array.isArray(list)) return [];
    const sorted = [...list].sort((a, b) => (a.hierarchy ?? 0) - (b.hierarchy ?? 0));
    if (!searchTerm.trim()) return sorted;
    const lower = searchTerm.toLowerCase();
    return sorted.filter(
      (p) =>
        p.name?.toLowerCase().includes(lower) ||
        p.role?.toLowerCase().includes(lower) ||
        p.bio?.toLowerCase().includes(lower)
    );
  }, [list, searchTerm]);

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
          setSnackbarMessage("Professional updated successfully!");
          setSnackbarSeverity("success");
        }
      } else {
        await dispatch(createProfessional(data)).unwrap();
        setSnackbarMessage("Professional created successfully!");
        setSnackbarSeverity("success");
      }
      handleClose();
      dispatch(fetchProfessionals());
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error while saving professional";
      setSnackbarMessage(`Error: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error saving professional:", error);
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
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      dispatch(deleteProfessional(deleteConfirmId));
      setSnackbarMessage("Professional deleted successfully!");
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
            Professionals
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {Array.isArray(list) ? list.length : 0} professional(s) registered
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
          disabled={loading || uploadLoading}
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
            "New Professional"
          )}
        </Button>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Search by name, role or bio..."
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
              ? "No professionals found"
              : "No professionals registered"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {searchTerm
              ? "Try searching with different terms."
              : 'Click "New Professional" to get started.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {filteredList.map((professional) => (
            <Grid item xs={12} sm={6} lg={4} key={professional.id}>
              <ProfessionalCard
                professional={professional}
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
        maxWidth="sm"
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
            {isEditing ? "Edit Professional" : "New Professional"}
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
              <Grid item xs={12} sm={8}>
                <TextField
                  {...register("name")}
                  label="Name"
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...register("hierarchy", { valueAsNumber: true })}
                  label="Hierarchy"
                  fullWidth
                  required
                  size="small"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("role")}
                  label="Role"
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Bio */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600, letterSpacing: 1 }}
            >
              Biography
            </Typography>
            <Box sx={{ mt: 1.5 }}>
              <TextField
                {...register("bio")}
                label="Bio"
                fullWidth
                required
                multiline
                rows={4}
                size="small"
                placeholder="Enter the professional's biography here..."
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Image */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontWeight: 600, letterSpacing: 1 }}
            >
              Profile Image
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "12px",
                p: 2,
              }}
            >
              <ImageInput
                imageUrl={imageOneUrl}
                imageType="imageOne"
                uploadLoading={uploadLoading}
              />
            </Box>
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
              disabled={loading || uploadLoading}
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

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        sx={{ "& .MuiDialog-paper": { borderRadius: "12px", maxWidth: 400 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Delete Professional
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this professional? This action
            cannot be undone.
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
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600 }}
          >
            Delete
          </Button>
        </DialogActions>
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
    </Box>
  );
};

export default ProfessionalManager;

/* ─── Professional Card Component ─── */

interface ProfessionalCardProps {
  professional: Professional;
  onEdit: (professional: Professional) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  theme: any;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  onEdit,
  onDelete,
  loading,
  theme,
}) => {
  const hasImage = !!professional.imageUrl;

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
      {/* Avatar / Image */}
      {hasImage ? (
        <Box
          sx={{
            height: 180,
            overflow: "hidden",
            borderBottom: `1px solid ${theme.palette.divider}`,
            cursor: "pointer",
          }}
          onClick={() => window.open(professional.imageUrl!, "_blank")}
        >
          <Box
            component="img"
            src={professional.imageUrl!}
            alt={professional.name}
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
      ) : (
        <Box
          sx={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: alpha(theme.palette.primary.main, 0.15),
              userSelect: "none",
            }}
          >
            {professional.name?.charAt(0)?.toUpperCase() || "P"}
          </Typography>
        </Box>
      )}

      <CardContent sx={{ flex: 1, p: 2.5, pb: 1 }}>
        {/* Name */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            lineHeight: 1.3,
            mb: 0.5,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {professional.name}
        </Typography>

        {/* Role & Hierarchy chips */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
          {professional.role && (
            <Chip
              icon={<Work sx={{ fontSize: 13 }} />}
              label={professional.role}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: "6px",
                fontSize: "0.72rem",
                height: 24,
                "& .MuiChip-icon": { ml: "4px" },
              }}
            />
          )}
          <Chip
            icon={<Badge sx={{ fontSize: 13 }} />}
            label={`#${professional.hierarchy}`}
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: "6px",
              fontSize: "0.72rem",
              height: 24,
              "& .MuiChip-icon": { ml: "4px" },
            }}
          />
        </Box>

        {/* Expandable bio */}
        {professional.bio && (
          <Accordion
            disableGutters
            elevation={0}
            sx={{
              mt: 0.5,
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
                View bio
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
                {professional.bio}
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
            onClick={() => onEdit(professional)}
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
            onClick={() => onDelete(professional.id)}
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
