import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

// Criação do tema Material-UI
const theme = createTheme();

const AppRoutes: React.FC = () => {
  // Renderiza as rotas dinamicamente
  const element = useRoutes(routes);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {element}
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
