import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Links Navegáveis */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box>
              <Link href="/about" color="inherit" underline="hover">
                About us
              </Link>
            </Box>
            <Box>
              <Link href="/professionals" color="inherit" underline="hover">
                Professionals
              </Link>
            </Box>
            <Box>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* <Typography variant="h6" gutterBottom>
              Ajuda
            </Typography>
            <Box>
              <Link href="/faq" color="inherit" underline="hover">
                FAQ
              </Link>
            </Box>
            <Box>
              <Link href="/support" color="inherit" underline="hover">
                Suporte
              </Link>
            </Box>
            <Box>
              <Link href="/terms" color="inherit" underline="hover">
                Termos de Serviço
              </Link>
            </Box> */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Direitos Autorais */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Sua Empresa. Todos os direitos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
