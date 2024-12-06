import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Email } from "@mui/icons-material";

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          CPOL Group
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Advancing knowledge through innovative research
        </Typography>
        <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "center" }}>
          <IconButton
            aria-label="Facebook"
            color="primary"
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            color="primary"
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            color="primary"
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            aria-label="Email"
            color="primary"
            component={Link}
            href="mailto:contact@researchgroup.com"
          >
            <Email />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Research Group Name. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
