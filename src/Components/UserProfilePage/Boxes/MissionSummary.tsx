import { Card, Divider, Typography } from "@mui/material";
import MissionResponse from "~/types/Response/MissionResponse";
interface MissionSummaryProps {
  mission?: MissionResponse;
  missionsLength: number;
}
const MissionSummary = ({ mission, missionsLength }: MissionSummaryProps) => {
  if (!mission) {
    return <>no missions</>;
  }
  const completedChores = mission.missionChores.filter((m) => m.completed);
  const incompleteChores = mission.missionChores.filter((m) => !m.completed);
  let incompleteChoresPoints = 0;
  for (const chore of incompleteChores) {
    incompleteChoresPoints += chore.points;
  }
  let completedChoresPoints = 0;
  for (const chore of completedChores) {
    completedChoresPoints += chore.points;
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <Typography variant="h6">Last Mission Summary</Typography>
      <Divider />
      <Typography variant="body1">
        Mission Number:{missionsLength}
      </Typography>
      {mission.recurrence && (
        <>
          <Typography variant="body1">Category:{mission?.category}</Typography>
          <Typography variant="body1">
            Completed Chores: {completedChores.length} /{" "}
            {mission?.missionChores.length}
          </Typography>
          {mission.timeElapsed && (
            <Typography variant="body1">
              Time Elapsed:{mission.timeElapsed}
            </Typography>
          )}
          <Typography variant="body1">
            Total points Earned: {completedChoresPoints}
          </Typography>
          <Typography variant="body1">
            Total unredeemed Points: {incompleteChoresPoints}
          </Typography>
        </>
      )}
    </Card>
  );
};

export default MissionSummary;
