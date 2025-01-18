import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundary from "../components/errorBoundary";
import { LayoutContainer } from "../components/layoutBox";
import { AboutUs } from "../pages/landing/aboutUs";
import { Articles } from "../pages/landing/articles";
import { Contact } from "../pages/landing/contact";
import { Equipment } from "../pages/landing/equipments";
import { Home } from "../pages/landing/home";
import { Professionals } from "../pages/landing/professionals";
import { Research } from "../pages/landing/research";
import { ResearchDetailed } from "../pages/landing/research-detail";
import { Login } from "../pages/manager/login";
import { Manager } from "../pages/manager/manager";

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
        <Home />
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
      <Manager />
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
