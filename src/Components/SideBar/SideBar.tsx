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
import LinkIcon from "@mui/icons-material/Link";
import {
  Home,
  ListAlt,
  CardGiftcard,
  Assignment,
  Feedback,
} from "@mui/icons-material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link as RouterLink, useLocation } from "react-router";
import LogoutButton from "~/Components/LoginPage/LogoutButton";
import { Dispatch, SetStateAction } from "react";
import UserData from "~/types/Response/UserData";

interface Props {
  setUserData: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
  open: boolean;
}

const menuItems = [
  { label: "User Profile", route: "/UserProfile", icon: <Home /> },
  { label: "Chores", route: "/Chores", icon: <ListAlt /> },
  { label: "Rewards", route: "/Rewards", icon: <CardGiftcard /> },
  { label: "Mission", route: "/Mission", icon: <Assignment /> },
  {
    label: "New User Demo",
    route: "https://youtu.be/CAMR34YwlpQ?si=57d68XBRTBAgFv3k",
    icon: <YouTubeIcon />,
    external: true,
  },
  {
    label: "Feedback",
    route:
      "https://docs.google.com/forms/d/e/1FAIpQLSebTFAS0f_fT2Y2dXl7iElsLb29HiG7_HR_6IituZWc0ltuKQ/viewform",
    icon: <Feedback />,
    external: true,
  },
];

const Sidebar = ({ setUserData, userData, open }: Props) => {
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
        <Box sx={{ textAlign: "center", pb: 2 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              mx: open ? "auto" : "10px",
              bgcolor: "primary.main",
              transition: "width 0.3s ease",
            }}
            src={`https://avatar.iran.liara.run/public/girl?username=${userData?.username}`}
          >
            {open && userData?.firstName[0] + userData?.lastName[0]}
          </Avatar>
          {open && (
            <Typography variant="h6" sx={{ mt: 1 }}>
              {userData?.firstName} {userData?.lastName}
            </Typography>
          )}
        </Box>

        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.route}
                sx={{
                  width: open ? "200px" : "50px",
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  backgroundColor:
                    item.route === location.pathname
                      ? "background.default"
                      : "background.paper",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
                {item.external && (
                  <LinkIcon
                    sx={{
                      ml: 1,
                      color: "text.primary",
                      fontSize: "1.2rem",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mt: "auto" }}>
          <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 2, mx: 1 }}>
              <ListItemIcon>
                <LogoutButton setUserData={setUserData} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>
    )
  );
};

export default Sidebar;
