import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("Logging in with:", data);
      // Replace this with your actual authentication logic (API call, Firebase, etc.)
      if (
        data.email !== "test@example.com" ||
        data.password !== "password123"
      ) {
        throw new Error("Invalid credentials");
      }
      alert("Login successful!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="mb-3">
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
