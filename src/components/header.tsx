import React from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";

const Header: React.FC = () => {
  const location = useLocation();

  // Filtrar e mapear rotas
  const tabs = routes
    .filter((route) => route.path) // Filtra rotas sem path
    .map((route) => ({
      label:
        route.path === "/"
          ? "Home"
          : route.path.slice(1).charAt(0).toUpperCase() + route.path.slice(2),
      path: route.path!,
    }));

  return (
    <AppBar position="static">
      <Toolbar>
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
