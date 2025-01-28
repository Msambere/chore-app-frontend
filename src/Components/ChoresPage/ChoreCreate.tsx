import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

const previous_chore_tile = [
  { previous_chore_tile: "Do Laundry" },
  { previous_chore_tile: "Study Algorithm" },
  { previous_chore_tile: "Go the gym" },
];
const recurrence = [
  { recurrence: "Daily" },
  { recurrence: "Weekly" },
  { recurrence: "Monthly" },
];

const category = [
  { category: "House Chores" },
  { category: "Self Care" },
  { category: "Self Study" },
];

const set_difficulty_level = [
  { set_difficulty_level: "Easy" },
  { set_difficulty_level: "Medium" },
  { set_difficulty_level: "Hard" },
];

export default function ChoreCreateComponent() {
  return (
    <Box sx={{ mb: 2 }}>
      <Box component="span" style={{ fontSize: "2em" }}>
        Create a Chore
      </Box>
      <Container maxWidth="sm">
        {/* TextField for Adding a Title */}
        <Autocomplete
          disablePortal
          freeSolo
          options={previous_chore_tile.map((item) => item.previous_chore_tile)}
          getOptionLabel={(option) => option}
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Chore Title" />
          )}
          onChange={(_, newValue) => {
            if (typeof newValue === "string") {
              console.log("New value added:", newValue); // Optional: Handle new value addition
            }
          }}
        />

        {/* TextField for Adding a Description */}
        <TextField
          fullWidth
          label="Add a Description"
          margin="normal"
          multiline
          rows={2}
          variant="outlined"
        />

        {/* TextField for Chore Length */}
        <TextField
          fullWidth
          label="Chore Length"
          margin="normal"
          multiline
          rows={2}
          variant="outlined"
        />

        {/* Autocomplete forSelect a Recurrence */}
        <Autocomplete
          disablePortal
          options={recurrence}
          getOptionLabel={(option) => option.recurrence}
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a Recurrence" />
          )}
        />

        {/* Autocomplete forSelect a category */}
        <Autocomplete
          disablePortal
          options={category}
          getOptionLabel={(option) => option.category}
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a category" />
          )}
        />

        {/* Autocomplete forSelect a set difficulty level */}
        <Autocomplete
          disablePortal
          options={set_difficulty_level}
          getOptionLabel={(option) => option.set_difficulty_level}
          sx={{ mb: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Set Difficulty Level" />
          )}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end", // Aligns items to the right
            mt: 2, // Optional: Add some margin-top
          }}
        >
          <Button variant="outlined">Submit</Button>
        </Box>
      </Container>
    </Box>
  );
}
