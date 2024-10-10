'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { createUser } from "@/lib/actions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/utils/contexts/forms.context";
import { useFormState } from "react-dom";

// Define form validation schema using Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface _IFormData {
  [key: string]: string;
  email: string;
  password: string;
}

export default function UserForm() {
  const form = useForm<_IFormData>({
    resolver: zodResolver(schema),
  });

  // Define initial state for the form
  const initialState = { message: "" };

  // Hook into the server action with useActionState
  const [state, formAction, isPending] = useFormState(
    createUser,
    initialState
  );

  // Handle form submission, passing email and password as the state
const onSubmit = async (data: _IFormData) => {
  // Ensure this is the built-in FormData
  const formData = new window.FormData();

  // Append properties using known keys
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // Check if the key is an own property
      formData.append(key, data[key]);
    }
  }

  formAction(formData); // Pass the FormData instance
};


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...form.register("email")}
            disabled={isPending}
            className="form-input"
          />
          {form.formState.errors.email && (
            <p className="text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...form.register("password")}
            disabled={isPending}
            className="form-input"
          />
          {form.formState.errors.password && (
            <p className="text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        {state?.message && <p className="text-green-500">{state.message}</p>}
        <button type="submit" disabled={form.formState.isSubmitting || isPending}>
          {form.formState.isSubmitting ? "Submitting..." : "Create Account"}
        </button>
      </form>
    </Form>
  );
}
