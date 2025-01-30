import { z } from "zod";
import { signupSchema } from "~/types/Forms/SignupSchema";

type SignupFormInputs = z.infer<typeof signupSchema>;

export default SignupFormInputs;
