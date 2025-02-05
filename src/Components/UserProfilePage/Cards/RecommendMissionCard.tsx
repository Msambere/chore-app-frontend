import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Stack,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { extractUserCategories } from "~/Helper Functions/extractUserCategories";
import { extractUserRecurrences } from "~/Helper Functions/extractUserRecurrences";
import { MissionRequest } from "~/types/Request/MissionRequest";

export interface RecommendMissionProps {
  chores: ChoreResponse[];
  userId: number;
}

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default function RecommendMissionCard({
  chores,
}: RecommendMissionProps) {
  const [missionRequestData, setMissionRequestData] = useState<
    MissionRequest | undefined
  >();
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

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h5">Recommended Mission</Typography>
        <Divider sx={{ my: 1 }} />

        {missionRequestData ? (
          <Stack spacing={1}>
            <Typography variant="body1">
              Category:
              <Typography
                variant={"subtitle2"}
                component={"span"}
                sx={{ ml: 1 }}
              >
                {missionRequestData.category}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Recurrence:
              <Typography
                variant={"subtitle2"}
                component={"span"}
                sx={{ ml: 1 }}
              >
                {missionRequestData.recurrence}
              </Typography>
            </Typography>
            <Typography variant="body1">
              Time limit:
              <Typography
                variant={"subtitle2"}
                component={"span"}
                sx={{ ml: 1 }}
              >
                {missionRequestData.timeLimit} min
              </Typography>
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1, borderRadius: 2 }}
            >
              Check out Mission!
            </Button>
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No recommended mission
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
