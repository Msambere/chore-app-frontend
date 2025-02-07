import React from "react";
import { List, ListItem, Typography } from "@mui/material";
import ChoreResponse from "~/types/Response/ChoreResponse";

interface Props {
  chore: ChoreResponse;
}

const SingleChoreDetails = ({ chore }: Props) => {
  return (
    <List disablePadding>
      {chore.description && (
        <ListItem disablePadding sx={{ pb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {chore.description}
          </Typography>
        </ListItem>
      )}

      <ListItem disablePadding sx={{ pb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          Recurrence: {chore.recurrence} &nbsp;|&nbsp; Category:{" "}
          {chore.category}
        </Typography>
      </ListItem>

      <ListItem disablePadding>
        <Typography variant="body2" color="text.secondary">
          Duration: {chore.duration} min
        </Typography>
      </ListItem>
    </List>
  );
};

export default SingleChoreDetails;
