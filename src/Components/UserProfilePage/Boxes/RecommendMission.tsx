import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { extractUserCategories } from "~/Helper Functions/extractUserCategories";
import { extractUserRecurrences } from "~/Helper Functions/extractUserRecurrences";
// import { createNewMissionApiCall } from "~/Helper Functions/ApiCalls";
import { MissionRequest } from "~/types/Request/MissionRequest";
// import MissionChoreResponse from "~/types/Response/MissionChoreResponse";

export interface RecommendMissionProps {
  chores: ChoreResponse[];
  userId: number;
}

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default function RecommendMission({ chores }: RecommendMissionProps) {
  const [missionRequestData, setMissionRequestData] = useState<
    MissionRequest | undefined
  >();
  const [error] = useState<string | null>(null);
  useEffect(() => {
    if (!chores?.length) return;

    const extractedCategories = extractUserCategories(chores);
    const extractedRecurrence = extractUserRecurrences(chores);

    const randomCategory = getRandomNumber(0, extractedCategories.length);
    const randomRecurrence = getRandomNumber(0, extractedRecurrence.length);
    const randomTimeLimit = getRandomNumber(10, 45);

    setMissionRequestData({
      recurrence: extractedRecurrence[randomRecurrence],
      category: extractedCategories[randomCategory],
      timeLimit: randomTimeLimit,
    });
  }, [chores]);

  if (!chores?.length) return null;

  // const handleStartMission = async (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   setError(null);
  //
  //   if (!missionRequestData) return;
  //
  //   try {
  //     const response = await createNewMissionApiCall(
  //       userId,
  //       missionRequestData,
  //     );
  //     setStartMission(true);
  //     setMissionChores(response.missionChores);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to create mission");
  //   }
  // };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Typography sx={{ mt: 2 }} variant="h6" component="div">
        Recommend Mission
      </Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {missionRequestData && (
          <>
            <Typography variant="body1">
              Category: {missionRequestData.category}
            </Typography>
            <Typography variant="body1">
              Recurrence: {missionRequestData.recurrence}
            </Typography>
            <Typography variant="body1">
              Time limit: {missionRequestData.timeLimit}
            </Typography>
          </>
        )}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button variant="contained">Check out Mission!</Button>
      </Stack>
    </Box>
  );
}
