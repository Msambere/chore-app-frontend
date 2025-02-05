import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import ChoreResponse from "~/types/Response/ChoreResponse";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  chore: ChoreResponse;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}

const SingleChoreDetails = ({ chore, setEditing, handleDelete }: Props) => {
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
      <ButtonGroup>
        <Button onClick={() => setEditing(true)}>Edit </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonGroup>
    </>
  );
};

export default SingleChoreDetails;
