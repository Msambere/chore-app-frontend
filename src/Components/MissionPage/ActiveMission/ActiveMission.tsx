import React, {
  useState,
  JSX,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Grid2 as Grid } from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import TotalPointsEarned from "./TotalPointsEarned";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import TimeProgress from "~/Components/MissionPage/ActiveMission/TimeProgress";
import axios from "axios";
import MissionSummaryDialog from "./MissionSummaryDialog";
import FinishMissionButton from "./FinishMissionButton";
import RedeemRewardButton from "~/Components/MissionPage/ActiveMission/RedeemRewardBotton";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import MissionResponse from "~/types/Response/MissionResponse";
import {updateChoreCompletionApiCall, updateMissionApiCall} from "~/Helper Functions/ApiCalls";

interface ActiveMissionProps {
  missionChores: MissionChoreResponse[];
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  // setUserData: (
  //   userData: (prevData: UserData) => {
  //     userId: number;
  //     firstName: string;
  //     lastName: string;
  //     email: string;
  //     username: string;
  //     chores: ChoreResponse[];
  //     missions: MissionResponse[];
  //     rewards: RewardResponse[];
  //     message: string | null;
  //   },
  // ) => void;
}

const ActiveMission = ({
  missionChores,
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

  // Handle Redeem Reward
  const handleRedeemReward = () => {
    setPointTotal((prevPoints) => Math.max(prevPoints - 1, 0));
    setTotalUnredeemedPoints((prevPoints) => Math.max(prevPoints - 1, 0));
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
    updateMissionApiCall(missionId, totalUnredeemedPoints, timeElapsed)
      .then((updatedMissionApiCall) => {
        setMissionData(updatedMissionApiCall);
        console.log("Mission updated successfully:", updatedMissionApiCall);
        setMissionFinished(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
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
        timeElapsed={timeElapsed}
        totalChoresCompleted={chores.filter((chore) => chore.completed).length}
        handleFinalizeMission={handleFinalizeMission}
      />
    </>
  );
};
export default ActiveMission;
