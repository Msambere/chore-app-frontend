import { Box, Button, Grid2 as Grid } from "@mui/material";
import SingleChoreView from "~/Components/ChoresPage/SingleChoreView";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { Link as RouterLink } from "react-router";
import React from "react";

interface ChoresProps {
  chores: ChoreResponse[];
}

export default function Chores({ chores }: ChoresProps) {
  return (
    <Grid container spacing={2}>
      {/* Chores List */}
      <Grid size={12}>
        <Box sx={{ p: 3, bgcolor: "#cfe8fc", borderRadius: 1, height: "100%" }}>
          <Box component="span" style={{ fontSize: "2em" }}>
            Chores List
          </Box>
          {chores?.map((chore) => (
            <SingleChoreView key={chore.title} chore={chore} />
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
