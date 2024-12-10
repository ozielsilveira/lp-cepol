import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#13307b",
    },
    secondary: {
      main: "#1460be",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)", // Fonte padrão
    h1: { fontFamily: "var(--font-geist-sans)" },
    h2: { fontFamily: "var(--font-geist-sans)" },
    body1: { fontFamily: "var(--font-geist-mono)" }, // Por exemplo, para textos
    button: { fontFamily: "var(--font-geist-mono)" }, // Para botões

  },
});