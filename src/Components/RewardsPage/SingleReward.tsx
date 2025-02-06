import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserData from "~/types/Response/UserData";
import RewardResponse from "~/types/Response/RewardResponse";
import { deleteEntityApiCall } from "~/Helper Functions/ApiCalls";
import SingleRewardDetails from "~/Components/RewardsPage/SingleRewardDetails";
import EditRewardForm from "~/Components/RewardsPage/EditRewardForm";

interface RewardProps {
  reward: RewardResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function SingleReward({ reward, setUserData }: RewardProps) {
  const [isEditing, setEditing] = useState<boolean>(false);

  const handleDelete = async () => {
    deleteEntityApiCall("rewards", reward.rewardId)
      .then(() => {
        setUserData((prevState: UserData) => ({
          ...prevState,
          rewards: prevState.rewards.filter(
            (oldReward) => oldReward !== reward,
          ),
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
              <Typography component="section">{reward.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {isEditing ? (
                <EditRewardForm
                  reward={reward}
                  setUserData={setUserData}
                  setEditing={setEditing}
                />
              ) : (
                <SingleRewardDetails
                  reward={reward}
                  setEditing={setEditing}
                  handleDelete={handleDelete}
                />
              )}
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>
    </>
  );
}
