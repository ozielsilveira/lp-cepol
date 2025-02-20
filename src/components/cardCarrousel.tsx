import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { Article } from '../redux/slices/articlesSlice';
import { useNavigate } from "react-router-dom";
interface CardCarouselProps {
  article: Article;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ article }) => {
  const navigate = useNavigate();
  return (
    <Paper
      onClick={() => navigate(`/articles/${article.id}`)}
      elevation={3}
      sx={{
        width: "250px",
        height: "300px",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          // bgcolor: "grey.100",
        },
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
