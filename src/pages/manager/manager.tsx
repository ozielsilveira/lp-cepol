import {
  Article as ArticleIcon,
  Build as EquipmentIcon,
  People as ProfessionalIcon,
  Search as ResearchIcon
} from '@mui/icons-material'; // Ícones do Material-UI
import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion'; // Para animações
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Manager: React.FC = () => {
  const navigate = useNavigate();

  // Definição dos cards com título, rota e ícone correspondente
  const cards = [
    { id: 1, title: 'Articles', route: '/manager/articles', icon: <ArticleIcon /> },
    { id: 2, title: 'Researchs', route: '/manager/researchs', icon: <ResearchIcon /> },
    { id: 3, title: 'Equipments', route: '/manager/equipments', icon: <EquipmentIcon /> },
    { id: 4, title: 'Professionals', route: '/manager/professionals', icon: <ProfessionalIcon /> },
    { id: 5, title: 'AboutUs', route: '/manager/aboutUs', icon: <InfoIcon /> },
  ];

  // Função para navegar para a rota desejada
  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Welcome to the Manager
        </Typography>
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.id}>
              <motion.div
                whileHover={{ scale: 1.05 }} // Animação ao passar o mouse
                whileTap={{ scale: 0.95 }} // Animação ao clicar
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    boxShadow: 3,
                    '&:hover': { boxShadow: 6 }, // Efeito de sombra ao passar o mouse
                  }}
                >
                  <CardActionArea onClick={() => handleNavigation(card.route)}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ mb: 2, color: 'primary.main' }}>{card.icon}</Box>
                      <Typography variant="h5" component="div">
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Gerenciar {card.title.toLowerCase()}.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};