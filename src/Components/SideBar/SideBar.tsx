import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";
import LogoutButton from "~/Components/LoginPage/LogoutButton";
import { Dispatch, SetStateAction } from "react";
import UserData from "~/types/Response/UserData";

interface Props {
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const Sidebar = ({ setUserData }: Props) => {
  const menuItems = [
    { label: "UserProfile", route: "/UserProfile" },
    { label: "Chores", route: "/Chores" },
    { label: "Rewards", route: "/Rewards" },
    { label: "Mission", route: "/Mission" },
  ];
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.label}
          component={(props) => (
            <Link {...props} to={item.route!} component={RouterLink} />
          )}
        >
          <ListItemButton>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem>
        <LogoutButton setUserData={setUserData} />
      </ListItem>
    </List>
  );
};

export default Sidebar;
