import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#13307b",
    },
    secondary: {
      main: "#1460be",
    },
    background: {
      default: "#ffffff",
      paper: "#f4f6f8",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    
    fontFamily: "var(--font-geist-sans)", // Fonte padrão
    h1: { fontFamily: "var(--font-geist-sans)" },
    h2: { fontFamily: "var(--font-geist-sans)" },
    body1: { fontFamily: "var(--font-geist-mono)" }, // Por exemplo, para textos
    button: { fontFamily: "var(--font-geist-mono)" }, // Para botões

    // fontFamily: "'Roboto', sans-serif",
  },
});