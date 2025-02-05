import { List, ListItem, ListItemText, Rating } from "@mui/material";
import { Star } from "@mui/icons-material";
import React from "react";
import ChoreResponse from "~/types/Response/ChoreResponse";

interface Props {
  chore: ChoreResponse;
}

const SingleChoreDetails = ({ chore }: Props) => {
  return (
    <>
      {/*Description*/}
      <List>
        <ListItem>
          <ListItemText
            primary={`Description`}
            secondary={chore?.description}
          />
        </ListItem>
      </List>

      {/*Recurrence*/}
      <List>
        <ListItem>
          <ListItemText primary={`Recurrence`} secondary={chore?.recurrence} />
        </ListItem>
      </List>

      {/*category*/}
      <List>
        <ListItem>
          <ListItemText primary={`Category`} secondary={chore?.category} />
        </ListItem>
      </List>

      {/*duration*/}
      <List>
        <ListItem>
          <ListItemText primary={`Duration`} secondary={chore?.duration} />
        </ListItem>
      </List>

      {/*Difficulty*/}
      <List>
        <ListItem>
          <ListItemText
            primary={`Difficulty`}
            secondary={
              <Rating
                name="hover-feedback"
                value={chore?.difficulty}
                precision={0.5}
                readOnly
                emptyIcon={
                  <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            }
          />
        </ListItem>
      </List>
    </>
  );
};

export default SingleChoreDetails;
