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
import { fetchArticles } from "../../redux/slices/articlesSlice";

export const ArticleDetailed: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const articlesList = useAppSelector((state) => state.articles.list);
  console.log("Lista", articlesList);
  useEffect(() => {
    if (articlesList.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articlesList.length]);
  // Simula a busca dos dados de pesquisa detalhada
  const detailedArticle = articlesList.find(
    (research) => research.id.toString() === id
  );
  console.log(detailedArticle);

  if (!detailedArticle) {
    return <p>No research details found.</p>;
  }

  return (
    <Box sx={{ pb: 5, pl: 20, pr: 20 }}>
      {/* Título principal */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {detailedArticle.title}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {detailedArticle.description}
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
            <Typography variant="body1">{detailedArticle.bodyText}</Typography>
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
              {detailedArticle.secondText}
            </Typography>
          </Box>
        </Grid>

        {/* Coluna de imagens */}
        <Grid item xs={12} md={6}>
          {detailedArticle.images === undefined || null ? (
            <p>No images found.</p>
          ) : (
            detailedArticle.images.map((image, index) => (
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
      <Box display={'flex'}>
        <Typography variant="h6" sx={{ mt: 2, mr:2 }}>
          Author: {detailedArticle.author}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 , ml:2}}>
          Published Date: {detailedArticle.published}
        </Typography>

        </Box>
    </Box>
  );
};
