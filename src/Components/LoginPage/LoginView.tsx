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
import { useEffect } from "react";

const loginSchema = z.object({
  username: z.string().min(4, "Invalid username"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

interface LoginViewProps {
  userNameSetter: (value: string) => void;
  userName?: string | undefined;
}

export default function LoginPage({
  userNameSetter,
  userName,
}: LoginViewProps) {
  const formResolver = zodResolver(loginSchema);
  const formContext = useForm<LoginFormInputs>({ resolver: formResolver });
  const { handleSubmit, setError } = formContext;
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Logging in with:", data);
    if (data.username !== "test" || data.password !== "password123") {
      setError("root", { type: "manual", message: "Wrong credentials." });
    }
    userNameSetter("user1");
  };

  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName, onSubmit]);

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
