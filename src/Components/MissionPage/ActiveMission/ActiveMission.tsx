import React, {
  useState,
  JSX,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Box, Paper, Grid2 as Grid } from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import TotalPointsEarned from "./TotalPointsEarned";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import MissionSummaryDialog from "../ActiveMissionDialog/MissionSummaryDialog";
import FinishMissionButton from "./FinishMissionButton";
import RedeemRewardButton from "~/Components/MissionPage/ActiveMission/RedeemRewardButton";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import MissionResponse from "~/types/Response/MissionResponse";
import {
  updateChoreCompletionApiCall,
  updateMissionApiCall,
} from "~/Helper Functions/ApiCalls";

interface ActiveMissionProps {
  missionChores: MissionChoreResponse[];
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const ActiveMission = ({
  missionChores,
  userData,
  setUserData,
}: ActiveMissionProps): JSX.Element => {
  const [chores, setChores] = useState<MissionChoreResponse[]>(missionChores);
  const [pointTotal, setPointTotal] = useState(0);
  const [missionFinished, setMissionFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const maxPoints = missionChores.reduce((acc, chore) => acc + chore.points, 0);
  const [totalUnredeemedPoints, setTotalUnredeemedPoints] = useState(maxPoints);
  const [missionData, setMissionData] = useState<MissionResponse | null>(null);

  const navigate = useNavigate();

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
      setMissionFinished(true);
      handleFinishMission()
        .then(() => console.log("Mission finished successfully!"))
        .catch((error) => console.error("Error finishing mission:", error));
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
    updateChoreCompletionApiCall(missionId, choreId)
      .then((response) => {
        console.log(`Chore ${choreId} status updated successfully!`, response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  // Handle mission completion
  const handleFinishMission = async () => {
    if (!missionChores || missionChores.length === 0) {
      console.error("Mission Chores list is empty!");
      return;
    }
    const missionId = missionChores[0].missionId;
    if (!missionId) {
      console.error("Mission ID is undefined!");
      return;
    }
    setTotalUnredeemedPoints((prevPoints) => {
      const updatedPoints = prevPoints;

      updateMissionApiCall(missionId, totalUnredeemedPoints, timeElapsed)
        .then((updatedMissionApiCall) => {
          setMissionData(updatedMissionApiCall);
          console.log("Mission updated successfully:", updatedMissionApiCall);
          setMissionFinished(true);
        })
        .catch((error) => {
          console.error(error.message);
        });
      return updatedPoints;
    });
  };

  // Handle Redeem Reward
  const handleRedeemReward = (rewardId: number) => {
    console.log(`Redeeming reward with ID: ${rewardId}`);

    // Update points after redeeming
    const selectedReward = userData.rewards.find(
      (reward: { rewardId: number }) => reward.rewardId === rewardId,
    );
    if (!selectedReward) return;

    setPointTotal((prevPoints) =>
      Math.max(prevPoints - selectedReward.pointsNeeded, 0),
    );
    setTotalUnredeemedPoints((prevPoints) =>
      Math.max(prevPoints - selectedReward.pointsNeeded, 0),
    );

    // Update userData to mark reward as redeemed
    setUserData((prevUserData) => ({
      ...prevUserData,
      rewards: prevUserData.rewards.map((reward) =>
        reward.rewardId === rewardId ? { ...reward, inMission: true } : reward,
      ),
    }));
  };

  // Handle Finalize Mission when clicking User Profile
  const handleFinalizeMission = () => {
    if (!missionData) {
      console.error("Mission data is missing!");
      return;
    }
    setUserData((prevData: UserData) => ({
      ...prevData,
      missions: [...prevData.missions, missionData],
    }));
    console.log("User data updated successfully!", missionData);
    navigate("/UserProfile");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Grid container spacing={3}>
        {/* Left Panel - Chores List */}
        <Grid size={8}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            <MissionChoresList
              chores={chores}
              onToggleChore={toggleChoreCompletion}
              missionFinished={missionFinished}
              onTimeRunOut={handleFinishMission}
            />
          </Paper>
        </Grid>

        {/* Points & Rewards Panel */}
        <Grid size={4}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              transition: "transform 0.3s ease",
              display: "flex",
              flexDirection: "column",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            <TotalPointsEarned
              pointTotal={pointTotal}
              maxPoints={maxPoints}
              rewards={userData.rewards}
            />
            <RedeemRewardButton
              pointTotal={pointTotal}
              rewards={userData.rewards}
              onRedeem={handleRedeemReward}
            />
            <FinishMissionButton onFinishMission={handleFinishMission} />
          </Paper>
        </Grid>
      </Grid>

      {/* Mission Summary Dialog */}
      <MissionSummaryDialog
        open={missionFinished}
        onClose={() => setMissionFinished(false)}
        pointTotal={pointTotal}
        timeElapsed={timeElapsed}
        totalChoresCompleted={chores.filter((chore) => chore.completed).length}
        handleFinalizeMission={handleFinalizeMission}
      />
    </Box>
  );
};

export default ActiveMission;
