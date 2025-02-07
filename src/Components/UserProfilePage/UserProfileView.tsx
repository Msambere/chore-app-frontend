import { Box, Grid2 } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";

import UserData from "~/types/Response/UserData";
import { computePointStats } from "./computePointStats";
import ChoresForTodayCard from "~/Components/UserProfilePage/Cards/ChoresForTodayCard";
import MissionsOverviewCard from "~/Components/UserProfilePage/Cards/MissionsOverviewCard";
import PointsSummaryCard from "~/Components/UserProfilePage/Cards/PointSummaryCard";
import CalendarAndBadgesCard from "~/Components/UserProfilePage/Cards/CalendarAndBadgesCard";
import RecommendMissionCard from "~/Components/UserProfilePage/Cards/RecommendMissionCard";
import MissionSummaryCard from "~/Components/UserProfilePage/Cards/MissionSummaryCard";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

interface UserProfileViewProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  setStartMission: Dispatch<SetStateAction<boolean>>;
  setMissionChores: Dispatch<SetStateAction<MissionChoreResponse[]>>;
}

export default function UserProfileView({
  userData,
  setUserData,
  setStartMission,
  setMissionChores,
}: UserProfileViewProps) {
  const { currentPointBalance, averagePointsPerMission, totalPointsEarned } =
    computePointStats(userData);

  const recentMissions = userData.missions
    .sort((a, b) => b.missionId - a.missionId)
    .slice(0, 3);
  const recentTasks = userData.chores
    .sort((a, b) => b.choreId - a.choreId)
    .slice(0, 2);
  const lastMission = recentMissions[0];

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

  useEffect(() => {
    console.log("UserData updated in UserProfileView:", userData);
  }, [userData]);

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid2 container spacing={2}>
        {/* Left Column: Tasks & Recommendation */}
        <Grid2 size={4} spacing={2} container direction="column">
          <Grid2>
            <ChoresForTodayCard chores={recentTasks} />
          </Grid2>
          <Grid2>
            <RecommendMissionCard
              chores={userData.chores}
              userId={userData.userId}
              setMissionChores={setMissionChores}
              setStartMission={setStartMission}
              userData={userData}
              setUserData={setUserData}
            />
          </Grid2>
        </Grid2>
        <Grid2 size={4} container direction="column">
          <Grid2>
            <MissionsOverviewCard
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
          <CalendarAndBadgesCard
            missions={userData.missions.sort(
              (a, b) => b.missionId - a.missionId,
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          {userData.missions.length > 0 && (
            <MissionSummaryCard
              missionsLength={recentMissions.length}
              mission={lastMission}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
