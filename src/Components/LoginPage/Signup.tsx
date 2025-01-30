import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { Button, Stack, Box } from "@mui/material";
import { createUser } from "~/Helper Functions/ApiCalls";
import { Link as RouterLink } from "react-router";
import signupSchema from "~/types/Forms/SignupSchema";
import SignupFormInputs from "~/types/Forms/SignupFormInputs";

interface SignupViewProps {
  userNameSetter: (value: string) => void;
}

export default function SignupView({ userNameSetter }: SignupViewProps) {
  const formResolver = zodResolver(signupSchema);
  const formContext = useForm<SignupFormInputs>({ resolver: formResolver });
  const { handleSubmit, setError } = formContext;

  const onSubmit = async (data: SignupFormInputs) => {
    createUser(data)
      .then((response) => {
        response.json().then((data) => {
          alert(data.message);
          userNameSetter(data.username);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("root", {
          type: "manual",
          message: error.message,
        });
      });
  };

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit(onSubmit)}
      resolver={formResolver}
    >
      <Stack spacing={2}>
        <TextFieldElement name={"firstName"} label={"First Name"} required />
        <TextFieldElement name={"lastName"} label={"Last Name"} required />
        <TextFieldElement name={"username"} label={"Username"} required />
        <TextFieldElement name={"email"} label={"Email"} required />
        <PasswordElement name={"password"} label={"Password"} required />
      </Stack>
      <Box sx={{ margin: 4 }}>
        <Button component={RouterLink} to={"/Login"}>
          Back to Login
        </Button>{" "}
        <Button variant={"contained"} type={"submit"} color={"primary"}>
          Signup
        </Button>
      </Box>
    </FormContainer>
  );
}
