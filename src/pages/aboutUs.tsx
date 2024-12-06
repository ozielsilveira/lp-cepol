import React from "react";
import { Container, Typography } from "@mui/material";

export const AboutUs: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Learn about our research group's history, mission, and values.
      </Typography>
    </Container>
  );
};
