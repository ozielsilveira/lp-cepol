import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Header from "../components/header";
import { Footer } from "../components/footers";
import { ReactNode } from "react";

// Estilização do container
const StyledLayoutContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));

// Componente LayoutContainer com suporte para hideHeader
interface LayoutContainerProps {
  children: ReactNode;
  
}

export const LayoutContainer = ({ children }: LayoutContainerProps) => (
  <StyledLayoutContainer>
    <Header />
    <Box sx={{ flex: 1 , padding: 4,}}>{children}</Box>
    <Footer />
  </StyledLayoutContainer>
);