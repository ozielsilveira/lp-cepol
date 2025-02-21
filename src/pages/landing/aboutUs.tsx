
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

;

export const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ marginBottom: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography
          sx={{ mb: 4, mt: 2 }}
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          The CEPOL Laboratory has extensive experience in the production,
          characterization, reuse, properties, structure-property relationships
          and applications of polymers, in addition to the capacity to work in
          any of these fields, aiming to assist companies with services
          performed in our laboratory.
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Develop new knowledge about polymeric materials that are of interest
          to various market sectors; Conduct scientific and technical research
          of excellence in the polymer area; Transfer knowledge about laboratory
          practices and equipment operation to young people who aim for a future
          in academia and industry
        </Typography>
      </Box>

      {/* Mission, Vision, Values Section */}
      {/* <Grid container spacing={4} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <MissionIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Our Mission
            </Typography>
            <Typography color="text.secondary">
              To provide innovative solutions that empower businesses to achieve
              their goals.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <VisionIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Our Vision
            </Typography>
            <Typography color="text.secondary">
              To be a global leader in technology and innovation, making a
              positive impact worldwide.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box textAlign="center">
            <TeamIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h5" component="h3" gutterBottom>
              Our Values
            </Typography>
            <Typography color="text.secondary">
              Integrity, innovation, and customer-centricity are at the core of
              everything we do.
            </Typography>
          </Box>
        </Grid>
      </Grid> */}
    </Container>
  );
};
