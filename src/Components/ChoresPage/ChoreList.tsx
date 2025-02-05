import { Box, Button, Grid2 as Grid } from "@mui/material";
import { Link as RouterLink } from "react-router";
import React, {Dispatch, SetStateAction, useState} from "react";
import SingleChore from "~/Components/ChoresPage/SingleChore";
import UserData from "~/types/Response/UserData";
import {extractUserRecurrences} from "~/Helper Functions/extractUserRecurrences";
import {extractUserCategories} from "~/Helper Functions/extractUserCategories";

interface ChoresProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function ChoreList({ userData, setUserData }: ChoresProps) {
  const recurrenceList: string[] = extractUserRecurrences(
    userData?.chores ?? [],
  );
  const categoryList: string[] = extractUserCategories(userData?.chores ?? []);

  return (
    <Grid container spacing={2}>
      {/* Chores List */}
      <Grid size={12}>
        <Box sx={{ p: 3, bgcolor: "#cfe8fc", borderRadius: 1, height: "100%" }}>
          <Box component="span" style={{ fontSize: "2em" }}>
            Chores List
          </Box>
          {userData.chores.map((chore) => (
            <SingleChore
              key={chore.choreId}
              chore={chore}
              setUserData={setUserData}
              recurrenceList={recurrenceList}
              categoryList={categoryList}
            />
          ))}
          <Button
            variant="outlined"
            to={"/Chores/create"}
            component={RouterLink}
          >
            Add New Chore
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
