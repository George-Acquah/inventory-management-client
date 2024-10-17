import { ErrorMessages } from "@/utils/constants";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  ServerError,
  NetworkError,
} from "./exceptions";
import { auth } from "@/auth";

export const API = process.env.NEXT_PUBLIC_API_URL;

// Handles different status codes with error messages
export function switchErrRes(status: number, message: string): never {
  switch (status) {
    case 400:
      throw { code: 400, message: message || "Bad Request" };
    case 401:
    case 403:
      throw new UnauthorizedError(message || ErrorMessages.UNAUTHORIZED);
    case 404:
      throw new NotFoundError(message || ErrorMessages.NOT_FOUND);
    case 422:
      throw new ValidationError(message || ErrorMessages.VALIDATION_ERROR);
    case 500:
      throw new ServerError(message || ErrorMessages.SERVER_ERROR);
    default:
      throw { code: status, message: message || "An error occurred" };
  }
}

// Optimized fetcher function
export async function fetcher<T, S>(
  url: string,
  method: _TRequestMethod = "GET",
  cache: RequestCache = "default",
  body?: S
): Promise<_IApiResponse<T>> {
  const fetchUrl = `${API}/${url}`;

  // Avoid multiple calls to auth, handle token refresh efficiently
  const headers = await authHeader(body instanceof FormData);

  // Define request options
  const options: RequestInit = {
    method,
    cache,
    credentials: "include",
    headers,
  };

  // Handle body for FormData and JSON
  if (body) {
    if (body instanceof FormData) {
      options.body = body; // Browser handles FormData headers automatically
    } else {
      options.body = JSON.stringify(body);
      (options.headers as Record<string, string>)["Content-Type"] =
        "application/json"; // Explicit type-cast
    }
  }

  try {
    // Fetch request
    const res = await fetch(fetchUrl, options);

    // If the response is not OK, handle errors
    if (!res.ok) {
      const errorText = await res.text();
      switchErrRes(res.status, errorText || res.statusText);
    }

    // Parse and return the data
    const data = (await res.json()) as _IApiResponse<T>;

    // Handle API error responses
    if (data.statusCode && data.statusCode !== 200) {
      switchErrRes(data.statusCode, data.message);
    }

    return data;
  } catch (err: any) {
    if (err.message?.toLowerCase() === "fetch failed") {
      throw new NetworkError();
    }
    throw err;
  }
}

// Optimized authHeader function
export const authHeader = async (isUpload: boolean = false) => {
  const session = await auth();

  // Build the Authorization header
  const headers: Record<string, string> = {
    Authorization: session?.accessToken
      ? `Bearer ${session.accessToken}`
      : "Bearer invalid-token",
  };

  // Avoid setting Content-Type for file uploads (multipart/form-data)
  if (!isUpload) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

export const mockFetchData = <T>(
  data: T, // Second parameter, the data to return
  props1?: any, // First optional parameter of any type
  delay: number = 1000 // Third optional parameter, delay in milliseconds (default to 1 second)
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data); // Resolve with the provided data after the delay
      } else {
        reject("No data provided!"); // Reject if no data is provided
      }
    }, delay);
  });
};