import {
  AppBar,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
const Header: React.FC = () => {
  const location = useLocation();

  // Filtrar e mapear rotas
  const tabs = routes
    .filter((route) => route.path && route.type === "public" && !route.path.includes(":")) // Filtra rotas sem path
    .map((route) => ({
      label:
        route.path === "/"
          ? "Home"
          : route.path.slice(1).charAt(0).toUpperCase() + route.path.slice(2),
      path: route.path!,
    }));
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{}}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center", // Centraliza horizontalmente
            alignItems: "center", // Centraliza verticalmente
          }}
        >
          <Tabs
            value={location.pathname}
            textColor="inherit"
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{
              sx: {
                backgroundColor: "white", // Cor do indicador personalizado
                height: "3px", // Espessura do indicador
                borderRadius: "4px", // Deixe as bordas arredondadas, se desejar
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.path}
                label={tab.label}
                value={tab.path}
                component={Link}
                to={tab.path}
                sx={{
                  textTransform: "none", // Remove o uppercase padrão
                  fontWeight: "500", // Personalize o peso da fonte, se desejar
                  "&:hover": {
                    color: "white", // Muda a cor ao passar o mouse
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      backgroundColor: "white",
                      transform: "scaleX(1)",
                      transition: "transform 0.3s",
                    },
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "background.default",
                    transform: "scaleX(0)",
                    transition: "transform 0.3s",
                  },
                  "&.Mui-selected": {
                    color: "white", // Cor do texto da aba ativa
                    "&::before": {
                      backgroundColor: "background.default", // Barra da aba ativa
                      transform: "scaleX(1)",
                    },
                  },
                }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
