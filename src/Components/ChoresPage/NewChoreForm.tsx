import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  IconButton,
  MenuItem,
} from "@mui/material";
import ChoreResponse from "~/types/Response/ChoreResponse";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import { extractUserRecurrences } from "~/HelperFunctions/extractUserRecurrences";
import { extractUserCategories } from "~/HelperFunctions/extractUserCategories";
import { createNewChoreApiCall } from "~/HelperFunctions/ApiCalls";
import CloseIcon from "@mui/icons-material/Close";
import AutocompleteFormField from "~/Components/SharedComponents/AutocompleteFormField";

interface Props {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const defaultRequestData: ChoreRequest = {
  title: "",
  description: "",
  recurrence: "",
  category: "",
  duration: 5,
  difficulty: 1,
};

export default function NewChoreForm({ userData, setUserData }: Props) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");
  const recurrenceList: string[] = extractUserRecurrences(
    userData?.chores ?? [],
  );
  const categoryList: string[] = extractUserCategories(userData?.chores ?? []);
  const [choreRequestData, setChoreRequestData] =
    useState<ChoreRequest>(defaultRequestData);

  const handleCancel = () => {
    navigate("/Chores");
  };

  useEffect(() => {
    if (userData.username === "Not logged in") {
      navigate("/");
    }
  }, [userData]);

  const handleInputChange = (
    fieldName: string,
    fieldValue: string | number,
  ): void => {
    console.log(fieldName, fieldValue);
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

  const handleCreateChore = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNewChoreApiCall(userData.userId, choreRequestData)
      .then((response: ChoreResponse) => {
        console.log(response);
        setUserData((prevData: UserData) => ({
          ...prevData,
          chores: [...(prevData?.chores ?? []), response],
        }));
        setChoreRequestData(defaultRequestData);
        navigate("/Chores");
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMsg(error.response.data.message);
        setOpenAlert(true);
      })
      .finally(() => {
        console.log("End of handleCreateChore");
      });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box component="span" style={{ fontSize: "2em" }}>
        Create a Chore
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
        <form onSubmit={handleCreateChore}>
          {/* TextField for Adding a Title */}
          <TextField
            fullWidth
            required
            name="title"
            label="Chore Title"
            margin="normal"
            variant="outlined"
            value={choreRequestData.title}
            placeholder="Give your chore a title"
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
            defaultValue={defaultRequestData.description}
            placeholder="Tell us more about the chore"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />

          {/* Autocomplete input for  selecting Recurrence*/}
          <AutocompleteFormField
            defaultValue={defaultRequestData.recurrence}
            options={recurrenceList}
            fieldLabel={"recurrence"}
            setChoreRequestData={setChoreRequestData}
          />

          <AutocompleteFormField
            defaultValue={defaultRequestData.category}
            options={categoryList}
            fieldLabel={"category"}
            setChoreRequestData={setChoreRequestData}
          />

          {/* TextField for Chore duration */}
          <TextField
            required
            fullWidth
            select
            name="duration"
            label="Duration"
            margin="normal"
            value={choreRequestData.duration}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {[5, 10, 15, 20, 25, 30, 35, 40, 45].map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>

          {/* TextField forSelect a set difficulty level */}
          <TextField
            required
            fullWidth
            select
            name="difficulty"
            label="Difficulty"
            margin="normal"
            defaultValue={"Easy"}
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end", // Aligns items to the right
              mt: 2, // Optional: Add some margin-top
            }}
          >
            <Button type="submit" variant="outlined">
              Create a new chore!
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
}
