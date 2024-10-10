"use client";
import { loginAction } from "@/lib/actions";
import { DynamicForm } from "./CommonForms";
import { useForm } from "react-hook-form";
import { _TLoginFormInput, LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the result type for the login action
interface LoginActionResult {
  userId: string; // Example: login action might return a userId
}

export default function LoginForm() {
  // Define the form using react-hook-form with Zod schema validation
  const form = useForm<_TLoginFormInput>({
    resolver: zodResolver(LoginSchema),
  });

  // Define the fields for the form
  const fields: _ICommonFieldProps[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      // description: "Please enter a valid email address.",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <DynamicForm<_TLoginFormInput, LoginActionResult>
      fields={fields}
      action={loginAction} // Action can return LoginActionResult on success
      form={form} // Inferred type from react-hook-form
      label="Login"
      pendingText="Logging in"
    />
  );
}
