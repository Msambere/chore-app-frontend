import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import RewardResponse from "~/types/Response/RewardResponse";
import ConfirmationDialog from "~/Components/SharedComponents/ConfirmationDeleteDialog";

interface Props {
  reward: RewardResponse;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}

const SingleRewardDetails = ({ reward, setEditing, handleDelete }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/*Description*/}
      <List>
        <ListItem>
          <ListItemText
            primary={`Description`}
            secondary={reward?.description}
          />
        </ListItem>
      </List>

      {/*In Mission*/}
      <List>
        <ListItem>
          <ListItemText
            primary={`In Mission`}
            secondary={reward?.inMission.toString()}
          />
        </ListItem>
      </List>

      {/*category*/}
      <List>
        <ListItem>
          <ListItemText
            primary={`Points Needed`}
            secondary={reward?.pointsNeeded}
          />
        </ListItem>
      </List>

      {/*/!*Difficulty*!/*/}
      {/*<List>*/}
      {/*  <ListItem>*/}
      {/*    <ListItemText*/}
      {/*      primary={`Points Needed`}*/}
      {/*      secondary={*/}
      {/*        <Rating*/}
      {/*          name="hover-feedback"*/}
      {/*          value={reward?.pointsNeeded}*/}
      {/*          precision={0.5}*/}
      {/*          readOnly*/}
      {/*          emptyIcon={*/}
      {/*            <Star style={{ opacity: 0.55 }} fontSize="inherit" />*/}
      {/*          }*/}
      {/*        />*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </ListItem>*/}
      {/*</List>*/}
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
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onConfirm={() => {
          handleDelete().then(() => handleClose());
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this reward? This action cannot be undone."
      />
    </>
  );
};

export default SingleRewardDetails;
