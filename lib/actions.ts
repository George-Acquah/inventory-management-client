/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { signIn, signOut } from "@/auth";
import { LoginSchema, TeamsSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { fetcher } from "./dataFetching";
import { RedirectType, permanentRedirect, redirect } from "next/navigation";
import {
  AUTH_ERRORS,
  redirectDynamicUrls,
} from "@/utils/constants/errors.constants";
import { AuthError } from "next-auth";

export async function signOutHelper() {
  await signOut();
}

// Server action for deleting an entity
export async function deleteEntity(id: string): Promise<void> {
  try {
    console.log(id, "delete mimiced");

    // Revalidate the cache for the specific path after deletion to ensure data is refreshed
    revalidatePath('');
  } catch (error) {
    console.error("Failed to delete entity:", error);
    throw new Error("Failed to delete entity");
  }
}

// Server action for deleting an entity
export async function updateBulkEntity(ids: string[]): Promise<void> {
  try {
    console.log(ids, "updated mimiced");
    return;
  } catch (error) {
    console.error("Failed to delete entity:", error);
    throw new Error("Failed to delete entity");
  }
}

export const sellItem = async (item: _ISellPayload, path: string) => {
  try {
    const url = `transactions`;
    const response = await fetcher<unknown, _ISellPayload>(
      url,
      "POST",
      "no-store",
      item
    );
    console.log(response);
    if (response && response.statusCode === 200) {
      revalidatePath(path);
      return response.message;
    }
  } catch (err: any) {
    console.log(err);
    const { ERROR_URL: errorUrl } = redirectDynamicUrls(
      path,
      "inventory",
      err?.name || "An error occured",
      err.message || "We dont have enough knowledge on the error"
    );
    redirect(errorUrl); // Redirect to a generic error page
  }
};

export async function createUser(prevState: any, formData: FormData) {
  console.log(prevState);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Email and Password are required");
  }
  revalidatePath("/");

  return { message: "User created successfully!" };
}

export const loginAction = async (prevState: any, payload: FormData) => {
  const formData = Object.fromEntries(payload.entries());

  try {
    const validatedFields = LoginSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        type: "error" as const,
        errors: validatedFields.error.flatten().fieldErrors,
      } satisfies _TActionResult;
    }

    await signIn("credentials", {
      redirect: false,
      ...validatedFields.data,
    });

    // On successful login, redirect to the dashboard or intended page
    permanentRedirect("/inventory", RedirectType.replace);
  } catch (err: any) {
    if (err.message === "NEXT_REDIRECT") {
      throw err;
    } else if (err instanceof AuthError) {
      console.log(err);
      const errorUrl = AUTH_ERRORS.NEXTAUTH_ERROR_URL("auth");
      redirect(errorUrl);
    } else {
      // Handle other errors here
      const errorUrl = AUTH_ERRORS.NEXTAUTH_ERROR_URL("auth");
      console.log(errorUrl);
      redirect(errorUrl);
    }
  }
};

export async function deleteItem(id: string) {
  const url = `items/${id}`;
  console.log(url)
  try {
    await fetcher(url, "DELETE");
    revalidatePath('inventory');
    redirect(`/inventory`);
  } catch (err: any) {
    if (err.message === "NEXT_REDIRECT") {
      throw err; // Re-throw the redirect error
    } else {
      const { ERROR_URL: errorUrl } = redirectDynamicUrls(
        "inventory",
        "inventory",
        err?.name || "An error occurred",
        err.message || "We don't have enough knowledge on the error"
      );
      redirect(errorUrl);
    }
  }
}

export const createItem = async (prevState: any, payload: FormData) => {
  try {
    const response = await fetcher<unknown, FormData>(
      "items",
      "POST",
      "no-store",
      payload
    );

    if (response && response.statusCode === 200) {
      revalidatePath("inventory");
      return {
        type: "success" as const,
        message: response.message,
      };
    }
  } catch (err: any) {
    const { ERROR_URL: errorUrl } = redirectDynamicUrls(
      "inventory",
      "inventory",
      err?.name || "An error occurred",
      err.message || "We don't have enough knowledge on the error"
    );
    redirect(errorUrl);
  }
};

export const updateItem = async (id: string, prevState: any, payload: FormData) => {
  try {
    console.log(payload);
    const response = await fetcher<unknown, FormData>(
      `items/${id}`,
      "PATCH",
      "no-store",
      payload
    );

    if (response && response.statusCode === 200) {
      revalidatePath("inventory");
      return {
        type: "success" as const,
        message: response.message,
      };
    }
  } catch (err: any) {
    const { ERROR_URL: errorUrl } = redirectDynamicUrls(
      "inventory",
      "inventory",
      err?.name || "An error occurred",
      err.message || "We don't have enough knowledge on the error"
    );
    redirect(errorUrl);
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

export const fetchItems = async (q = "", currentPage = 1, size = 5) => {
  try {
    const url = `items?q=${q}&currentPage=${currentPage}&size=${size}`;

    const response = await fetcher<_IItem[], undefined>(url, "GET", "no-store");

    return response.data;
  } catch (error) {
    const errorUrl = AUTH_ERRORS.NEXTAUTH_ERROR_URL("inventory");
    redirect(errorUrl);
  }
};

export const fetchAnalyticsData = async () => {
  try {
    const url = `transactions/analytics`;

    const response = await fetcher<_IAnalyticsData, undefined>(url, "GET", "no-store");

    return response.data;
  } catch (error) {
    const errorUrl = AUTH_ERRORS.NEXTAUTH_ERROR_URL("inventory");
    redirect(errorUrl);
  }
};

export const fetchTransactions = async (q = "", currentPage = 1, size = 5) => {
  try {
    const url = `transactions?q=${q}&currentPage=${currentPage}&size=${size}`;

    const response = await fetcher<_ITransaction[], undefined>(url, "GET", "no-store");

    return response.data;
  } catch (error) {
    const errorUrl = AUTH_ERRORS.NEXTAUTH_ERROR_URL("inventory");
    redirect(errorUrl);
  }
};

export const fetchSingleItem = async (id: string) => {
  const url = `items/${id}`;

  const response = await fetcher<_IItem, undefined>(url);

  return response.data;
};
