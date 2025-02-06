import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import React, { Dispatch, SetStateAction } from "react";
import RewardResponse from "~/types/Response/RewardResponse";

interface Props {
  reward: RewardResponse;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}

const SingleRewardDetails = ({ reward, setEditing, handleDelete }: Props) => {
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
        <Button onClick={() => setEditing(true)}>Edit </Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonGroup>
    </>
  );
};

export default SingleRewardDetails;
