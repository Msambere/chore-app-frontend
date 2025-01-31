import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormContainer,
  TextFieldElement,
  AutocompleteElement,
} from "react-hook-form-mui";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { createChore } from "~/Helper Functions/ApiCalls"; // Your API call
import ChoreResponse from "~/types/Response/ChoreResponse"; // The interface
import UserData from "~/types/Response/UserData";

// ----- Option arrays -----
const recurrenceOptions = ["Daily", "Weekly", "Monthly"];
const categoryOptions = ["House Chores", "Self Care", "Self Study"];
// We will store difficulty as strings in the dropdown, then transform to a numeric value.
const difficultyOptions = ["Easy", "Medium", "Hard"];

// ----- 1. Define Zod schema matching ChoreResponse -----
const choreSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  recurrence: z.enum(["Daily", "Weekly", "Monthly"], {
    errorMap: () => ({ message: "Recurrence is required" }),
  }),
  category: z.string().min(3, "Category is required"),

  // Duration is a number => we use .coerce.number() so user can input text and it’s parsed as a number
  duration: z.coerce
    .number()
    .min(1, "Please enter a positive number for duration"),

  // Difficulty is a string in the dropdown, but we transform it to a numeric for the final result
  difficulty: z
    .enum(["Easy", "Medium", "Hard"], {
      errorMap: () => ({ message: "Difficulty is required" }),
    })
    .transform((val) => {
      switch (val) {
        case "Easy":
          return 1;
        case "Medium":
          return 2;
        case "Hard":
          return 3;
      }
    }),
});

// Derive the TypeScript type from the schema
type ChoreFormValues = z.infer<typeof choreSchema>;

interface ChoreCreateComponentProps {
  userData?: UserData;
}

export default function ChoreCreateComponent({
  userData,
}: ChoreCreateComponentProps) {
  const navigate = useNavigate();

  // ----- 2. Redirect if no userData -----
  useEffect(() => {
    if (!userData) {
      navigate("/Login");
    }
  }, [userData, navigate]);

  // ----- 3. Handle successful form submission -----
  const handleFormSuccess = (data: ChoreFormValues) => {
    if (!userData) return;

    // Map the form data to the ChoreResponse interface
    const choreToCreate: ChoreResponse = {
      title: data.title,
      description: data.description,
      recurrence: data.recurrence,
      category: data.category,
      duration: data.duration,
      difficulty: data.difficulty,
      userId: userData.userId,
    };

    // Call your API
    createChore(userData.userId, choreToCreate).then(() => {
      navigate("/Chores");
    });
  };

  // ----- 4. Render the form -----
  return (
    <Box sx={{ mb: 2 }}>
      <Box component="span" style={{ fontSize: "2em" }}>
        Create a Chore
      </Box>

      <Container maxWidth="sm" sx={{ mt: 2 }}>
        {/*
          1) FormContainer from react-hook-form-mui sets up useForm internally
             and applies the zodResolver for validation.
          2) onSuccess => handleFormSuccess is called after all validations pass.
        */}
        <FormContainer
          defaultValues={{
            title: "",
            description: "",
            recurrence: "Daily",
            category: "",
            duration: 1,
            difficulty: 1,
          }}
          resolver={zodResolver(choreSchema)}
          onSuccess={handleFormSuccess}
        >
          {/*
            TextFieldElement => a simple MUI TextField integrated with react-hook-form.
            AutocompleteElement => an MUI Autocomplete integrated with react-hook-form.
            Each one automatically handles value, error display, and onChange events.
          */}
          <TextFieldElement
            name="title"
            label="Chore Title"
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextFieldElement
            name="description"
            label="Description"
            required
            multiline
            rows={2}
            fullWidth
            sx={{ mb: 2 }}
          />

          <AutocompleteElement
            name="recurrence"
            label="Select Recurrence"
            options={recurrenceOptions}
            required
            textFieldProps={{ sx: { mb: 2 } }}
          />

          <AutocompleteElement
            name="category"
            label="Select Category"
            options={categoryOptions}
            required
            textFieldProps={{ sx: { mb: 2 } }}
          />

          {/*
            We store 'duration' as a number. We'll use a TextFieldElement with type="number".
            The Zod schema uses z.coerce.number() so the string input is parsed to a number.
          */}
          <TextFieldElement
            name="duration"
            label="Duration (minutes)"
            type="number"
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          {/*
            difficulty is a numeric field in your interface,
            but we collect it as "Easy"/"Medium"/"Hard" then transform it to 1/2/3 in Zod.
          */}
          <AutocompleteElement
            name="difficulty"
            label="Difficulty"
            options={difficultyOptions}
            required
            textFieldProps={{ sx: { mb: 2 } }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </Box>
        </FormContainer>
      </Container>
    </Box>
  );
}
