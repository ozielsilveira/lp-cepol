import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import { Home } from "../pages/landing/home";
import { Research } from "../pages/landing/research";
import { Professionals } from "../pages/landing/professionals";
import { Articles } from "../pages/landing/articles";
import { AboutUs } from "../pages/landing/aboutUs";
import { Equipment } from "../pages/landing/equipments";
import { Contact } from "../pages/landing/contact";

type CustomRouteObject = RouteObject & {
  path: string;
  element: ReactElement;
};

export const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/research",
    element: <Research />,
  },
  {
    path: "/professionals",
    element: <Professionals />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/equipment",
    element: <Equipment />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
