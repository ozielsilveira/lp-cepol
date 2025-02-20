import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { Article } from '../redux/slices/articlesSlice';
interface CardCarouselProps {
  article: Article;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ article }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "250px",
        height: "300px",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" component="h3" noWrap>
        {article.title}
      </Typography>
      <Typography variant="body2" noWrap>
        {article.description}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" noWrap>
        {article.professional?.name}
      </Typography>
    </Paper>
  );
};
