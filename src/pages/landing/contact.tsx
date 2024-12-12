import React from "react";
import { Container, Typography } from "@mui/material";

export const Contact: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1">
        Get in touch with our research group for collaborations or inquiries.
      </Typography>
    </Container>
  );
};
