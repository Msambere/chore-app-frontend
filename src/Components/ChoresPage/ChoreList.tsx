import { Box, Button, Grid2 as Grid } from "@mui/material";
import { Link as RouterLink } from "react-router";
import React, { Dispatch, SetStateAction } from "react";
import SingleChore from "~/Components/ChoresPage/SingleChore";
import UserData from "~/types/Response/UserData";
import ChoreResponse from "~/types/Response/ChoreResponse";

interface ChoresProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  recurrenceList: string[];
  categoryList: string[];
  chores: ChoreResponse[];
}

export default function ChoreList({
  setUserData,
  recurrenceList,
  categoryList,
  chores,
}: ChoresProps) {
  return (
    <Grid container spacing={2}>
      {/* Chores List */}
      <Grid size={12}>
        <Box sx={{ p: 3, bgcolor: "#cfe8fc", borderRadius: 1, height: "100%" }}>
          <Box component="span" style={{ fontSize: "2em" }}>
            Chores List
          </Box>
          {chores.map((chore) => (
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
