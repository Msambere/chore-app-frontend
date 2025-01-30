import { styled } from "@mui/system";
import { Paper } from "@mui/material";

export const StyledContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  margin: "auto",
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));
export default StyledContainer;
