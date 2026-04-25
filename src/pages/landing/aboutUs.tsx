import {
  Alert,
  alpha,
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AboutUs as IAboutUs,
  fetchAboutUs,
} from "../../redux/slices/aboutUsSlice";
import { AppDispatch, IRootState } from "../../redux/store";

export const AboutUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const { list, status, loading, error } = useSelector(
    (state: IRootState) => state.aboutUs
  );

  useEffect(() => {
    if (list.length === 0 && !loading && status === "idle") {
      dispatch(fetchAboutUs());
    }
  }, [dispatch, list.length, loading, status]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed" || error) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert
          severity="error"
          sx={{ borderRadius: "10px" }}
          variant="outlined"
        >
          Failed to load "About Us" content: {error || "Unknown error."}
        </Alert>
      </Container>
    );
  }

  if (list.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          No "About Us" content available at this time.
        </Typography>
      </Container>
    );
  }

  const content: IAboutUs = list[0];
  const hasImages =
    content.images && content.images.length > 0;
  const hasTwoImages =
    hasImages && content.images!.length > 1 && !!content.images![1]?.url;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.6rem", md: "2rem" },
          }}
        >
          About Us
        </Typography>
        <Divider
          sx={{
            width: 48,
            mx: "auto",
            borderWidth: 2,
            borderColor: theme.palette.primary.main,
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Body Text */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          lineHeight: 1.85,
          fontSize: { xs: "0.95rem", md: "1.05rem" },
          mb: { xs: 3, md: 4 },
          whiteSpace: "pre-line",
        }}
      >
        {content.bodyText}
      </Typography>

      {/* Images */}
      {hasImages && (
        <Grid
          container
          spacing={3}
          sx={{ my: { xs: 2, md: 3 } }}
        >
          {content.images!.slice(0, 2).map((img, idx) =>
            img?.url ? (
              <Grid item xs={12} md={hasTwoImages ? 6 : 12} key={img.id || idx}>
                <Box
                  sx={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: `1px solid ${theme.palette.divider}`,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={img.url}
                    alt={img.title || `About us image ${idx + 1}`}
                    sx={{
                      width: "100%",
                      height: { xs: 220, md: 300 },
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {(img.title || img.description) && (
                    <Box sx={{ p: 2 }}>
                      {img.title && (
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700, mb: 0.3 }}
                        >
                          {img.title}
                        </Typography>
                      )}
                      {img.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.5 }}
                        >
                          {img.description}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid>
            ) : null
          )}
        </Grid>
      )}

      {/* Second Text */}
      {content.secondText && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.85,
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            mt: { xs: 2, md: 3 },
            whiteSpace: "pre-line",
          }}
        >
          {content.secondText}
        </Typography>
      )}
    </Container>
  );
};