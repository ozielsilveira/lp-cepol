import { ReactElement } from "react";
import { RouteObject } from "react-router-dom";
import { Home } from "../pages/home";
import { Research } from "../pages/research";
import { Professionals } from "../pages/professionals";
import { Articles } from "../pages/articles";
import { AboutUs } from "../pages/aboutUs";
import { Equipment } from "../pages/equipments";
import { Contact } from "../pages/contact";

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
];
