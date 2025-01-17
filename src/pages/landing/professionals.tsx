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
    photo: "https://s2.glbimg.com/D7ouiVhAn1BVaU3wfp-zSgvWDTg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/d/v/kFDwF0T3q2wkwvGH0DjA/whatsapp-image-2022-10-03-at-15.34.37.jpeg",
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
      "https://www.qualityformationsblog.co.uk/wp-content/uploads/2019/07/who-can-be-a-company-director.jpg",
    research: ["Neuroscience", "Cognitive Psychology"],
    articles: ["The Brain and Behavior", "Advances in Neural Networks"],
  },
  {
    id: 3,
    name: "Dr. Robert Peterson",
    photo:
      "https://www.1stformationsblog.co.uk/wp-content/uploads/2022/09/Shutterstock_1361250623-2.jpg",
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
