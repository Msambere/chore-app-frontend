import { styled } from "@mui/system";
import { Avatar } from "@mui/material";

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 96,
  height: 96,
  border: `2px solid ${theme.palette.grey[200]}`,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export default StyledAvatar;
