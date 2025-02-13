import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Stack,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { extractUserCategories } from "~/HelperFunctions/extractUserCategories";
import { extractUserRecurrences } from "~/HelperFunctions/extractUserRecurrences";
import { MissionRequest } from "~/types/Request/MissionRequest";
import UserData from "~/types/Response/UserData";
import { createNewMissionApiCall } from "~/HelperFunctions/ApiCalls";
import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import { useNavigate } from "react-router";

export interface RecommendMissionProps {
  chores: ChoreResponse[];
  userId: number;
  setMissionChores: Dispatch<SetStateAction<MissionChoreResponse[]>>;
  setStartMission: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

//check if any chore match category and recurrence
// const checkForMatchingChores = (
//   chores: ChoreResponse[],
//   recurrence: string,
//   category: string,
// ): boolean => {
//   if (!chores?.length) return false;
//
//   return chores.some(
//     (chore) => chore.recurrence === recurrence && chore.category === category,
//   );
// };

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export default function RecommendMissionCard({
  chores,
  setMissionChores,
  setStartMission,
  userData,
}: RecommendMissionProps) {
  const navigate = useNavigate();
  const [missionRequestData, setMissionRequestData] = useState<
    MissionRequest | undefined
  >();
  const timeLimitOptions: (number | "Let's do them all!")[] = [
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    "Let's do them all!",
  ];
  useEffect(() => {
    if (!chores?.length) return;

    // const extractedCategories = extractUserCategories(chores);
    // const extractedRecurrence = extractUserRecurrences(chores);

    // const validCombinations = extractedRecurrence.flatMap((recurrence) =>
    //   extractedCategories
    //     .filter((category) =>
    //       checkForMatchingChores(chores, recurrence, category),
    //     )
    //     .map((category) => ({ recurrence, category })),
    // );
    const validCombinations: { recurrence: string; category: string }[] = [];

    chores.forEach((chore) => {
      validCombinations.push({
        recurrence: chore.recurrence,
        category: chore.category,
      });
    });

    // if (validCombinations.length) {
    //   const randomCombination =
    //     validCombinations[getRandomNumber(0, validCombinations.length)];
    //   const randomTimeLimit =
    //     timeLimitOptions[getRandomNumber(0, timeLimitOptions.length)];
    //
    //   const newMission = {
    //     recurrence: randomCombination.recurrence,
    //     category: randomCombination.category,
    //     timeLimit:
    //       randomTimeLimit === "Let's do them all!" ? null : randomTimeLimit,
    //   };
    //   setMissionRequestData(newMission);
    //   console.log(" New Recommended Mission:", newMission);
    // }
    if (validCombinations.length > 0) {
      const randomCombination =
        validCombinations[getRandomNumber(0, validCombinations.length)];
      const randomTimeLimit =
        timeLimitOptions[getRandomNumber(0, timeLimitOptions.length)];

      const newMission = {
        recurrence: randomCombination.recurrence,
        category: randomCombination.category,
        timeLimit:
          randomTimeLimit === "Let's do them all!" ? null : randomTimeLimit,
      };
      setMissionRequestData(newMission);
      console.log(" New Recommended Mission:", newMission);
    } else {
      console.log("No valid mission combinations found.");
    }
  }, [chores]);

  if (!chores?.length) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h5">Recommended Mission</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No recommended mission
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const handleCheckOutMission = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!missionRequestData) return;

    createNewMissionApiCall(userData.userId, missionRequestData)
      .then((response) => {
        setMissionChores(response.missionChores);
        setStartMission(true);
        console.log("Mission Created:", response);
        navigate("/Mission");
      })
      .catch((error) => {
        console.error("Error creating mission:", error.response.data.message);
      });
  };

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
                {missionRequestData.timeLimit === null
                  ? "Let's do them all!"
                  : `${missionRequestData.timeLimit} min`}
              </Typography>
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1, borderRadius: 2 }}
              onClick={handleCheckOutMission}
            >
              Check out Mission
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
