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
import ConfirmationDeleteDialog from "~/Components/SharedComponents/ConfirmationDeleteDialog";

interface Props {
  chore: ChoreResponse;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}

const SingleChoreDetails = ({ chore, setEditing, handleDelete }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Button
          onClick={() => setEditing(true)}
          sx={{ flex: 1, fontWeight: "bold" }}
        >
          Edit
        </Button>
        <Button
          color="error"
          onClick={handleOpen}
          sx={{ flex: 1, fontWeight: "bold" }}
        >
          Delete
        </Button>
      </ButtonGroup>
      <ConfirmationDeleteDialog
        open={open}
        onClose={handleClose}
        onConfirm={() => {
          handleDelete().then(() => handleClose());
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this chore? This action cannot be undone."
      />
    </>
  );
};

export default SingleChoreDetails;
