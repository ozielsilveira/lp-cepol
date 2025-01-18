import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

interface Equipment {
  id: number;
  name: string;
  model: string;
}

const equipmentList: Equipment[] = [
  { id: 1, name: "Espectrofotômetro", model: "UV-1800" },
  { id: 2, name: "Cromatógrafo Gasoso", model: "GC-2020" },
  { id: 3, name: "Balança Analítica", model: "AX324" },
  { id: 4, name: "Microscópio Óptico", model: "CX33" },
  { id: 5, name: "Centrífuga", model: "5804R" },
  { id: 6, name: "Centrífuga", model: "5804R" },
  { id: 7, name: "Centrífuga", model: "5804R" },
  { id: 8, name: "Centrífuga", model: "5804R" },
  { id: 9, name: "Centrífuga", model: "5804R" },
  { id: 10, name: "Centrífuga", model: "5804R" },
];

export const Equipment: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Page Title */}
      <Typography
        sx={{ mb: 4, mt: 2 }}
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Equipments
      </Typography>

      {/* Equipment List */}
      <Grid container spacing={2} sx={{ maxWidth: 800 }}>
        {equipmentList.map((equipment) => (
          <Grid item xs={12} sm={6} key={equipment.id}>
            <Card
              sx={{
                backgroundColor: "primary.light",
                color: "text.primary",
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {equipment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Model: {equipment.model}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
