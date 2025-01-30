import MissionChoreResponse from "~/types/Response/MissionChoreResponse";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Typography, MenuItem, Button } from "@mui/material";
import {Form, useSubmit} from "react-router";
import TextField from "@mui/material/TextField";
import UserData from "~/types/Response/UserData";
import { extractUserRecurrences } from "~/Helper Functions/extractUserRecurrences";
import { extractUserCategories } from "~/Helper Functions/extractUserCategories";
import { MissionRequest } from "~/types/Request/MissionRequest";
import { createNewMissionApiCall} from "~/Helper Functions/ApiCalls";
import MissionResponse from "~/types/Response/MissionResponse";
import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';


interface MissionProps {
  setMissionChores: Dispatch<SetStateAction<MissionChoreResponse[]>>;
  setStartMission: Dispatch<SetStateAction<boolean>>;
  userData: UserData;
}
const defaultMissionRequest: MissionRequest = { recurrence: null,
  category: null,
  timeLimit: null,
};

const MissionFormv2 = (props: MissionProps) => {
  const [recurrenceOptions, setRecurrenceOptions] = useState<string[]>();
  const [categoryOptions, setCategoryOptions] = useState<string[]>();
  const [missionRequestData, setMissionRequestData] = useState<MissionRequest>(defaultMissionRequest);
  useEffect(() => {
    setRecurrenceOptions(extractUserRecurrences(props.userData.chores));
    setCategoryOptions(extractUserCategories(props.userData.chores));
  }, []);

  const handleInputChange = (
    fieldName: string,
    fieldValue: string | number,
  ): void => {
    setMissionRequestData({ ...missionRequestData, [fieldName]: fieldValue });
  };

  const handleStartMission = (event) => {
    event.preventDefault();
    console.log("MissionRequest being sent");
    console.log(props.userData.userId);
    createNewMissionApiCall(props.userData.userId, missionRequestData).then(
      (response: MissionResponse) => {
        props.setMissionChores(response.missionChores);
        props.setStartMission(true);
        console.log("request sent");
      }
    ).finally(()=>{
        console.log("Always print");
        setMissionRequestData(defaultMissionRequest); // Doesn't seem to be resetting immediately
      });
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create Mission version 2
        </Typography>
        {/*<Form method="post" onSubmit={(event) => handleStartMission(event)}>*/}
        <form onSubmit={handleStartMission}>
          <TextField
            fullWidth
            // select
            name="recurrence"
            label="Recurrence"
            margin="normal"
            defaultValue={missionRequestData.recurrence || null}
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
            name="category"
            label="Category"
            margin="normal"
            placeholder="Optional"
            defaultValue={missionRequestData.category || null}
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
            name="timeLimit"
            label="Time Limit (minutes)"
            type="number"
            margin="normal"
            defaultValue=""
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            // onClick={(event) => handleStartMission(event)}
          >
            {/*{isSubmitting ? "Creating..." : "Create Mission"}*/}
            Start Mission!
          </Button>
        {/*</Form>*/}
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

export default MissionFormv2;
