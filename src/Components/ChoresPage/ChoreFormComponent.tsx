import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
  const recurrenceList: string[] = extractUserRecurrences(userData.chores);
  const categoryList: string[] = extractUserCategories(userData.chores);
  const [choreRequestData, setChoreRequestData] =
    useState<ChoreRequest>(defaultRequestData);

  useEffect(() => {
    if (!userData) {
      navigate("/Login");
    }
  }, [userData]);

  // const recurrenceList: SelectOption[] = [];
  // const categoryList: SelectOption[] = [];
  // useEffect(() => {
  //   const recurrenceStrings = extractUserRecurrences(userData.chores);
  //   for (const recurrence in recurrenceStrings) {
  //     recurrenceList.push({ value: recurrence, label: recurrence });
  //   }
  //   const categoryStrings = extractUserCategories(userData.chores);
  //   for (const category in categoryStrings) {
  //     categoryList.push({ value: category, label: category });
  //   }
  // }, []);

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
        setUserData((prevData) => ({
          ...prevData,
          chores: [...prevData.chores, response],
        }));
        navigate("/Chores");
      })
      .catch((error) => {
        console.log(error.response);
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
          No matching chores found. Change your recurrence/category/time limit
          and try again.
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

          {/* TextField for Chore Length */}
          <TextField
            fullWidth
            select
            name="duration"
            label="Duration"
            margin="normal"
            defaultValue={0}
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

          {/* Autocomplete for Select a Recurrence */}
          <Autocomplete
            disablePortal
            options={recurrenceList}
            getOptionLabel={(option) => option}
            sx={{ mb: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a Recurrence"
                name="recurrence"
                onChange={(event) => {
                  console.log(event.target);
                  handleInputChange(event.target.name, event.target.value);
                }}
              />
            )}
          />

          {/*<CreatableSelect*/}
          {/*  isClearable*/}
          {/*  // onChange={(event) => {*/}
          {/*  //   console.log(event.target);*/}
          {/*  //   handleInputChange(event.target.name, event.target.value);*/}
          {/*  // }}*/}
          {/*  options={recurrenceList}*/}
          {/*/>*/}

          {/* Autocomplete for Select a category */}
          <Autocomplete
            disablePortal
            options={categoryList}
            getOptionLabel={(option) => option}
            sx={{ mb: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a category"
                name="category"
              />
            )}
          />

          {/* Autocomplete forSelect a set difficulty level */}
          <Autocomplete
            disablePortal
            options={["Easy", "Medium", "Hard"]}
            getOptionLabel={(option) => option}
            sx={{ mb: 2 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Set Difficulty Level"
                name="difficutly"
                onChange={(event) =>
                  handleInputChange(event.target.name, event.target.value)
                }
              />
            )}
          />

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
