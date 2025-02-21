import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Article } from '../redux/slices/articlesSlice';

interface CardCarouselProps {
  article: Article;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ article }) => {
  const navigate = useNavigate();

  // Verifica se existe uma URL de imagem válida
  const hasImage = !!article.images?.[0]?.url;

  return (
    <Card
      onClick={() => navigate(`/articles/${article.id}`)}
      elevation={4}
      sx={{
        width: "280px",
        height: "344px",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      }}
    >
      {/* Seção de Imagem - Renderiza apenas se tiver URL */}
      {hasImage && (
        <CardMedia
          component="img"
          height="150"
          image={article.images![0].url}
          alt={article.images![0].title || article.title}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
      )}

      {/* Conteúdo */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: 2,
          "&:last-child": { paddingBottom: 2 },
        }}
      >
        {/* Título */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {article.title}
        </Typography>

        {/* Descrição */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: hasImage ? 3 : 5, // Ajusta linhas baseado na presença da imagem
            WebkitBoxOrient: "vertical",
            mb: 1.5,
          }}
        >
          {article.description}
        </Typography>

        {/* Autor e Data */}
        <Box sx={{ mt: "auto" }}>
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ fontWeight: 500 }}
          >
            {article.professional?.name || "Autor Desconhecido"}
          </Typography>
          {article.published && (
            <Typography variant="caption" color="text.secondary">
              {article.published}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};