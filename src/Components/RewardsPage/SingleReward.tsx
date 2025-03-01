import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Rating,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserData from "~/types/Response/UserData";
import RewardResponse from "~/types/Response/RewardResponse";
import { deleteEntityApiCall } from "~/HelperFunctions/ApiCalls";
import EditRewardForm from "./EditRewardForm";
import SingleRewardDetails from "./SingleRewardDetails";
import ConfirmationDeleteDialog from "~/Components/SharedComponents/ConfirmationDeleteDialog";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

interface RewardProps {
  reward: RewardResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function SingleReward({ reward, setUserData }: RewardProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const handleDeleteConfirm = async () => {
    try {
      await deleteEntityApiCall("rewards", reward.rewardId);
      setUserData((prev) => ({
        ...prev,
        rewards: prev.rewards.filter((old) => old !== reward),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
          boxShadow: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          {isEditing ? (
            <EditRewardForm
              reward={reward}
              setUserData={setUserData}
              setEditing={setEditing}
            />
          ) : (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
                  {reward.name}
                </Typography>
                <Rating
                  size="small"
                  name="points Needed"
                  value={reward.pointsNeeded}
                  max={5}
                  readOnly
                  icon={<MonetizationOnIcon fontSize="inherit" />}
                  emptyIcon={
                    <MonetizationOnIcon
                      fontSize="inherit"
                      sx={{ opacity: 0.25 }}
                    />
                  }
                />
              </Box>
              <SingleRewardDetails reward={reward} />
            </Box>
          )}
        </CardContent>

        {!isEditing && (
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <IconButton color="primary" onClick={() => setEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>

      <ConfirmationDeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          handleDeleteConfirm();
          setOpenDeleteDialog(false);
        }}
        title="Confirm Delete"
        message="Are you sure you want to delete this reward? This action cannot be undone."
      />
    </>
  );
}
