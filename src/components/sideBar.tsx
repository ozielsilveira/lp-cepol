import ArticleIcon from "@mui/icons-material/Article";
import BiotechIcon from "@mui/icons-material/Biotech";
import HomeIcon from "@mui/icons-material/Home";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainImg from "../../public/images/cepolSVG.svg";
interface Page {
  name: string;
  path: string;
  icon: JSX.Element;
}
const pages: Page[] = [
  {
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Artichles",
    path: "/manager/articles",
    icon: <ArticleIcon />,
  },
  {
    name: "Professionals",
    path: "/manager/professionals",
    icon: <PeopleIcon />,
  },
  {
    name: "Equipments",
    path: "/manager/equipments",
    icon: <HomeRepairServiceIcon />,
  },
  {
    name: "Researchs",
    path: "/manager/researchs",
    icon: <BiotechIcon />,
  },
];

export const SideBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const drawerContent = (
    <Box>
      <Box
        component={"img"}
        src={mainImg}
        sx={{ width: "140px", cursor: "pointer" }}
        onClick={() => {
          navigate("/manager");
          setOpen(false);
        }}
      ></Box>
      <List>
        {pages.map((page, index) => (
          <ListItemButton
            key={index}
            onClick={() => {
              navigate(page.path);
              setOpen(false);
            }}
          >
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Ícone de Menu no Mobile */}
      {!isDesktop && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Drawer no Mobile */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        {drawerContent}
      </Drawer>

      {/* Sidebar fixa no Desktop */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: 200,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>{drawerContent}</Box>
        </Drawer>
      )}
    </>
  );
};
