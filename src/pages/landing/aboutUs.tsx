
import { Alert, Box, CircularProgress, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AboutUs as IAboutUs, fetchAboutUs } from "../../redux/slices/aboutUsSlice";
import { AppDispatch, IRootState } from "../../redux/store";

export const AboutUs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status, loading, error } = useSelector(
    (state: IRootState) => state.aboutUs
  );

  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    // Fetch About Us data only if it hasn't been fetched yet or is in an idle state
    if (list.length === 0 && !loading && status === "idle") {
      dispatch(fetchAboutUs());
    }
  }, [dispatch, list.length, loading, status]);

  // Display loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '300px' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading ...</Typography>
      </Box>
    );
  }

  // Display error state
  if (status === "failed" || error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Erro ao carregar o conteúdo "Sobre Nós": {error || "Erro desconhecido."}
        </Alert>
      </Box>
    );
  }

  // If no content is available after loading, show a message
  if (list.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
         No "About Us" content available at this time.
        </Typography>
      </Box>
    );
  }


  const aboutUsContent: IAboutUs = list[0];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '960px', margin: 'auto' }}>
      <Typography variant={isXs ? "h5" : "h4"} component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        About Us
      </Typography>

      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        {aboutUsContent.bodyText}
      </Typography>

      {/* Displaying up to two images */}
      {aboutUsContent.images && aboutUsContent.images.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: isXs ? "column" : "row",
            gap: 3,
            my: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {aboutUsContent.images[0]?.url && (
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                component="img"
                src={aboutUsContent.images[0].url}
                alt={aboutUsContent.images[0].title || "Imagem 1 sobre nós"}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '350px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  display: 'block', // Ensures no extra space below image
                  margin: '0 auto', // Center image
                }}
              />
              {aboutUsContent.images[0].title && (
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {aboutUsContent.images[0].title}
                </Typography>
              )}
              {aboutUsContent.images[0].description && (
                <Typography variant="body2" color="textSecondary">
                  {aboutUsContent.images[0].description}
                </Typography>
              )}
            </Box>
          )}

          {aboutUsContent.images[1]?.url && (
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                component="img"
                src={aboutUsContent.images[1].url}
                alt={aboutUsContent.images[1].title || "Imagem 2 sobre nós"}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '350px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              {aboutUsContent.images[1].title && (
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {aboutUsContent.images[1].title}
                </Typography>
              )}
              {aboutUsContent.images[1].description && (
                <Typography variant="body2" color="textSecondary">
                  {aboutUsContent.images[1].description}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}

      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
        {aboutUsContent.secondText}
      </Typography>
    </Box>
  );
};