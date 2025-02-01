import React, { useState, JSX, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import MissionChoresList from "./MissionChoresList";
import TotalPointsEarned from "./TotalPointsEarned";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import TimeProgress from "~/Components/MissionPage/ActiveMission/TimeProgress";
import axios from "axios";
import { useNavigate } from "react-router";

interface ActiveMissionProps {
  missionChores: MissionChoreResponse[];
}

const ActiveMission = ({ missionChores }: ActiveMissionProps): JSX.Element => {
  const [chores, setChores] = useState<MissionChoreResponse[]>(missionChores);
  const [pointTotal, setPointTotal] = useState(0);
  const [missionFinished, setMissionFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const maxPoints = missionChores.reduce((acc, chore) => acc + chore.points, 0);
  const navigate = useNavigate();

  // track elapsed time
  useEffect(() => {
    if (!missionFinished) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [missionFinished]);

  //track if chores completed
  useEffect(() => {
    if (chores.length > 0 && chores.every((chore) => chore.completed)) {
      handleFinishMission()
        .then(() => {
          console.log("Mission finished successfully!");
        })
        .catch((error) => {
          console.error("Error finishing mission:", error);
        });
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

    axios
      .patch(`${import.meta.env.VITE_APP_BACKEND_URL}/missionchores`, null, {
        params: { missionId, choreId },
      })
      .then((response) => {
        console.log(`Chore ${choreId} status updated.`);
        console.log("Backend Response:", response.data);
      })
      .catch((err) => console.error("Error updating chore completion:", err));
  };

  const handleRedeemReward = () => {
    setPointTotal((prevPoints) => Math.max(prevPoints - 2, 0)); // Prevent negative points
  };

  //handle mission is finished
  const handleFinishMission = async () => {
    setMissionFinished(true);

    try {
      await axios.patch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/missions/{missionId}`,
        {
          timeElapsed,
          totalUnredeemedPoints: pointTotal,
        },
      );
      console.log("Mission data updated successfully!");
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
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRedeemReward}
            disabled={pointTotal < 2}
          >
            Redeem Reward
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleFinishMission}
          >
            Finish Mission
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={missionFinished}
        onClose={() => setMissionFinished(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Mission Summary</DialogTitle>
        <DialogContent>
          <Typography>
            Total Chores Completed:{" "}
            {chores.filter((chore) => chore.completed).length}
          </Typography>
          <Typography>Total Points Earned: {pointTotal}</Typography>
          <Typography>
            Time Elapsed: {Math.floor(timeElapsed / 60)} mins {timeElapsed % 60}{" "}
            secs
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => setMissionFinished(false)}
            color="primary"
          >
            Redeem Reward
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/")}
            color="secondary"
          >
            User Profile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActiveMission;
