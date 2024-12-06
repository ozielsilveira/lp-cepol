import React from "react";
import { Container, Typography } from "@mui/material";

export const Articles: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Articles
      </Typography>
      <Typography variant="body1">
        Browse our published articles and research papers.
      </Typography>
    </Container>
  );
};
