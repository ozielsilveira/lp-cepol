import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import { Footer } from "../components/footers";
import Header from "../components/header";
import ProtectedRoute from "../components/protectedRoutes";
import { AboutUs } from "../pages/landing/aboutUs";
import { Articles } from "../pages/landing/articles";
import { Contact } from "../pages/landing/contact";
import { Equipment } from "../pages/landing/equipments";
import { Home } from "../pages/landing/home";
import { Professionals } from "../pages/landing/professionals";
import { Research } from "../pages/landing/research";
import { Login } from "../pages/manager/login";
import { Manager } from "../pages/manager/manager";
import { Box } from "@mui/material";
import { LayoutContainer } from "../components/layoutBox";
import ErrorBoundary from "../components/errorBoundary";

type CustomRouteObject = RouteObject & {
  path: string;
  type: "public" | "private" | "auth";
  element: ReactElement;
};

export const routes: CustomRouteObject[] = [
  {
    path: "/",
    type: "public",
    element: (
      <LayoutContainer>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Home />
        </Box>
        <Footer />
      </LayoutContainer>
    ),
  },
  {
    path: "/research",
    type: "public",
    element: (
      <LayoutContainer>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Research />
        </Box>
        <Footer />
      </LayoutContainer>
    ),
  },
  {
    path: "/professionals",
    type: "public",
    element: (
      <LayoutContainer>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Professionals />
        </Box>
        <Footer />
      </LayoutContainer>
    ),
  },
  {
    path: "/articles",
    type: "public",
    element: (
      <LayoutContainer>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Articles />
        </Box>
        <Footer />
      </LayoutContainer>
    ),
  },
  {
    path: "/about",
    type: "public",
    element: (
      <LayoutContainer>
        <Header />
        <Box sx={{ flex: 1 }}>
          <AboutUs />
        </Box>
        <Footer />
      </LayoutContainer>
    ),
  },
  {
    path: "/equipment",
    type: "public",
    element: (
      <LayoutContainer>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Equipment />
        </Box>
        <Footer />
      </LayoutContainer>
    ),
  },
  {
    path: "/contact",
    type: "public",
    element: (
      <LayoutContainer>
        <Header />
        <Box sx={{ flex: 1 }}>
          <Contact />
        </Box>
        <Footer />
      </LayoutContainer>
    ),
  },
  {
    path: "/manager",
    type: "private",
    element: (
      <ProtectedRoute>
        <Manager />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    type: "auth",
    element:
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>,
  },
];
