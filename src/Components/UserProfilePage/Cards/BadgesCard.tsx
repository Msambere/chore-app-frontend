import { Box, Divider, Tooltip, Typography } from "@mui/material";
import {
  MilitaryTech,
  EmojiEvents,
  WorkspacePremium,
  Star,
} from "@mui/icons-material";

// New BadgesCard Component
const BadgesCard = () => {
  return (
    <Box sx={{ textAlign: "center", p: 1 }}>
      <Typography variant="subtitle1">Achievements</Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Tooltip title="Elite Achiever">
          <MilitaryTech sx={{ fontSize: 40, color: "gold" }} />
        </Tooltip>

        <Tooltip title="Task Master">
          <EmojiEvents sx={{ fontSize: 40, color: "blue" }} />
        </Tooltip>

        <Tooltip title="Top Contributor">
          <WorkspacePremium sx={{ fontSize: 40, color: "green" }} />
        </Tooltip>

        <Tooltip title="5-Star Performer">
          <Star sx={{ fontSize: 40, color: "orange" }} />
        </Tooltip>
      </Box>
    </Box>
  );
};
export default BadgesCard;
