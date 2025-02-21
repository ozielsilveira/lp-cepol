import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchEquipments } from "../../redux/slices/equipamentSlice";

export const Equipment: React.FC = () => {
  const dispatch = useAppDispatch();
  const equipmentList = useAppSelector((state) => state.equipment.list);
  const loading = useAppSelector((state) => state.equipment.loading);

  // Filtrar os equipamentos por tipo
  const processingEquipments = equipmentList.filter(
    (equipment) => equipment.type === "Processing"
  );
  const analyticsEquipments = equipmentList.filter(
    (equipment) => equipment.type === "Analytics"
  );

  useEffect(() => {
    if (equipmentList.length === 0 && !loading) {
      dispatch(fetchEquipments());
    }
  }, [dispatch, equipmentList.length, loading]);

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

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : // Verifica se há equipamentos
      equipmentList.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No equipments found
        </Typography>
      ) : (
        // Layout de colunas
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
            {processingEquipments.length === 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                No processing equipments found
              </Typography>
            ) : (
              processingEquipments.map((equipment) => (
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
                    <Box
                      display={"flex"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Box display={"flex-column"} sx={{ mr: 1 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {equipment.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Model: {equipment.description}
                        </Typography>
                      </Box>
                      {equipment?.imageUrl ? (
                        <Box
                          component={"img"}
                          onClick={() =>
                            window.open(
                              `${equipment?.imageUrl || ""}`,
                              "_blank"
                            )
                          }
                          src={equipment.imageUrl}
                          sx={{
                            width: "150px",
                            maxHeight: "55px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                          onError={(e) => (e.currentTarget.src = "")}
                        />
                      ) : (
                        <Box></Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
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
            {analyticsEquipments.length === 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                No analytics equipments found
              </Typography>
            ) : (
              analyticsEquipments.map((equipment) => (
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
                    <Box
                      display={"flex"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Box display={"flex-column"} sx={{ mr: 1 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {equipment.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Model: {equipment.description}
                        </Typography>
                      </Box>
                      {equipment?.imageUrl ? (
                        <Box
                          component={"img"}
                          onClick={() =>
                            window.open(
                              `${equipment?.imageUrl || ""}`,
                              "_blank"
                            )
                          }
                          src={equipment.imageUrl}
                          sx={{
                            width: "130px",
                            maxHeight: "50px", // Altura fixa para consistência
                            objectFit: "cover", // Mantém a proporção da imagem
                            borderRadius: "4px", // Opcional: para estética
                          }}
                          onError={(e) => (e.currentTarget.src = "")} // Caso a imagem falhe ao carregar
                        />
                      ) : (
                        <Box></Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
