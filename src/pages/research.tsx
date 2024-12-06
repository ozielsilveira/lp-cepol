import React from "react";
import { Container, Typography } from "@mui/material";

export const Research: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Our Research
      </Typography>
      <Typography variant="body1">
        Here you can find information about our ongoing research projects and
        areas of focus.
      </Typography>
    </Container>
  );
};
