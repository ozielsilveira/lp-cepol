import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
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
            <Box>
              <Link href="/auth" color="inherit" underline="hover">
                Login
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
              Location
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton
                href="https://maps.app.goo.gl/YF9BhUaZYx529acJ9"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <LocationOnIcon />
              </IconButton>
              <Typography variant="h6" gutterBottom fontSize={"small"}>
                Rod. Gov. Jorge Lacerda, 3800 - Sangao, Criciúma - SC, 88807-600
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton
                href="mailto:matheus.vgz@unesc.net"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <EmailIcon />
              </IconButton>
              <Typography variant="h6" gutterBottom fontSize={"small"}>
                matheus.vgz@unesc.net
              </Typography>
            </Box>

          </Grid>
        </Grid>

        {/* Direitos Autorais */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} CPOL. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
