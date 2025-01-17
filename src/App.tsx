import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { store } from "./redux/store";
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
      <Provider store={store}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppRoutes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
