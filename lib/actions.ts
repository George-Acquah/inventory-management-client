'use server'

import { LoginSchema, TeamsSchema } from "@/schemas";
// Importing any necessary dependencies
import { revalidatePath } from "next/cache"; // revalidatePath to refresh the path after action

// Server action for deleting an entity
export async function deleteEntity(id: string, path: string): Promise<void> {
  try {
    console.log(id, 'delete mimiced');

    // Revalidate the cache for the specific path after deletion to ensure data is refreshed
    revalidatePath(path);
  } catch (error) {
    console.error("Failed to delete entity:", error);
    throw new Error("Failed to delete entity");
  }
}

// Server action for deleting an entity
export async function updateBulkEntity(ids: string[]): Promise<void> {
  try {
    console.log(ids, 'updated mimiced')
    return;
  } catch (error) {
    console.error("Failed to delete entity:", error);
    throw new Error("Failed to delete entity");
  }
}

export async function createUser(prevState: any, formData: FormData) {
  console.log(prevState)
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Email and Password are required");
  }
  revalidatePath("/");

  return { message: "User created successfully!" };
}

export const loginAction = async (prevState: any, payload: FormData) => {
  console.log(prevState);
  const formData = Object.fromEntries(payload.entries());

  try {
    console.log(payload);
    const validatedFields = LoginSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        type: "error" as const,
        errors: validatedFields.error.flatten().fieldErrors,
      } satisfies _TActionResult;
    }

    return {
      type: "success" as const,
      message: "Login successful",
      data: { userId: validatedFields.data.email }
    };
  } catch (err: any) {
    // Handle other errors
    console.log(err);
    return { message: null };
  }
};

export const teamsAction = async (prevState: any, payload: FormData) => {
  console.log("Form Data:", payload); // Add form submission logic
    console.log(prevState);
    const formData = Object.fromEntries(payload.entries());

    try {
      console.log(payload);
      const validatedFields = TeamsSchema.safeParse(formData);

      if (!validatedFields.success) {
        return {
          type: "error" as const,
          errors: validatedFields.error.flatten().fieldErrors,
        } satisfies _TActionResult;
      }

      return {
        type: "success" as const,
        message: "Teams created successfully",
        data: { data: validatedFields.data },
      };
    } catch (err: any) {
    // Handle other errors
    console.log(err);
    return { message: null };
  }
};

