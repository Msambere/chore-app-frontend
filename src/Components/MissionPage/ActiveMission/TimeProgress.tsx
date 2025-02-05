import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import { formatTime } from "~/Helper Functions/FormatTime";

interface TimeProgressProps {
  chores: MissionChoreResponse[];
  onTimeRunOut: () => void;
  missionFinished?: boolean;
}

const TimeProgress = ({
  chores,
  missionFinished,
  onTimeRunOut,
}: TimeProgressProps) => {
  const totalDuration =
    chores.reduce((acc, chore) => acc + chore.duration, 0) * 60;
  const [remainingTime, setRemainingTime] = useState<number>(totalDuration);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (missionFinished) return;

    if (remainingTime > 0 && chores.some((chore) => !chore.completed)) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeRunOut();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [missionFinished, chores]);

  useEffect(() => {
    const completedCount = chores.filter((chore) => chore.completed).length;
    setProgress((completedCount / chores.length) * 100);
  }, [chores]);

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#e0e0e0",
        borderRadius: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, alignSelf: "flex-start" }}
      >
        Time & Progress:
      </Typography>

      {/* Remaining Time Section */}
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Remaining Time:
        </Typography>
        <Typography variant="h4" color="black">
          {formatTime(remainingTime)}
        </Typography>
      </Box>

      {/* Progress Bar Section */}
      <Box
        sx={{
          border: "1px solid black",
          borderRadius: 2,
          padding: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Progress
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 1,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            size={80}
            thickness={5}
            sx={{ color: progress === 100 ? "green" : "primary.main" }}
          />
          <Typography
            variant="caption"
            component="div"
            sx={{ position: "absolute" }}
          >
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TimeProgress;
