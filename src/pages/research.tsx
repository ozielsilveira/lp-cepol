import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export const Research: React.FC = () => {
  const researchs = [
    {
      id: 1,
      title: "Development of Next-Generation Vaccines",
      description: "We are working on a revolutionary approach...",
    },
    {
      id: 2,
      title: "Restoration of Degraded Ecosystems",
      description: "Our team is developing innovative techniques...",
    },
    {
      id: 3,
      title: "Quantum Materials for Computing",
      description: "We investigate new materials with quantum properties...",
    },
  ];
  return (
    <Container>
      <Box
        role="tabpanel"
        hidden={false}
        id="research-tab"
        aria-labelledby="research-tab-label"
        sx={{ py: { xs: 3, md: 6, lg: 8 }, bgcolor: "white" }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            gutterBottom
          >
            Ongoing Research
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {researchs.map((research) => (
            <Grid item xs={12} sm={6} lg={4} key={research.id}>
              <Card>
                <CardHeader
                  // avatar={<AtomIcon style={{ fontSize: "3rem", color: "#1e88e5" }} />}
                  title={
                    <Typography variant="h6" component="h3">
                      {research.title}
                    </Typography>
                  }
                  sx={{ textAlign: "center", pb: 0 }}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {research.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
