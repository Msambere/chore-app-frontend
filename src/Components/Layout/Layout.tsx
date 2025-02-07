import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "~/Components/SideBar/SideBar";
import { Outlet } from "react-router";
import { Dispatch, SetStateAction, useState } from "react";
import UserData from "~/types/Response/UserData";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface Props {
  setUserData: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
  mode: "light" | "dark";
  toggleMode: () => void;
}

export function Layout({ setUserData, userData, mode, toggleMode }: Props) {
  const [open, setOpen] = useState(true);
  const drawerWidth = open ? 240 : 80;

  return (
    <Box sx={{ display: "flex" }}>
      {userData.username !== "" && (
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            transition: "width 0.3s ease",
            bgcolor: (theme) => theme.palette.background.default,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton onClick={() => setOpen(!open)}>
                <MenuIcon sx={{ color: "primary" }} />
              </IconButton>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  width={"55px"}
                  src={`logo.svg`}
                  loading="lazy"
                  alt={"CC"}
                />
              </Box>
            </Box>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textAlign: "center",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              ChoreChamp
            </Typography>

            <IconButton onClick={toggleMode} sx={{ mr: 2 }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      {userData.username !== "" && (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: drawerWidth,
            transition: "width 0.3s ease",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              transition: "width 0.3s ease",
            },
          }}
        >
          <Toolbar />
          <SideBar setUserData={setUserData} userData={userData} open={open} />
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, pb: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
