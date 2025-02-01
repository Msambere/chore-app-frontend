import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { Button, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { useCallback, useEffect } from "react";
import { getUserInfo } from "~/Helper Functions/ApiCalls";
import UserData from "~/types/Response/UserData";

const loginSchema = z.object({
  username: z.string().min(4, "Invalid username"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginViewProps {
  userNameSetter: (value: string) => void;
  userName?: string | undefined;
  userData: UserData;
}

export default function LoginPage({
  userNameSetter,
  userName,
  userData,
}: LoginViewProps) {
  const formResolver = zodResolver(loginSchema);
  const formContext = useForm<LoginFormInputs>({ resolver: formResolver });
  const { handleSubmit, setError } = formContext;
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: LoginFormInputs) => {
      try {
        const response = await getUserInfo(data.username);
        if (response?.message === "User not found") {
          setError("username", {
            type: "value",
            message: "User not found. Please check your username.",
          });
        } else if (response?.username) {
          userNameSetter(response.username ?? "");
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
    },
    [userNameSetter, setError],
  );
  useEffect(() => {
    if (userData.username !== "Not logged in") {
      navigate("/UserProfile");
    }
  }, [userData]);

  return (
    <FormContainer
      formContext={formContext}
      handleSubmit={handleSubmit(onSubmit)}
      resolver={formResolver}
    >
      <Stack spacing={2}>
        <TextFieldElement name={"username"} label={"Username"} required />
        <PasswordElement name={"password"} label={"Password"} required />
      </Stack>
      <Button type={"submit"} color={"primary"}>
        Login
      </Button>
      <Button component={RouterLink} to={"/Signup"}>
        Sign up
      </Button>
    </FormContainer>
  );
}
