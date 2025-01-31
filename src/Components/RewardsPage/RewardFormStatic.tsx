import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { createNewRewardApiCall } from "~/Helper Functions/ApiCalls";
import RewardResponse from "~/types/Response/RewardResponse";

interface RewardProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const defaultRequestData: RewardRequest = {
  name: "",
  description: "",
  inMission: false,
  pointsNeeded: 2,
};

export default function RewardFormStatic({
  userData,
  setUserData,
}: RewardProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [rewardRequestData, setRewardRequestData] =
    useState<RewardRequest>(defaultRequestData);

  useEffect(() => {
    if (!userData) {
      navigate("/Login");
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
        setUserData((prevData) => ({
          ...prevData,
          rewards: [...prevData.rewards, response],
        }));
        setRewardRequestData(defaultRequestData);
        navigate("/Rewards");
      })
      .catch((error) => {
        console.log(error);
        setOpen(true);
      })
      .finally(() => {
        console.log("Always print");
      });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box component="span" style={{ fontSize: "2em" }}>
        Create a Reward
      </Box>
      <Collapse in={open}>
        <Alert
          variant="outlined"
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Warning</AlertTitle>
          Invalid inputs.
        </Alert>
      </Collapse>
      <Container maxWidth="sm">
        <form onSubmit={handleCreateReward}>
          {/* TextField for Adding a NAME */}
          <TextField
            fullWidth
            required
            name="name"
            label="Reward Name"
            margin="normal"
            variant="outlined"
            placeholder="Give your rward a name"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />

          {/* TextField for Adding a Description */}
          <TextField
            fullWidth
            name="description"
            label="Reward Description"
            margin="normal"
            multiline
            rows={2}
            variant="outlined"
            placeholder="Tell us more about the reward"
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
              value={rewardRequestData.inMission}
              label="Reward Type"
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
              Create a new reward!
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
