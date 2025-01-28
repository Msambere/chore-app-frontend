import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import Link from "@mui/material/Link";

const Sidebar = () => {
  const menuItems = [
    { label: "Chores", route: "/chores" },
    { label: "Login", route: "/login" },
    { label: "UserProfile", route: "/UserProfile" },
    { label: "Rewards", route: "/Rewards" },
    { label: "Mission", route: "/Mission" },
  ];
  return (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.label}
          component={(props) => <Link {...props} to={item.route!} />}
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
