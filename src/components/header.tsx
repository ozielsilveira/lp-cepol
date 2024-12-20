import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";

const Header: React.FC = () => {
  const location = useLocation();

  // Filtrar e mapear rotas
  const tabs = routes
    .filter((route) => route.path && route.type === "public") // Filtra rotas sem path
    .map((route) => ({
      label:
        route.path === "/"
          ? "Home"
          : route.path.slice(1).charAt(0).toUpperCase() + route.path.slice(2),
      path: route.path!,
    }));

  return (
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
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              label={tab.label}
              value={tab.path}
              component={Link}
              to={tab.path}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
