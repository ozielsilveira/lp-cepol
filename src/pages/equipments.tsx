import React from "react";
import { Container, Typography } from "@mui/material";

export const Equipment: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Our Equipment
      </Typography>
      <Typography variant="body1">
        Discover the state-of-the-art equipment and facilities we use in our
        research.
      </Typography>
    </Container>
  );
};
