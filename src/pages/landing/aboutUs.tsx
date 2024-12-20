import React from "react";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"; // Ícone do MUI

export const AboutUs: React.FC = () => {
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        py: { xs: 12, md: 24, lg: 32 },
        bgcolor: "grey.100",
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 4, md: 6 }, maxWidth: "sm" }}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", sm: "3rem" },
            lineHeight: "1.2",
            mb: 8,
          }}
        >
          About Us
        </Typography>
        <Card>
          <CardContent sx={{ pt: 6 }}>
            <ArticleOutlinedIcon
              sx={{
                fontSize: "3rem",
                color: "primary.main",
                display: "block",
                mb: 4,
                mx: "auto",
              }}
            />
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "grey.700", whiteSpace: "pre-line" }}
            >
              {content}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
