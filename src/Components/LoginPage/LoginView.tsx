import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import {Alert, AlertTitle, Box, Button, Container, Stack, Typography} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { getUserInfo } from "~/HelperFunctions/ApiCalls";
import UserData from "~/types/Response/UserData";

const loginSchema = z.object({
  username: z.string().min(4, "Invalid username"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginViewProps {
  setUserData: Dispatch<SetStateAction<UserData>>;
}

export default function LoginPage({ setUserData }: LoginViewProps) {
  const formResolver = zodResolver(loginSchema);
  const formContext = useForm<LoginFormInputs>({ resolver: formResolver });
  const { handleSubmit, setError } = formContext;
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: LoginFormInputs) => {
    try {
      const response = await getUserInfo(data.username);
      if (response?.message === "User not found") {
        setError("username", {
          type: "value",
          message: "User not found. Please check your username.",
        });
      } else if (response?.message === "User found") {
        setUserData(response);
        localStorage.setItem("username", response.username);
        navigate("/UserProfile");
      } else {
        setError("username", {
          type: "value",
          message: "Unexpected response from the server.",
        });
      }
    } catch (error) {
      setError("username", {
        type: "value",
        message: "Failed to log in. Please try again.",
      });
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser !== null && storedUser !== "") {
      navigate("/UserProfile");
    }
  }, []);

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
          <TextFieldElement name={"username"} label={"Username"} required />
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
          <Button component={RouterLink} to={"/Signup"}>
            Sign up
          </Button>
          <Button variant={"contained"} type={"submit"} color={"primary"}>
            Login
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
