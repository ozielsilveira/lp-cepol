import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Grid2,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  fetchProfessionals,
  Professional,
} from "../../redux/slices/professionalSlice";

const groupByHierarchy = (list: Professional[]) => {
  const grouped: { [key: string]: Professional[] } = {};

  list.forEach((professional) => {
    if (!grouped[professional.hierarchy]) {
      grouped[professional.hierarchy] = [];
    }
    grouped[professional.hierarchy].push(professional);
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([, professionals]) => professionals);
};

export const Professionals: React.FC = () => {
  const dispatch = useAppDispatch();
  const professionalList = useAppSelector((state) => state.professional.list);
  const loading = useAppSelector((state) => state.professional.loading);

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
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {groupedProfessionals.map((group, index) => (
            <Grid2
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
                  <Card sx={{ width: { xs: 240, md: 360 } }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: "300px",
                        height: "220px",
                        objectFit: "cover",
                        margin: "auto",
                        borderRadius: "10px",
                      }}
                      image={professional.imageUrl ?? ""}
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
                        {professional.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {professional.bio}
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
            </Grid2>
          ))}
        </Box>
      )}
    </Box>
  );
};
