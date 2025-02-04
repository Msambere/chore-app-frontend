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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserData from "~/types/Response/UserData";
import { useNavigate } from "react-router";
import { extractUserRecurrences } from "~/Helper Functions/extractUserRecurrences";
import { extractUserCategories } from "~/Helper Functions/extractUserCategories";
import { createNewChoreApiCall } from "~/Helper Functions/ApiCalls";
import CloseIcon from "@mui/icons-material/Close";
import AutocompleteFormField from "~/Components/SharedComponents/AutocompleteFormField";

interface ChoreCreateComponentProps {
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}

const defaultRequestData: ChoreRequest = {
  title: "",
  description: "",
  recurrence: "",
  category: "",
  duration: 0,
  difficulty: 0,
};

export default function ChoreForm({
  userData,
  setUserData,
}: ChoreCreateComponentProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const recurrenceList: string[] = extractUserRecurrences(
    userData?.chores ?? [],
  );
  const categoryList: string[] = extractUserCategories(userData?.chores ?? []);
  const [choreRequestData, setChoreRequestData] =
    useState<ChoreRequest>(defaultRequestData);

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
    createNewChoreApiCall(userData?.userId ?? 0, choreRequestData)
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
        setOpen(true);
      })
      .finally(() => {
        console.log("Always print");
      });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box component="span" style={{ fontSize: "2em" }}>
        Create a Chore
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
          Invalid inputs. Title and Description must have at least 1 character.
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
            placeholder="Tell us more about the chore"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />

          {/* Autocomplete input for  selecting Recurrence*/}
          <AutocompleteFormField
            options={recurrenceList}
            fieldLabel={"recurrence"}
            setChoreRequestData={setChoreRequestData}
          />

          <AutocompleteFormField
            options={categoryList}
            fieldLabel={"category"}
            setChoreRequestData={setChoreRequestData}
          />

          {/* TextField for Chore Length */}
          <TextField
            required
            fullWidth
            select
            name="duration"
            label="Duration"
            margin="normal"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45].map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>

          {/* Textfield forSelect a set difficulty level */}
          <TextField
            required
            fullWidth
            select
            name="difficulty"
            label="Difficulty"
            margin="normal"
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
          </Box>
        </form>
      </Container>
    </Box>
  );
}
