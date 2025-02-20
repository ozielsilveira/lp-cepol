import { Box } from "@mui/material";
import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import PolimerImg from "../../public/images/poliBack.jpg";
import ErrorBoundary from "../components/errorBoundary";
import {
  LayoutContainer,
  LayoutContainerPrivate,
} from "../components/layoutBox";
import ProtectedRoute from "../components/protectedRoutes";
import { AboutUs } from "../pages/landing/aboutUs";
import { Articles } from "../pages/landing/articles";
import { ArticleDetailed } from "../pages/landing/articles-detail";
import { Contact } from "../pages/landing/contact";
import { Equipment } from "../pages/landing/equipments";
import { Home } from "../pages/landing/home";
import { Professionals } from "../pages/landing/professionals";
import { Research } from "../pages/landing/research";
import { ResearchDetailed } from "../pages/landing/research-detail";
import { ArticlesManager } from "../pages/manager/articlesManager";
import { EquipmentslManager } from "../pages/manager/equipamentManager";
import { Login } from "../pages/manager/login";
import { Manager } from "../pages/manager/manager";
import ProfessionalManager from "../pages/manager/professionalsManager";
import { ResearchManager } from "../pages/manager/researchManager";

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
        <Box
          sx={{
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "60%",
              backgroundImage: `url(${PolimerImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2, // Define a transparência da imagem de fundo
              zIndex: -1,
            },
          }}
        >
          <Home />
        </Box>
      </LayoutContainer>
    ),
  },
  {
    path: "/research",
    type: "public",
    element: (
      <LayoutContainer>
        <Research />
      </LayoutContainer>
    ),
  },
  {
    path: "/professionals",
    type: "public",
    element: (
      <LayoutContainer>
        <Professionals />
      </LayoutContainer>
    ),
  },
  {
    path: "/articles",
    type: "public",
    element: (
      <LayoutContainer>
        <Articles />
      </LayoutContainer>
    ),
  },
  {
    path: "/articles/:id",
    type: "public",
    element: (
      <LayoutContainer>
        <ArticleDetailed />
      </LayoutContainer>
    ),
  },
  {
    path: "/about",
    type: "public",
    element: (
      <LayoutContainer>
        <AboutUs />
      </LayoutContainer>
    ),
  },
  {
    path: "/equipment",
    type: "public",
    element: (
      <LayoutContainer>
        <Equipment />
      </LayoutContainer>
    ),
  },
  {
    path: "/contact",
    type: "public",
    element: (
      <LayoutContainer>
        <Contact />
      </LayoutContainer>
    ),
  },
  {
    path: "/research/:id",
    type: "public",
    element: (
      <LayoutContainer>
        <ResearchDetailed />
      </LayoutContainer>
    ),
  },
  {
    path: "/manager",
    type: "private",
    element: (
      <ProtectedRoute>
        <LayoutContainerPrivate>
          <Manager />
        </LayoutContainerPrivate>
      </ProtectedRoute>
    ),
  },
  {
    path: "/manager/professionals",
    type: "private",
    element: (
      <ProtectedRoute>
        <LayoutContainerPrivate>
          <ProfessionalManager />
        </LayoutContainerPrivate>
      </ProtectedRoute>
    ),
  },
  {
    path: "/manager/equipments",
    type: "private",
    element: (
      <ProtectedRoute>
        <LayoutContainerPrivate>
          <EquipmentslManager />
        </LayoutContainerPrivate>
      </ProtectedRoute>
    ),
  },
  {
    path: "/manager/articles",
    type: "private",
    element: (
      <ProtectedRoute>
        <LayoutContainerPrivate>
          <ArticlesManager />
        </LayoutContainerPrivate>
      </ProtectedRoute>
    ),
  },
  {
    path: "/manager/researchs",
    type: "private",
    element: (
      <ProtectedRoute>
        <LayoutContainerPrivate>
          <ResearchManager />
        </LayoutContainerPrivate>
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    type: "auth",
    element: (
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    ),
  },
];
