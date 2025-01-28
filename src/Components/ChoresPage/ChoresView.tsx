import { Box, Grid2 as Grid } from "@mui/material";
import ChoreCreate from "~/Components/ChoresPage/ChoreCreate";
import ChoreView from "~/Components/ChoresPage/ChoreView";
import ChoreResponse from "~/types/ChoreResponse";

interface ChoresProps {
  chores: ChoreResponse[];
}

export default function Chores({ chores }: ChoresProps) {
  return (
    <Grid container spacing={2}>
      {/* Chores List */}
      <Grid size={6}>
        <Box sx={{ p: 3, bgcolor: "#cfe8fc", borderRadius: 1, height: "100%" }}>
          <Box component="span" style={{ fontSize: "2em" }}>
            Chores List
          </Box>
          {chores?.map((chore) => (
            <ChoreView key={chore.title} chore={chore} />
          ))}
        </Box>
      </Grid>

      {/* Create Chore */}
      <Grid size={6}>
        <Box sx={{ p: 3, bgcolor: "#cfe8fc", borderRadius: 1, height: "100%" }}>
          <ChoreCreate />
        </Box>
      </Grid>
    </Grid>
  );
}
