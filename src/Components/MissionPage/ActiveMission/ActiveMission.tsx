import React, { useState, JSX, useEffect } from "react";
import { Grid2 as Grid } from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import TotalPointsEarned from "./TotalPointsEarned";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import TimeProgress from "~/Components/MissionPage/ActiveMission/TimeProgress";
import axios from "axios";
import MissionSummaryDialog from "./MissionSummaryDialog";
import FinishMissionButton from "./FinishMissionButton";
import RedeemRewardButton from "~/Components/MissionPage/ActiveMission/RedeemRewardBotton";

interface ActiveMissionProps {
  missionChores: MissionChoreResponse[];
}

const ActiveMission = ({ missionChores }: ActiveMissionProps): JSX.Element => {
  const [chores, setChores] = useState<MissionChoreResponse[]>(missionChores);
  const [pointTotal, setPointTotal] = useState(0);
  const [missionFinished, setMissionFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const maxPoints = missionChores.reduce((acc, chore) => acc + chore.points, 0);
  const [totalUnredeemedPoints, setTotalUnredeemedPoints] = useState(maxPoints);

  // Track elapsed time
  useEffect(() => {
    if (!missionFinished) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [missionFinished]);

  // Track if chores are completed
  useEffect(() => {
    if (chores.length > 0 && chores.every((chore) => chore.completed)) {
      handleFinishMission();
    }
  }, [chores]);

  // Handle chore completion
  const toggleChoreCompletion = (
    choreId: number,
    missionId: number,
    points: number,
    completed: boolean,
  ) => {
    setChores((prevChores) =>
      prevChores.map((chore) =>
        chore.choreId === choreId ? { ...chore, completed } : chore,
      ),
    );

    setPointTotal((prevPoints) =>
      completed ? prevPoints + points : Math.max(prevPoints - points, 0),
    );
  };

  // Handle Redeem Reward
  const handleRedeemReward = () => {
    setPointTotal((prevPoints) => Math.max(prevPoints - 1, 0));
    setTotalUnredeemedPoints((prevPoints) => Math.max(prevPoints - 1, 0));
  };

  // Handle mission completion
  const handleFinishMission = async () => {
    setMissionFinished(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/missions/{missionId}`,
        {
          timeElapsed,
          totalUnredeemedPoints,
        },
      );
    } catch (error) {
      console.error("Error updating mission data:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Left Panel - Chores List */}
        <Grid size={4}>
          <MissionChoresList
            chores={chores}
            onToggleChore={toggleChoreCompletion}
          />
        </Grid>

        {/* Middle Panel - Time & Progress */}
        <Grid size={4}>
          <TimeProgress
            chores={chores}
            missionFinished={missionFinished}
            onTimeRunOut={handleFinishMission}
          />
        </Grid>

        {/* Right Panel - Total Points Earned */}
        <Grid size={4}>
          <TotalPointsEarned pointTotal={pointTotal} maxPoints={maxPoints} />
          <RedeemRewardButton
            pointTotal={pointTotal}
            onRedeem={handleRedeemReward}
          />
          <FinishMissionButton onFinishMission={handleFinishMission} />
        </Grid>
      </Grid>

      {/* Mission Summary Dialog */}
      <MissionSummaryDialog
        open={missionFinished}
        onClose={() => setMissionFinished(false)}
        pointTotal={pointTotal}
        totalUnredeemedPoints={totalUnredeemedPoints}
        timeElapsed={timeElapsed}
        totalChoresCompleted={chores.filter((chore) => chore.completed).length}
        onRedeem={handleRedeemReward}
      />
    </>
  );
};

export default ActiveMission;