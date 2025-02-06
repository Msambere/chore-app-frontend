import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import {
  Home,
  ListAlt,
  CardGiftcard,
  Assignment,
  ExitToApp,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router";
import LogoutButton from "~/Components/LoginPage/LogoutButton";
import { Dispatch, SetStateAction } from "react";
import UserData from "~/types/Response/UserData";

interface Props {
  setUserData: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
}

const menuItems = [
  { label: "User Profile", route: "/UserProfile", icon: <Home /> },
  { label: "Chores", route: "/Chores", icon: <ListAlt /> },
  { label: "Rewards", route: "/Rewards", icon: <CardGiftcard /> },
  { label: "Mission", route: "/Mission", icon: <Assignment /> },
];

const Sidebar = ({ setUserData, userData }: Props) => {
  const location = useLocation();
  return (
    userData.username !== "" && (
      <Box
        sx={{
          width: 240,
          height: "100vh",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Profile Section */}
        <Box sx={{ textAlign: "center", p: 3 }}>
          <Avatar
            sx={{ width: 64, height: 64, mx: "auto", bgcolor: "primary.main" }}
            src={`https://avatar.iran.liara.run/public/girl?username=${userData?.username}`}
          >
            {userData?.firstName[0] + userData?.lastName[0]}
          </Avatar>
          <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
            {userData?.firstName} {userData?.lastName}
          </Typography>
        </Box>

        <Divider />

        {/* Navigation */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.route}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor:
                    item.route === location.pathname ? "#3b82f6" : "white",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        {/* Logout Button */}
        {
          <Box sx={{ mt: "auto", p: 2 }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ borderRadius: 2, mx: 1 }}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <LogoutButton setUserData={setUserData} />
              </ListItemButton>
            </ListItem>
          </Box>
        }
      </Box>
    )
  );
};

export default Sidebar;
