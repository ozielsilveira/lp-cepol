import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchResearch } from "../../redux/slices/researchSlice";

export const ResearchDetailed: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const researchList = useAppSelector((state) => state.research.list);
  console.log("Lista", researchList);
  console.log("id", id);

  useEffect(() => {
    if (researchList.length === 0) {
      dispatch(fetchResearch());
    }
  }, [dispatch, researchList.length]);
  // Filtra a research que tem o mesmo id recebido via URL
  const detailedResearch = researchList.find(
    (research) => research.id.toString() === id
  );
  console.log(detailedResearch);

  if (!detailedResearch) {
    return <p>No research details found.</p>;
  }

  return (
    <Box sx={{ pb: 5, pl: 20, pr: 20 }}>
      {/* Título principal */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {detailedResearch.title}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {detailedResearch.description}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Coluna de textos */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              // border: "2px solid #e0e0e0",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              // backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="body1">{detailedResearch.bodyText}</Typography>
          </Box>
          <Box
            sx={{
              // border: "2px solid #e0e0e0",
              borderRadius: 2,
              padding: 2,
              marginBottom: 2,
              // backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="body1">
              {detailedResearch.secondText}
            </Typography>
          </Box>
        </Grid>

        {/* Coluna de imagens */}
        <Grid item xs={12} md={6}>
          {detailedResearch.images === undefined ? (
            <p>No images found.</p>
          ) : (
            detailedResearch.images.map((image, index) => (
              <Card key={`image-${index}`} sx={{ marginBottom: 2 }}>
                <Box ml={"13px"}>
                  <Typography variant="caption" align="center">
                    {image.title}
                  </Typography>
                </Box>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url}
                  alt={image.title}
                />
                <CardContent>
                  <Typography variant="caption" align="center">
                    {image.description}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
      <Box ml={"13px"}>
        <Typography variant="caption" align="center">
          Partner: {detailedResearch.professional?.name}
        </Typography>
      </Box>
    </Box>
  );
};
