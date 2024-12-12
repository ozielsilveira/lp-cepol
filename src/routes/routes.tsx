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

type CustomRouteObject = RouteObject & {
  path: string;
  type: "public" | "private" | "auth";
  element: ReactElement;
};

export const routes: CustomRouteObject[] = [
  {
    path: "/",
    type: "public",
    element:
      <div>
        <Header />
        <Home />
        <Footer />
      </div>,
  },
  {
    path: "/research",
    type: "public",
    element:
      <div>
        <Header />
        <Research />
        <Footer />
      </div>,
  },
  {
    path: "/professionals",
    type: "public",
    element:
      <div>
        <Header />
        <Professionals />
        <Footer />
      </div>,
  },
  {
    path: "/articles",
    type: "public",
    element:
      <div>
        <Header />
        <Articles />
        <Footer />
      </div>,
  },
  {
    path: "/about",
    type: "public",
    element:
      <div>
        <Header />
        <AboutUs />
        <Footer />
      </div>,
  },
  {
    path: "/equipment",
    type: "public",
    element:
      <div>
        <Header />
        <Equipment />
        <Footer />
      </div>,
  },
  {
    path: "/contact",
    type: "public",
    element:
      <div>
        <Header />
        <Contact />
        <Footer />
      </div>,
  },
  {
    path: "/manager",
    type: "private",
    element: <ProtectedRoute><Manager /></ProtectedRoute>,
  },
  {
    path: "/auth",
    type: "auth",
    element: <Login />,
  },
];
