import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  RadioButtonCheckedRounded,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import { formatTime } from "~/Helper Functions/FormatTime";

interface MissionChoresListProps {
  chores: MissionChoreResponse[];
  onToggleChore: (
    choreId: number,
    missionId: number,
    points: number,
    completed: boolean,
  ) => void;
  // Props we need for time & progress
  missionFinished: boolean;
  onTimeRunOut: () => void;
}

const MissionChoresList = ({
  chores,
  onToggleChore,
  missionFinished,
  onTimeRunOut,
}: MissionChoresListProps) => {
  // Time & Progress logic we previously had in TimeProgress:
  const totalDuration =
    chores.reduce((acc, chore) => acc + chore.duration, 0) * 60;
  const [remainingTime, setRemainingTime] = useState<number>(totalDuration);
  const [progress, setProgress] = useState<number>(0);

  // Timer effect
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
  }, [missionFinished, chores, remainingTime, onTimeRunOut]);

  // Progress effect
  useEffect(() => {
    if (!chores.length) {
      setProgress(0);
      return;
    }
    const completedCount = chores.filter((chore) => chore.completed).length;
    setProgress((completedCount / chores.length) * 100);
  }, [chores]);

  // Summaries for display
  const totalTimeInMinutes = chores.reduce(
    (sum, chore) => sum + chore.duration,
    0,
  );
  const completedChoresCount = chores.filter((c) => c.completed).length;

  return (
    <Box>
      {/* HEADER: Title, Time, Progress */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
            Chores
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            Total time: {totalTimeInMinutes}m
          </Typography>
        </Box>
        {/* Time & Progress in a small box on the right */}
        <Box sx={{ textAlign: "center" }}>
          {/* Remaining Time */}
          <Typography variant="body2" fontWeight="bold">
            Remaining Time
          </Typography>
          <Typography variant="h6">{formatTime(remainingTime)}</Typography>

          {/* Progress Circle */}
        </Box>
        <Box>
          {" "}
          <Box sx={{ display: "inline-flex", position: "relative" }}>
            <CircularProgress
              variant="determinate"
              value={progress}
              size={50}
              thickness={3}
              sx={{ color: progress === 100 ? "success.main" : "primary.main" }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {Math.round(progress)}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" display="block">
            {completedChoresCount}/{chores.length} done
          </Typography>
        </Box>
      </Box>

      {/* CHORES LIST */}
      <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {chores.length > 0 ? (
          chores.map((chore) => (
            <ListItem
              key={chore.choreId}
              disableGutters
              sx={{
                bgcolor: chore.completed ? "success.lighter" : "grey.100",
                borderRadius: 2,
                minHeight: 56,
                px: 2,
                boxShadow: 1,
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: 2,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src=""
                  sx={{
                    bgcolor: chore.completed
                      ? "success.light"
                      : "primary.light",
                    color: "#fff",
                  }}
                >
                  {chore.choreId}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "medium",
                      textDecoration: chore.completed ? "line-through" : "none",
                    }}
                  >
                    {chore.choreName}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {chore.points} pts
                  </Typography>
                }
              />

              {/* Right Section: Duration + Check Icon */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  {chore.duration}m
                </Typography>
                <IconButton
                  edge="end"
                  onClick={() =>
                    onToggleChore(
                      chore.choreId,
                      chore.missionId,
                      chore.points,
                      !chore.completed,
                    )
                  }
                >
                  {chore.completed ? (
                    <RadioButtonCheckedRounded sx={{ color: "green" }} />
                  ) : (
                    <RadioButtonUnchecked />
                  )}
                </IconButton>
              </Stack>
            </ListItem>
          ))
        ) : (
          <ListItem disableGutters>
            <Typography color="textSecondary">No chores available</Typography>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default MissionChoresList;
