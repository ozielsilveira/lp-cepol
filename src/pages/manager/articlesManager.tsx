import { Add, Delete, Edit, Search, CalendarToday, Person, ImageOutlined, ExpandMore } from "@mui/icons-material";
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
  Stack,
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
import {
  Article,
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
} from "../../redux/slices/articlesSlice";
import { setImageUrls } from "../../redux/slices/fileUploadSlice";
import { fetchProfessionals } from "../../redux/slices/professionalSlice";
import { AppDispatch, IRootState, useAppSelector } from "../../redux/store";

export const ArticlesManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const professionalList = useAppSelector((state) => state.professional.list);
  const { list, status, loading, error } = useSelector(
    (state: IRootState) => state.articles
  );
  const {
    imageOneUrl,
    imageTwoUrl,
    loading: uploadLoading,
  } = useAppSelector((state) => state.image);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, control } =
    useForm<Article>();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!list || (list.length === 0 && status === "idle")) {
      dispatch(fetchArticles());
    }
    if (professionalList.length === 0) {
      dispatch(fetchProfessionals());
    }
  }, [dispatch, list, status]);

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
      (a) =>
        a.title?.toLowerCase().includes(lower) ||
        a.author?.toLowerCase().includes(lower) ||
        a.description?.toLowerCase().includes(lower)
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
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("success");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit: SubmitHandler<Article> = async (data) => {
    try {
      const cleanedData = { ...data };

      if (!cleanedData.professionalId) {
        delete cleanedData.professionalId;
      }

      if (cleanedData.images) {
        cleanedData.images = cleanedData.images.filter((img) => img?.url);

        if (cleanedData.images.length === 0) {
          delete cleanedData.images;
        }
      }

      if (isEditing) {
        if (data.id) {
          await dispatch(
            updateArticle(cleanedData as Required<Article>)
          ).unwrap();
          setSnackbarMessage("Article updated successfully!");
          setSnackbarSeverity("success");
        }
      } else {
        await dispatch(createArticle(cleanedData)).unwrap();
        setSnackbarMessage("Article created successfully!");
        setSnackbarSeverity("success");
      }
      handleClose();
      dispatch(fetchArticles());
      setSnackbarOpen(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error while saving Article";
      setSnackbarMessage(`Error: ${errorMessage}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Erro ao salvar Article:", error);
    }
  };

  const handleEdit = (article: Article) => {
    setIsEditing(true);
    setOpen(true);
    setValue("id", article.id);
    setValue("title", article.title);
    setValue("description", article.description);
    setValue("author", article.author);
    setValue("published", article.published);
    setValue("bodyText", article.bodyText);
    setValue("secondText", article.secondText);
    setValue("images.0.title", article.images?.[0]?.title || "");
    setValue("images.0.description", article.images?.[0]?.description || "");
    setValue("images.0.url", article.images?.[0]?.url || "");
    setValue("images.1.title", article.images?.[1]?.title || "");
    setValue("images.1.description", article.images?.[1]?.description || "");
    setValue("images.1.url", article.images?.[1]?.url || "");
    setValue("professionalId", article.professionalId || "");

    dispatch(
      setImageUrls({
        imageOneUrl: article.images?.[0]?.url || null,
        imageTwoUrl: article.images?.[1]?.url || null,
      })
    );
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      dispatch(deleteArticle(deleteConfirmId));
      setSnackbarMessage("Article deleted successfully!");
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
            Articles
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {Array.isArray(list) ? list.length : 0} article(s) registered
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
            "New Article"
          )}
        </Button>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Search by title, author or description..."
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
            {searchTerm ? "No articles found" : "No articles registered"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {searchTerm
              ? "Try searching with different terms."
              : 'Click "New Article" to get started.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {filteredList.map((article) => (
            <Grid item xs={12} sm={6} lg={4} key={article.id}>
              <ArticleCard
                article={article}
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
            {isEditing ? "Edit Article" : "New Article"}
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
                  {...register("title")}
                  label="Title"
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...register("author")}
                  label="Author"
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("published")}
                  label="Published Date"
                  fullWidth
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12}>
                <TextField
                  {...register("description")}
                  label="Description"
                  fullWidth
                  required
                  multiline
                  rows={2}
                  size="small"
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
                    label="Title"
                    fullWidth
                    size="small"
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    {...register("images.0.description")}
                    label="Description"
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
                    label="Title"
                    fullWidth
                    size="small"
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    {...register("images.1.description")}
                    label="Description"
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
          Delete Article
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to delete this article? This action cannot be undone.
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
    </Box>
  );
};

/* ─── Article Card Component ─── */

interface ArticleCardProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  theme: any;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onEdit,
  onDelete,
  loading,
  theme,
}) => {
  const hasImage = !!article.images?.[0]?.url;

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
          onClick={() => window.open(article.images![0].url, "_blank")}
        >
          <Box
            component="img"
            src={article.images![0].url}
            alt={article.images?.[0]?.title || article.title}
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
          {article.title}
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
          {article.description}
        </Typography>

        {/* Meta info */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
          {article.author && (
            <Chip
              icon={<Person sx={{ fontSize: 14 }} />}
              label={article.author}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: "6px",
                fontSize: "0.72rem",
                height: 26,
                "& .MuiChip-icon": { ml: "4px" },
              }}
            />
          )}
          {article.published && (
            <Chip
              icon={<CalendarToday sx={{ fontSize: 12 }} />}
              label={article.published}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: "6px",
                fontSize: "0.72rem",
                height: 26,
                "& .MuiChip-icon": { ml: "4px" },
              }}
            />
          )}
        </Stack>

        {article.professional?.name && (
          <Chip
            label={article.professional.name}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: "6px",
              fontSize: "0.72rem",
              height: 24,
              mt: 0.5,
            }}
          />
        )}

        {/* Expandable body text */}
        {article.bodyText && (
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
                sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}
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
                {article.bodyText}
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
            onClick={() => onEdit(article)}
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
            onClick={() => onDelete(article.id)}
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
