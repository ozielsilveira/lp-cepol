// import React from "react";
// import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

// interface Equipment {
//   id: number;
//   name: string;
//   model: string;
//   type: string;
// }

// const equipmentList: Equipment[] = [
//   { id: 1, name: "Espectrofotômetro", model: "UV-1800", type: "Processing" },
//   { id: 2, name: "Cromatógrafo Gasoso", model: "GC-2020", type: "Analytics" },
//   { id: 3, name: "Balança Analítica", model: "AX324", type: "Analytics" },
//   { id: 4, name: "Microscópio Óptico", model: "CX33", type: "Analytics" },
//   { id: 5, name: "Centrífuga", model: "5804R", type: "Processing" },
//   { id: 6, name: "Centrífuga", model: "5804R", type: "Processing" },
//   { id: 7, name: "Centrífuga", model: "5804R", type: "Processing" },
//   { id: 8, name: "Centrífuga", model: "5804R", type: "Analytics" },
//   { id: 9, name: "Centrífuga", model: "5804R", type: "Analytics" },
//   { id: 10, name: "Centrífuga", model: "5804R", type: "Processing" },
// ];

// export const Equipment: React.FC = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       {/* Page Title */}
//       <Typography
//         sx={{ mb: 4, mt: 2 }}
//         variant="h4"
//         fontWeight="bold"
//         gutterBottom
//       >
//         Equipments
//       </Typography>

//       {/* Equipment List */}
//       <Grid container spacing={2} sx={{ maxWidth: 800 }}>
//         {equipmentList.map((equipment) => (
//           <Grid item xs={12} sm={6} key={equipment.id}>
//             <Card
//               sx={{
//                 backgroundColor: "primary.light",
//                 color: "text.primary",
//                 boxShadow: 2,
//               }}
//             >
//               <CardContent>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                   {equipment.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Model: {equipment.model}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

import React, { useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchEquipments } from "../../redux/slices/equipamentSlice";



// const equipmentList: Equipment[] = [
//   { id: 1, name: "Espectrofotômetro", model: "UV-1800", type: "Processing" },
//   { id: 2, name: "Cromatógrafo Gasoso", model: "GC-2020", type: "Analytics" },
//   { id: 3, name: "Balança Analítica", model: "AX324", type: "Analytics" },
//   { id: 4, name: "Microscópio Óptico", model: "CX33", type: "Analytics" },
//   { id: 5, name: "Centrífuga", model: "5804R", type: "Processing" },
//   { id: 6, name: "Centrífuga", model: "5804R", type: "Processing" },
//   { id: 7, name: "Centrífuga", model: "5804R", type: "Processing" },
//   { id: 8, name: "Centrífuga", model: "5804R", type: "Analytics" },
//   { id: 9, name: "Centrífuga", model: "5804R", type: "Analytics" },
//   { id: 10, name: "Centrífuga", model: "5804R", type: "Processing" },
// ];

export const Equipment: React.FC = () => {
  const dispatch = useAppDispatch();
  const equipmentList = useAppSelector((state) => state.equipment.list);
  console.log(equipmentList);
  // Filtrar os equipamentos por tipo
  const processingEquipments = equipmentList.filter(
    (equipment) => equipment.type === "Processing"
  );
  const analyticsEquipments = equipmentList.filter(
    (equipment) => equipment.type === "Analytics"
  );
 useEffect(() => {
    if (equipmentList.length === 0) {
      dispatch(fetchEquipments());
    }
  }, [dispatch, equipmentList.length]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Título da página */}
      <Typography
        sx={{ mb: 4, mt: 2 }}
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Equipments
      </Typography>

      {/* Layout de colunas */}
      <Grid container spacing={4} sx={{ maxWidth: 1200 }}>
        {/* Coluna de Processing */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Processing
          </Typography>
          {processingEquipments.map((equipment) => (
            <Card
              key={equipment.id}
              sx={{
                backgroundColor: "primary.light",
                color: "text.primary",
                boxShadow: 2,
                mb: 2,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {equipment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Model: {equipment.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Coluna de Analytics */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            Analytics
          </Typography>
          {analyticsEquipments.map((equipment) => (
            <Card
              key={equipment.id}
              sx={{
                backgroundColor: "primary.light",
                color: "text.primary",
                boxShadow: 2,
                mb: 2,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {equipment.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Model: {equipment.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};