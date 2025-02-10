import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import {
  Button,
  Stack,
  Box,
  Container,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { createUser } from "~/HelperFunctions/ApiCalls";
import { Link as RouterLink, useNavigate } from "react-router";
import signupSchema from "~/types/Forms/SignupSchema";
import SignupFormInputs from "~/types/Forms/SignupFormInputs";

export default function SignupView() {
  const formResolver = zodResolver(signupSchema);
  const formContext = useForm<SignupFormInputs>({ resolver: formResolver });
  const { handleSubmit, setError } = formContext;
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormInputs) => {
    console.log("Submiting new user", data);
    createUser(data)
      .then((response) => {
        response.json().then((data) => {
          if (data.message === "User created successfully") {
            alert(
              "Your new user account has been created! Please check your email to confirm.",
            );
            navigate("/");
          } else {
            alert(data.message);
          }
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
    <Container fixed sx={{ height: "100vh" }}>
      <Typography variant={"h1"} align={"center"} pb={2}>
        ChoreChamp
      </Typography>
      <FormContainer
        formContext={formContext}
        handleSubmit={handleSubmit(onSubmit)}
        resolver={formResolver}
      >
        <Stack spacing={2} maxWidth={0.7} m={"auto"} mb={2}>
          <TextFieldElement name={"firstName"} label={"First Name"} required />
          <TextFieldElement name={"lastName"} label={"Last Name"} required />
          <TextFieldElement name={"username"} label={"Username"} required />
          <TextFieldElement name={"email"} label={"Email"} required />
          <PasswordElement name={"password"} label={"Password"} required />
        </Stack>
        <Box
          sx={{
            maxWidth: 0.7,
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Button component={RouterLink} to={"/"}>
            Back to Login
          </Button>{" "}
          <Button variant={"contained"} type={"submit"} color={"primary"}>
            Sign up
          </Button>
        </Box>
      </FormContainer>
      <Alert
        severity="info"
        variant="filled"
        sx={{
          maxWidth: 0.7,
          margin: "auto",
          marginBottom: 4,
          marginTop: 4,
          borderRadius: "8px",
        }}
      >
        <AlertTitle>Info</AlertTitle>
        <h4>Demo Website Disclaimer</h4>
        <p>
          This is a demo version of the ChoreChamp web application. It is
          intended for demonstration and development purposes only.
          <ul>
            <li> Do NOT enter any personal, private, or secure information.</li>
            <li> No real data security measures are implemented. </li>
            <li>
              This demo may be accessed by multiple users. Please be mindful and
              respectful when using the app.{" "}
            </li>
          </ul>
          Thank you for understanding and using ChoreChamp responsibly!
        </p>
      </Alert>
    </Container>
  );
}
