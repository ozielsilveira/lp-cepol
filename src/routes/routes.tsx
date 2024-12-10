import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import { AboutUs } from "../pages/aboutUs";
import { Articles } from "../pages/articles";
import { Contact } from "../pages/contact";
import { Equipment } from "../pages/equipments";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Professionals } from "../pages/professionals";
import { Research } from "../pages/research";

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
