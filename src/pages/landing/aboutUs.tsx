// import React from "react";
// import { Box, Card, CardContent, Container, Typography } from "@mui/material";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"; // Ícone do MUI

// export const AboutUs: React.FC = () => {
//   const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

//   return (
//     <Box
//       component="section"
//       sx={{
//         width: "100%",
//         py: { xs: 12, md: 24, lg: 32 },
//         bgcolor: "grey.100",
//       }}
//     >
//       <Container maxWidth="md" sx={{ px: { xs: 4, md: 6 }, maxWidth: "sm" }}>
//         <Typography
//           variant="h2"
//           component="h2"
//           align="center"
//           sx={{
//             fontWeight: "bold",
//             fontSize: { xs: "2rem", sm: "3rem" },
//             lineHeight: "1.2",
//             mb: 8,
//           }}
//         >
//           About Us
//         </Typography>
//         <Card>
//           <CardContent sx={{ pt: 6 }}>
//             <ArticleOutlinedIcon
//               sx={{
//                 fontSize: "3rem",
//                 color: "primary.main",
//                 display: "block",
//                 mb: 4,
//                 mx: "auto",
//               }}
//             />
//             <Typography
//               variant="body1"
//               align="center"
//               sx={{ color: "grey.700", whiteSpace: "pre-line" }}
//             >
//               {content}
//             </Typography>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// icones


import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// const teamMembers = [
//   { name: "John Doe", role: "CEO", image: "https://via.placeholder.com/150" },
//   { name: "Jane Smith", role: "CTO", image: "https://via.placeholder.com/150" },
//   { name: "Michael Brown", role: "Lead Developer", image: "https://via.placeholder.com/150" },
// ];

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

      {/* Team Section
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Meet the Team
        </Typography>
        <Typography color="text.secondary">
          Our dedicated team works tirelessly to deliver exceptional results.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <Box textAlign="center">
              <Avatar
                alt={member.name}
                src={member.image}
                sx={{ width: 100, height: 100, margin: "0 auto", marginBottom: 2 }}
              />
              <Typography variant="h6" component="h3">
                {member.name}
              </Typography>
              <Typography color="text.secondary">{member.role}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid> */}
    </Container>
  );
};
