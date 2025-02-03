import StyledContainer from "~/Components/UserProfilePage/Boxes/StyledContainer";
import {Box, Card, Divider, Toolbar, Typography} from "@mui/material";
import MissionResponse from "~/types/Response/MissionResponse";
interface MissionSummaryProps {
  mission?: MissionResponse;
}
const MissionSummary = ({ mission }: MissionSummaryProps) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <Typography variant="h6">Last Mission Summary</Typography>
      <Divider />
      <Typography variant="body1">
        {mission?.missionChores.map((chore, index) => (
          <>
            <Card key={index}>
              <Typography variant="h6">{chore.choreName}</Typography>
              <Typography
                variant="body2"
                color={chore.completed ? "success.main" : "error.main"}
              >
                {chore.completed ? "Completed" : "Not Completed"}
              </Typography>
              <Typography variant="body2">Points: {chore.points}</Typography>
            </Card>
            <Toolbar />
          </>
        ))}
      </Typography>
    </Card>
  );
};

export default MissionSummary;
