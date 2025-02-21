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
  const detailedResearch = researchList.find(
    (research) => research.id.toString() === id
  );
  console.log(detailedResearch);

  if (!detailedResearch) {
    return <p>No research details found.</p>;
  }

  return (
    <Box sx={{ pb: {xs:0.5, md:4}, pl:{xs:0 , md:20}, pr: {xs:0 , md:20},pt: {xs:1 , md:3} }}>
      {/* Título principal */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography sx={{ fontWeight: "bold" ,  fontSize: {md:"h5", xs:"1.2rem"} , textAlign:{xs:"justify", md:"start"}}} variant="h5">
          {detailedResearch.title}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, textAlign:"justify" }}>
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
            <Typography variant="body1" sx={{ textAlign:"justify"}}>{detailedResearch.bodyText}</Typography>
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
            <Typography variant="body1" sx={{ textAlign:"justify"}}>
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
                  // height="200"
                  sx={{
                    width: "400px",
                    height: "auto",
                    maxHeight: "350px",
                    objectFit: "cover",
                    margin: "auto",
                  }}
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
        <Typography variant="h6" align="left">
          Partner: {detailedResearch.professional?.name}
        </Typography>
      </Box>
    </Box>
  );
};
