import { Box, Button, Grid2 as Grid } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import React, { useEffect } from "react";
import SingleChore from "~/Components/ChoresPage/SingleChore";
import UserData from "~/types/Response/UserData";

interface ChoresProps {
  userData: UserData;
}

export default function Chores({ userData }: ChoresProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.username === "") {
      navigate("/");
    }
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Chores List */}
      <Grid size={12}>
        <Box sx={{ p: 3, bgcolor: "#cfe8fc", borderRadius: 1, height: "100%" }}>
          <Box component="span" style={{ fontSize: "2em" }}>
            Chores List
          </Box>
          {userData.chores.map((chore) => (
            <SingleChore key={chore.title} chore={chore} />
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
