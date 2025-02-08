import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Collapse,
  Alert,
  AlertTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createNewRewardApiCall } from "~/HelperFunctions/ApiCalls";
import RewardResponse from "~/types/Response/RewardResponse";
import UserData from "~/types/Response/UserData";

interface Props {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const defaultRequestData: RewardRequest = {
  name: "",
  description: null,
  inMission: false,
  pointsNeeded: 2,
};

export default function NewRewardForm({ userData, setUserData }: Props) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rewardRequestData, setRewardRequestData] =
    useState<RewardRequest>(defaultRequestData);

  const handleCancel = () => {
    navigate("/Rewards");
  };

  useEffect(() => {
    if (userData.username === "Not logged in") {
      navigate("/");
    }
  }, [userData]);

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

  const handleCreateReward = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNewRewardApiCall(userData.userId, rewardRequestData)
      .then((response: RewardResponse) => {
        console.log(response);
        setUserData((prevData: UserData) => ({
          ...prevData,
          rewards: [...(prevData?.rewards ?? []), response],
        }));
        setRewardRequestData(defaultRequestData);
        navigate("/Rewards");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMsg(error.response.data.message);
        setOpenAlert(true);
      })
      .finally(() => {
        console.log("End of handleCreateReward");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Box
        sx={{
          p: 4,
          mt: 3,
          mb: 3,
          mx: "auto",
          maxWidth: 600,
          backdropFilter: "blur(8px)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Create a Reward
        </Typography>

        <Collapse in={openAlert} sx={{ mb: 2 }}>
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
          <form onSubmit={handleCreateReward}>
            <TextField
              required
              fullWidth
              name="name"
              label="Reward Name"
              margin="normal"
              variant="outlined"
              value={rewardRequestData.name}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            <TextField
              fullWidth
              name="description"
              label="Reward Description"
              margin="normal"
              multiline
              rows={2}
              variant="outlined"
              placeholder="Tell us more about the reward"
              value={rewardRequestData.description ?? ""}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            <TextField
              required
              fullWidth
              select
              name="pointsNeeded"
              label="Points Needed"
              value={rewardRequestData.pointsNeeded}
              margin="normal"
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
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              >
                <MenuItem value={"true"}>In Mission</MenuItem>
                <MenuItem value={"false"}>Out of Mission</MenuItem>
              </Select>
              <FormHelperText>When can you access this reward?</FormHelperText>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                Create Reward
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
}
