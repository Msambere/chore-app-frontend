import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  MenuItem,
} from "@mui/material";
import ChoreResponse from "~/types/Response/ChoreResponse";
import { updateEntityApiCall } from "~/HelperFunctions/ApiCalls";
import UserData from "~/types/Response/UserData";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import AutocompleteFormField from "~/Components/SharedComponents/AutocompleteFormField";

interface Props {
  chore: ChoreResponse;
  setUserData: Dispatch<SetStateAction<UserData>>;
  setEditing: Dispatch<SetStateAction<boolean>>;
  recurrenceList: string[];
  categoryList: string[];
}

function EditChoreForm({
  chore,
  setUserData,
  setEditing,
  recurrenceList,
  categoryList,
}: Props) {
  const defaultChoreRequestData: ChoreRequest = {
    title: chore.title,
    description: chore.description,
    recurrence: chore.recurrence,
    category: chore.category,
    duration: chore.duration,
    difficulty: chore.difficulty,
  };
  const [choreRequestData, setChoreRequestData] = useState<ChoreRequest>(
    defaultChoreRequestData,
  );
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");

  const convertDifficultyToString = (difficulty: number) => {
    if (difficulty === 1) return "Easy";
    if (difficulty === 2) return "Medium";
    if (difficulty === 3) return "Hard";
  };

  const handleInputChange = (
    fieldName: string,
    fieldValue: string | number,
  ): void => {
    if (fieldName === "difficulty") {
      if (fieldValue === "Easy") {
        fieldValue = 1;
      } else if (fieldValue === "Medium") {
        fieldValue = 2;
      } else if (fieldValue === "Hard") {
        fieldValue = 3;
      }
    }
    setChoreRequestData({ ...choreRequestData, [fieldName]: fieldValue });
  };

  const handleEditChore = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(choreRequestData);
    console.log(chore.choreId);
    updateEntityApiCall("chores", chore.choreId, choreRequestData)
      .then((updatedChore: ChoreResponse) => {
        console.log(updatedChore);
        // Delete old version of chore
        setUserData((prevState: UserData) => ({
          ...prevState,
          chores: prevState.chores.filter(
            (oldChore) => oldChore.choreId !== updatedChore.choreId,
          ),
        }));
        // Add updated chore
        setUserData((prevData: UserData) => ({
          ...prevData,
          chores: [...(prevData?.chores ?? []), updatedChore],
        }));
        setChoreRequestData(defaultChoreRequestData);
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
        Edit your Chore
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
        <form onSubmit={handleEditChore}>
          {/* TextField for Adding a Title */}
          <TextField
            fullWidth
            required
            name="title"
            label="Chore Title"
            margin="normal"
            variant="outlined"
            defaultValue={choreRequestData.title}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />

          {/* TextField for Adding a Description */}
          <TextField
            required
            fullWidth
            name="description"
            label="Chore Description"
            margin="normal"
            multiline
            rows={2}
            variant="outlined"
            defaultValue={choreRequestData.description}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />

          {/* Autocomplete input for  selecting Recurrence*/}
          <AutocompleteFormField
            options={recurrenceList}
            fieldLabel={"recurrence"}
            setChoreRequestData={setChoreRequestData}
            defaultValue={choreRequestData.recurrence}
          />

          <AutocompleteFormField
            options={categoryList}
            fieldLabel={"category"}
            setChoreRequestData={setChoreRequestData}
            defaultValue={choreRequestData.category}
          />

          <TextField
            required
            fullWidth
            select
            name="duration"
            label="Duration"
            margin="normal"
            defaultValue={choreRequestData.duration}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45].map((time, index) => (
              <MenuItem key={index} value={time}>
                {time} minutes
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            fullWidth
            select
            name="difficulty"
            label="Difficulty"
            margin="normal"
            defaultValue={convertDifficultyToString(
              choreRequestData.difficulty,
            )}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {["Easy", "Medium", "Hard"].map((difficulty, index) => (
              <MenuItem key={index} value={difficulty}>
                {difficulty}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setEditing(false)}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color={"primary"}>
              Save
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
export default EditChoreForm;
