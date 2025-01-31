import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Button,
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import UserData from "~/types/Response/UserData";
import { extractUserRecurrences } from "~/Helper Functions/extractUserRecurrences";
import { extractUserCategories } from "~/Helper Functions/extractUserCategories";
import { MissionRequest } from "~/types/Request/MissionRequest";
import { createNewMissionApiCall } from "~/Helper Functions/ApiCalls";
import MissionResponse from "~/types/Response/MissionResponse";
import CloseIcon from "@mui/icons-material/Close";

interface MissionProps {
  setMissionChores: Dispatch<SetStateAction<MissionChoreResponse[]>>;
  setStartMission: Dispatch<SetStateAction<boolean>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const defaultMissionRequest: MissionRequest = {
  recurrence: null,
  category: null,
  timeLimit: null,
};

const MissionForm = ({
  setMissionChores,
  setStartMission,
  userData,
  setUserData,
}: MissionProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [recurrenceOptions, setRecurrenceOptions] = useState<string[]>();
  const [categoryOptions, setCategoryOptions] = useState<string[]>();
  const [missionRequestData, setMissionRequestData] = useState<MissionRequest>(
    defaultMissionRequest,
  );

  useEffect(() => {
    const recurrenceList: string[] = extractUserRecurrences(userData.chores);
    recurrenceList.push("Any");
    setRecurrenceOptions(recurrenceList);
    const categoryList: string[] = extractUserCategories(userData.chores);
    categoryList.push("Any");
    setCategoryOptions(categoryList);
  }, []);

  const handleInputChange = (
    fieldName: string,
    fieldValue: string | number | null,
  ): void => {
    if (fieldValue === "Any" || fieldValue === "Unlimited") {
      fieldValue = null;
    }
    setMissionRequestData({ ...missionRequestData, [fieldName]: fieldValue });
  };

  const handleStartMission = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNewMissionApiCall(userData.userId, missionRequestData)
      .then((response: MissionResponse) => {
        setMissionChores(response.missionChores);
        console.log(response);
        console.log(response.missionChores.length);
        setUserData({
          ...userData,
          missions: [...userData.missions, response],
        });
        setStartMission(true);
        setMissionRequestData(defaultMissionRequest);
      })

      .catch((error) => {
        console.log(error.response.data.message);
        setOpen(true);
      })
      .finally(() => {
        console.log("Always print");
      });
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Mission
        </Typography>
        <form onSubmit={handleStartMission}>
          <TextField
            fullWidth
            select
            name="recurrence"
            label="Recurrence"
            margin="normal"
            defaultValue="Any"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {recurrenceOptions?.map((recurrence, index) => (
              <MenuItem key={index} value={recurrence}>
                {recurrence}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            name="category"
            label="Category"
            margin="normal"
            defaultValue="Any"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {categoryOptions?.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            name="timeLimit"
            label="Time Limit"
            margin="normal"
            defaultValue="Unlimited"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {["Unlimited", 5, 10, 15, 20, 25, 30, 35, 40, 45].map(
              (time, index) => (
                <MenuItem key={index} value={time}>
                  {time}
                </MenuItem>
              ),
            )}
          </TextField>

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
              No matching chores found. Change your recurrence/category/time
              limit and try again.
            </Alert>
          </Collapse>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Start Mission!
          </Button>
        </form>

        {/* If you want a "Back" button */}
        <Button
          variant="text"
          color="secondary"
          onClick={() => window.history.back()}
          sx={{ marginTop: 2 }}
        >
          Back
        </Button>
      </Box>
    </>
  );
};

export default MissionForm;
