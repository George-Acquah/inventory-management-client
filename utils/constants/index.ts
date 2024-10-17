// Define a type for your theme
export const generalThemeKey = "general-theme";

export const clientCookiesKeys = {
  THEME: "global-theme",
};

export const clientCookiesValues = {
  GLOBAL_LIGHT_THEME: "light",
  GLOBAL_DARK_THEME: "dark",
  GLOBAL_SYSTEM_THEME: "system",
};

export const THEME = {
  mainBg: "bg-white dark:bg-neutral-900",
  secBg: "bg-neutral-100 dark:bg-neutral-800",
};

export const ErrorMessages = {
  NETWORK_FAILURE: "There's a problem with your internet connection.",
  AUTH_REQUIRED: "Authentication is required to access this page.",
  SERVER_ERROR: "An unexpected server error occurred.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  VALIDATION_ERROR: "Validation failed for the request.",
};

export const ErrorNames = {
  NETWORK_ERROR: "NetworkError",
  AUTH_ERROR: "AuthRequiredError",
  SERVER_ERROR: "ServerError",
  NOT_FOUND_ERROR: "NotFoundError",
  UNAUTHORIZED_ERROR: "UnauthorizedError",
  VALIDATION_ERROR: "ValidationError",
};

export const credentials = {
  email: {
    label: "Email",
    type: "email",
    placeholder: "",
  },
  password: {
    label: "Password",
    type: "password",
  },
};