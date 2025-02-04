import React, {Dispatch, SetStateAction} from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Star } from "@mui/icons-material";
import UserData from "~/types/Response/UserData";
import RewardResponse from "~/types/Response/RewardResponse";
import {deleteEntityApiCall} from "~/Helper Functions/ApiCalls";

interface RewardProps {
  reward: RewardResponse;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function SingleReward({ reward, setUserData, userData }: RewardProps) {
  const handleDelete = async () => {
    deleteEntityApiCall("rewards", reward.rewardId)
      .then(() => {
        setUserData((prevState: UserData) => ({
          ...prevState,
          rewards: prevState.rewards.filter((oldReward) => oldReward !== reward),
        }));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Box sx={{ mb: 1 }}>
        <Container maxWidth="sm">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="section">{reward?.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                    secondary={reward?.inMission}
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

              {/*Difficulty*/}
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Points Needed`}
                    secondary={
                      <Rating
                        name="hover-feedback"
                        value={reward?.pointsNeeded}
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
            </AccordionDetails>
            <AccordionActions>
              <ButtonGroup>
                <Button>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </ButtonGroup>
            </AccordionActions>
          </Accordion>
        </Container>
      </Box>
    </>
  );
}
