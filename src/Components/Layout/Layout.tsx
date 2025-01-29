import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";
import SideBar from "~/Components/SideBar/SideBar";
import { Outlet } from "react-router";

export function Layout() {
  const drawerWidth = 240;
  return (
    <Box sx={{ display: "flex" }}>
      {/* TOP BAR */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            Chore Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {/* PERMANENT DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
        anchor="left"
      >
        <Toolbar />
        <SideBar />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
