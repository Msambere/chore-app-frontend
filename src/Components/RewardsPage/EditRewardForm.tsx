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
} from "@mui/material";
import { updateEntityApiCall } from "~/Helper Functions/ApiCalls";
import UserData from "~/types/Response/UserData";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import RewardResponse from "~/types/Response/RewardResponse";

interface Props {
  reward: RewardResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

function EditRewardForm({ reward, setUserData, setEditing }: Props) {
  const defaultRewardRequestData: RewardRequest = {
    name: reward.name,
    description: reward.description,
    inMission: reward.inMission,
    pointsNeeded: reward.pointsNeeded,
  };
  const [rewardRequestData, setRewardRequestData] = useState<RewardRequest>(
    defaultRewardRequestData,
  );
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const handleInputChange = (
    fieldName: string,
    fieldValue: string | number | boolean,
  ): void => {
    if (fieldValue === "true") {
      fieldValue = true;
    }
    if (fieldValue === "false") {
      fieldValue = false;
    }
    console.log(fieldName, fieldValue);
    setRewardRequestData({ ...rewardRequestData, [fieldName]: fieldValue });
  };

  const handleEditReward = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(rewardRequestData);
    console.log(reward.rewardId);
    updateEntityApiCall("rewards", reward.rewardId, rewardRequestData)
      .then((updatedReward: RewardResponse) => {
        console.log(updatedReward);
        // Delete old version of reward
        setUserData((prevState: UserData) => ({
          ...prevState,
          rewards: prevState.rewards.filter(
            (oldReward) => oldReward.rewardId !== updatedReward.rewardId,
          ),
        }));
        // Add updated reward
        setUserData((prevData: UserData) => ({
          ...prevData,
          rewards: [...(prevData?.rewards ?? []), updatedReward],
        }));
        setRewardRequestData(defaultRewardRequestData);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMsg(error.response.data.message);
        setOpenAlert(true);
      })
      .finally(() => {
        console.log("Update Entity finished");
      });
  };
  return (
    <Box sx={{ mb: 2 }}>
      <Box component="span" style={{ fontSize: "1.5em" }}>
        Edit your Reward
      </Box>
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
      <Container maxWidth="sm">
        <form onSubmit={handleEditReward}>
          {/* TextField for editing name */}
          <TextField
            fullWidth
            required
            name="name"
            label="Reward Name"
            margin="normal"
            variant="outlined"
            defaultValue={rewardRequestData.name}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />

          {/* TextField for editing description */}
          <TextField
            required
            fullWidth
            name="description"
            label="Reward Description"
            margin="normal"
            multiline
            rows={2}
            variant="outlined"
            defaultValue={rewardRequestData.description}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />

          {/* TextField for points needed*/}
          <TextField
            required
            fullWidth
            select
            name="pointsNeeded"
            label="Points Needed"
            margin="normal"
            defaultValue={rewardRequestData.pointsNeeded}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {[2, 3, 4, 5].map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>

          {/* Select for in mission*/}

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Reward Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              defaultValue={rewardRequestData.inMission}
              value={rewardRequestData.inMission}
              label="Reward Type"
              name="inMission"
              onChange={(event) =>
                handleInputChange(event.target.name, event.target.value)
              }
            >
              <MenuItem value={"true"}>In Mission</MenuItem>
              <MenuItem value={"false"}>Out of Mission</MenuItem>
            </Select>
            <FormHelperText>When can you access this reward?</FormHelperText>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Aligns items to the right
              mt: 2, // Optional: Add some margin-top
            }}
          >
            <Button type="submit" variant="outlined">
              Edit reward!
            </Button>
            <Button variant="outlined" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
export default EditRewardForm;
