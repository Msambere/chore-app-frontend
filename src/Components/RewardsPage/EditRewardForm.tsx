import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateEntityApiCall } from "~/HelperFunctions/ApiCalls";
import UserData from "~/types/Response/UserData";
import RewardResponse from "~/types/Response/RewardResponse";

interface Props {
  reward: RewardResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

const defaultRewardRequestData = (reward: RewardResponse): RewardRequest => ({
  name: reward.name,
  description: reward.description,
  inMission: reward.inMission,
  pointsNeeded: reward.pointsNeeded,
});

export default function EditRewardForm({
  reward,
  setUserData,
  setEditing,
}: Props) {
  const [rewardRequestData, setRewardRequestData] = useState<RewardRequest>(
    defaultRewardRequestData(reward),
  );
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (
    fieldName: string,
    value: string | number | boolean,
  ) => {
    if (value === "true") value = true;
    if (value === "false") value = false;
    setRewardRequestData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleEditReward = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const updatedReward = await updateEntityApiCall(
        "rewards",
        reward.rewardId,
        rewardRequestData,
      );
      // Remove old version, add updated
      setUserData((prev) => ({
        ...prev,
        rewards: prev.rewards
          .filter((r) => r.rewardId !== updatedReward.rewardId)
          .concat(updatedReward),
      }));
      setEditing(false);
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      console.error(axiosError?.response?.data?.message);
      setErrorMsg(
        axiosError?.response?.data?.message || "Failed to edit reward",
      );
      setOpenAlert(true);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Edit Reward
      </Typography>

      <Collapse in={openAlert}>
        <Alert
          variant="outlined"
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
                setErrorMsg("");
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Warning</AlertTitle>
          {errorMsg}
        </Alert>
      </Collapse>

      <Container maxWidth="sm" disableGutters>
        <form onSubmit={handleEditReward}>
          <TextField
            fullWidth
            required
            name="name"
            label="Reward Name"
            margin="normal"
            variant="outlined"
            value={rewardRequestData.name}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />

          <TextField
            fullWidth
            required
            name="description"
            label="Reward Description"
            margin="normal"
            multiline
            rows={2}
            variant="outlined"
            value={rewardRequestData.description || ""}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />

          <TextField
            fullWidth
            required
            select
            name="pointsNeeded"
            label="Points Needed"
            margin="normal"
            value={rewardRequestData.pointsNeeded}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          >
            {[2, 3, 4, 5].map((points) => (
              <MenuItem key={points} value={points}>
                {points}
              </MenuItem>
            ))}
          </TextField>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Reward Type</InputLabel>
            <Select
              name="inMission"
              label="Reward Type"
              value={rewardRequestData.inMission}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              <MenuItem value={"true"}>In Mission</MenuItem>
              <MenuItem value={"false"}>Out of Mission</MenuItem>
            </Select>
            <FormHelperText>When can you access this reward?</FormHelperText>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setEditing(false)}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
