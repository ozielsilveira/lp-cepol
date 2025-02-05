import { styled, useMediaQuery } from "@mui/system";
import Box from "@mui/material/Box";
import Header from "../components/header";
import { Footer } from "../components/footers";
import { ReactNode } from "react";
import { SideBar } from "./sideBar";
import { Theme } from "@mui/material";
// import { Theme } from "@mui/material";

const StyledLayoutContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));
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

interface LayoutContainerProps {
  children: ReactNode;
}

export const LayoutContainerPrivate = ({ children }: LayoutContainerProps) => {
  // Verifica se está em desktop (md ou superior)
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <StyledLayoutContainer>
      <SideBar />
      <Box sx={{ flex: 1, padding: 4, width: isDesktop ? "80%" : "100%", marginLeft: isDesktop ? "14%" : 0 }}>
        {children}
      </Box>
    </StyledLayoutContainer>
  );
};