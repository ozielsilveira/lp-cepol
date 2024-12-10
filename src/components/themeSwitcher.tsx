import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../themes/ThemeProvider";

const ThemeSwitcher: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Tooltip title="Toggle Theme">
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher;
