import UserData from "~/types/Response/UserData";
import { Typography } from "@mui/material";
import React from "react";

interface PointsSummaryProps {
  user?: UserData;
}

function computePointStats(user: UserData) {
  let currentPointBalance = 0;
  let totalPointsEarned = 0;
  const missionCount = user.missions.length;

  for (const mission of user.missions) {
    currentPointBalance += mission.totalUnredeemedPoints;
    for (const chore of mission.missionChores) {
      if (chore.completed) {
        totalPointsEarned += chore.points;
      }
    }
  }

  const averagePointsPerMission =
    missionCount > 0 ? totalPointsEarned / missionCount : 0;

  return {
    currentPointBalance,
    averagePointsPerMission,
    totalPointsEarned,
  };
}

const PointsSummary: React.FC<PointsSummaryProps> = ({ user }) => {
  if (!user) {
    return <></>;
  }
  const { currentPointBalance, averagePointsPerMission, totalPointsEarned } =
    computePointStats(user);

  return (
    <>
      <Typography variant="body1">
        <strong>Current Point Balance:</strong> {currentPointBalance}
      </Typography>
      <Typography variant="body1">
        <strong>Average Points Earned per Mission:</strong>{" "}
        {averagePointsPerMission.toFixed(1)}
      </Typography>
      <Typography variant="body1">
        <strong>Total Points Earned:</strong> {totalPointsEarned}
      </Typography>
    </>
  );
};
export default PointsSummary;
