import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  fetchProfessionals,
  Professional,
} from "../../redux/slices/professionalSlice";

// interface Professional {
//   id: number;
//   name: string;
//   photo: string;
//   research: string[];
//   articles: string[];
//   hierarchy: string; // Define o nível do profissional
// }

// const professionals: Professional[] = [
//   {
//     id: 1,
//     name: "Dr. Alice Johnson",
//     photo:
//       "https://s2.glbimg.com/D7ouiVhAn1BVaU3wfp-zSgvWDTg=/600x0/filters:quality(70)/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/d/v/kFDwF0T3q2wkwvGH0DjA/whatsapp-image-2022-10-03-at-15.34.37.jpeg",
//     research: ["Genetics", "Molecular Biology"],
//     articles: [
//       "Understanding DNA Replication",
//       "Innovations in Genome Editing",
//     ],
//     hierarchy: "1",
//   },
//   {
//     id: 2,
//     name: "Dr. Robert Smith",
//     photo:
//       "https://www.qualityformationsblog.co.uk/wp-content/uploads/2019/07/who-can-be-a-company-director.jpg",
//     research: ["Neuroscience", "Cognitive Psychology"],
//     articles: ["The Brain and Behavior", "Advances in Neural Networks"],
//     hierarchy: "2",
//   },
//   {
//     id: 3,
//     name: "Dr. Robert Peterson",
//     photo:
//       "https://www.1stformationsblog.co.uk/wp-content/uploads/2022/09/Shutterstock_1361250623-2.jpg",
//     research: ["Neuroscience", "Cognitive Psychology"],
//     articles: ["The Brain and Behavior", "Advances in Neural Networks"],
//     hierarchy: "2",
//   },
//   {
//     id: 4,
//     name: "Dr. Emily White",
//     photo:
//       "https://i.pinimg.com/736x/35/44/a4/3544a4adf0d2b8d6f6b9e71e003fda3f.jpg",
//     research: ["Biochemistry"],
//     articles: ["Protein Folding Mechanisms"],
//     hierarchy: "3",
//   },
//   {
//     id: 5,
//     name: "Dr. Michael Brown",
//     photo:
//       "https://www.ucl.ac.uk/news/sites/news/files/styles/teaser_image/public/teaser_images/news_professor.png",
//     research: ["Microbiology"],
//     articles: ["Antibiotic Resistance Evolution"],
//     hierarchy: "3",
//   },
//   {
//     id: 6,
//     name: "Dr. Jane Wilson",
//     photo:
//       "https://st3.depositphotos.com/9998432/13335/i/450/depositphotos_133351428-stock-photo-portrait-of-a-confident-doctor.jpg",
//     research: ["Immunology"],
//     articles: ["Vaccination Strategies"],
//     hierarchy: "4",
//   },
// ];

// Função para organizar os profissionais em grupos por hierarquia
const groupByHierarchy = (list: Professional[]) => {
  const grouped: { [key: string]: Professional[] } = {};

  list.forEach((professional) => {
    if (!grouped[professional.hierarchy]) {
      grouped[professional.hierarchy] = [];
    }
    grouped[professional.hierarchy].push(professional);
  });

  // Retorna os grupos ordenados pela hierarquia (como array de arrays)
  return Object.entries(grouped)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([, professionals]) => professionals);
};

export const Professionals: React.FC = () => {
  const dispatch = useAppDispatch();
  const professionalList = useAppSelector((state) => state.professional.list);
  console.log(professionalList);
  const groupedProfessionals = groupByHierarchy(professionalList);

  useEffect(() => {
    if (professionalList.length === 0) {
      dispatch(fetchProfessionals());
    }
  }, [dispatch, professionalList.length]);
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
      <Box>
        {groupedProfessionals.map((group, index) => (
          <Grid
            container
            spacing={4}
            key={`hierarchy-${index}`}
            sx={{
              justifyContent: "center",
              mb: 4,
            }}
          >
            {group.map((professional) => (
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
                    image={professional.imageUrl}
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
                     { professional.role}
                    </Typography>
                    {/* <Typography
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
                    </Typography> */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};
