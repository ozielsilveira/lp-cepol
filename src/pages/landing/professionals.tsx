import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

interface Professional {
  id: number;
  name: string;
  photo: string;
  research: string[];
  articles: string[];
}

const professionals: Professional[] = [
  {
    id: 1,
    name: "Dr. Alice Johnson",
    photo: "https://via.placeholder.com/150",
    research: ["Genetics", "Molecular Biology"],
    articles: [
      "Understanding DNA Replication",
      "Innovations in Genome Editing",
    ],
  },
  {
    id: 2,
    name: "Dr. Robert Smith",
    photo:
      "https://cdn.pixabay.com/photo/2024/01/23/18/55/ai-generated-8528080_1280.jpg",
    research: ["Neuroscience", "Cognitive Psychology"],
    articles: ["The Brain and Behavior", "Advances in Neural Networks"],
  },
  {
    id: 3,
    name: "Dr. Robert Smith",
    photo:
      "https://cdn.pixabay.com/photo/2024/01/23/18/55/ai-generated-8528080_1280.jpg",
    research: ["Neuroscience", "Cognitive Psychology"],
    articles: ["The Brain and Behavior", "Advances in Neural Networks"],
  },
  // Adicione mais profissionais conforme necessário
];
export const Professionals: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ mb: 4, mt: 2 }}
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Meet the Team
      </Typography>
      <Typography color="text.secondary" sx={{ textAlign: "center", mb: 4 }}>
        Our dedicated team works tirelessly to deliver exceptional results.
      </Typography>
      <Grid container spacing={4}>
        {professionals.map((professional) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={professional.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card sx={{ maxWidth: 360 }}>
              <CardMedia
                component="img"
                height="140"
                image={professional.photo}
                alt={professional.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {professional.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <strong>Research:</strong>{" "}
                  {professional.research.length > 0
                    ? professional.research.join(", ")
                    : "None"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <strong>Articles:</strong>{" "}
                  {professional.articles.length > 0
                    ? professional.articles.join(", ")
                    : "None"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
