import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/header";
import { routes } from "./routes/routes";
import { Footer } from "./components/footers";

// Criação do tema Material-UI
const theme = createTheme();

const AppRoutes: React.FC = () => {
  // Renderiza as rotas dinamicamente
  const element = useRoutes(routes);

  return (
    <>
      <Header />
      {element}
      <Footer />
    </>
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
