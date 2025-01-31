import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router";

const Sidebar = () => {
  const menuItems = [
    { label: "UserProfile", route: "/" },
    { label: "Chores", route: "/chores" },
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
    </List>
  );
};

export default Sidebar;
