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

interface Props {
  setUserData: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
}

export function Layout({ setUserData, userData }: Props) {
  const [open, setOpen] = useState(true);
  const drawerWidth = open ? 240 : 80;

  return (
    <Box sx={{ display: "flex" }}>
      {/* TOP BAR */}
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
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "#f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  CC
                </Typography>
              </Box>
            </Box>

            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textAlign: "center",
                fontWeight: "bold",
                color: "#1e293b",
              }}
            >
              ChoreChamp
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      {/* DRAWER */}
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
          <SideBar setUserData={setUserData} userData={userData} />
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, pb: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
