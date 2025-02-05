import { Box, Grid2 } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";

import UserData from "~/types/Response/UserData";
import { computePointStats } from "./computePointStats";
import TasksForTodayCard from "~/Components/UserProfilePage/Cards/TasksForTodayCard";
import TaskOverviewCard from "~/Components/UserProfilePage/Cards/TaskOverviewCard";
import PointsSummaryCard from "~/Components/UserProfilePage/Cards/PointSummaryCard";
import CalendarAndBadgesCard from "~/Components/UserProfilePage/Cards/CalendarAndBadgesCard";
import RecommendMissionCard from "~/Components/UserProfilePage/Cards/RecommendMissionCard";
import MissionSummaryCard from "~/Components/UserProfilePage/Cards/MissionSummaryCard";

interface UserProfileViewProps {
  userData: UserData;
}

export default function UserProfileView({ userData }: UserProfileViewProps) {
  const { currentPointBalance, averagePointsPerMission, totalPointsEarned } =
    computePointStats(userData);

  const recentMissions = userData.missions.slice(0, 3);
  const recentTasks = userData.chores.slice(0, 2);

  const totalTasks = userData.chores.length;
  const completedTasks = userData.chores.filter((chore) =>
    userData.missions.some((mission) =>
      mission.missionChores.some(
        (mc) => mc.choreId === chore.choreId && mc.completed,
      ),
    ),
  ).length;
  const taskCompletionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid2 container spacing={2}>
        {/* Left Column: Tasks & Recommendation */}
        <Grid2 size={4} spacing={2} container direction="column">
          <Grid2>
            <TasksForTodayCard tasks={recentTasks} />
          </Grid2>
          <Grid2>
            <RecommendMissionCard
              chores={userData.chores}
              userId={userData.userId}
            />
          </Grid2>
        </Grid2>
        <Grid2 size={4} container direction="column">
          <Grid2>
            <TaskOverviewCard
              completionRate={taskCompletionRate}
              recentMissions={recentMissions}
            />
          </Grid2>
          <Grid2>
            <PointsSummaryCard
              currentPointBalance={currentPointBalance}
              averagePointsPerMission={averagePointsPerMission}
              totalPointsEarned={totalPointsEarned}
            />
          </Grid2>
        </Grid2>
        <Grid2 size={4}>
          <CalendarAndBadgesCard missions={userData.missions} />
        </Grid2>
        <Grid2 size={12}>
          {userData.missions.length > 0 && (
            <MissionSummaryCard
              missionsLength={userData.missions.length}
              mission={userData.missions[0]}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
