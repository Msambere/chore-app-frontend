import React, { Dispatch, SetStateAction } from "react";
import { Box, Typography, Grid2 as Grid } from "@mui/material";
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
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: 10,
          backdropFilter: "blur(10px)",
          mx: "auto",
          mt: 3,
          mb: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
          Chores List
        </Typography>
        {chores.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            Uh oh, no chores yet. Tap the “+” button to add one!
          </Typography>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Keep track of your chores!
          </Typography>
        )}
      </Box>

      {/* Grid of Chores */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Grid container spacing={3}>
          {chores.map((chore) => (
            <Grid key={chore.choreId} size={4}>
              <SingleChore
                chore={chore}
                setUserData={setUserData}
                recurrenceList={recurrenceList}
                categoryList={categoryList}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
