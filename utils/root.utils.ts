/**
 * Truncate the message to the specified length and add '...' if it exceeds that length.
 * @param message - The message to truncate.
 * @param maxLength - The maximum number of characters to display before truncating.
 * @returns The truncated message.
 */
export const truncateMessage = (message: string, maxLength: number = 15): string => {
  return message.length > maxLength
    ? message.slice(0, maxLength) + "..."
    : message;
};

// Dropdown styles logic based on screen size
export const getDropdownStyles = (
  mobileLeft: string,
  mobileTop: string,
  desktopLeft: string,
  desktopTop: string,
  isMobile: boolean
) =>
  isMobile
    ? { left: mobileLeft, top: mobileTop } // Mobile styles
    : { left: desktopLeft, top: desktopTop }; // Desktop styles

// Percentage calculation utility
export const calculatePercentage = (total: number, item: number) => {
  if (total === 0) return '0'; // Prevent division by zero
  const percentage = (item / total) * 100;
  return percentage.toFixed(0); // Return the percentage as a whole number
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const getStringValue = (
  value: string | number | boolean | string[] | undefined
): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (typeof value === "boolean") {
    return value ? "True" : "False"; // Or any alternate string representation
  }
  // Handle string array or undefined
  return "";
};

export function formatNumber(number: number, decPlaces: number) {
  decPlaces = Math.pow(10, decPlaces);
  let stringNumber = number.toString();

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        stringNumber = number.toString();
        i++;
      }

      stringNumber += abbrev[i];

      break;
    }
  }

  return stringNumber;
}

 // Helper function to identify boolean fields
export const getTableBooleanFields = (item: _TableRowType) => {
  return Object.keys(item).filter((key) => typeof item[key] === "boolean");
};

export const groupFieldConfigs = (fields: _ICommonFieldProps[]) => {
  return fields.reduce((groups, field) => {
    const group = field.group || "default"; // Use 'default' if no group is specified
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(field);
    return groups;
  }, {} as Record<string, _ICommonFieldProps[]>);
};


export function formatKey(key: string) {
  return key
    .split("_") // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words with a space
}

export const getRelativeTime = (date1: string, date2: string) => {
   if (date1.toLowerCase().trim() === date2.toLowerCase().trim()) {
     return undefined;
   }
  const newDate = new Date();
  const targetDate = new Date(date2);

  // Calculate the difference in milliseconds
  const diffInMs = newDate.getTime() - targetDate.getTime();

  // Convert differences to days, months, and years
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert ms to days
  const diffInMonths = Math.floor(diffInDays / 30); // Approximate months
  const diffInYears = Math.floor(diffInMonths / 12); // Approximate years

  if (diffInYears >= 1) {
    return diffInYears === 1
      ? `last year`
      : `${diffInYears} years ago`;
  } else if (diffInMonths >= 3) {
    return `${diffInMonths} months ago`;
  } else {
    return diffInDays === 0
      ? `today`
      : diffInDays === 1
      ? "yesterday"
      : `${diffInDays} days ago`;
  }
};

export const extractImagesFromData = (data: Record<string, any>): string[] => {
  for (const key in data) {
    if (data.hasOwnProperty(key) && key.toLowerCase().includes("image")) {
      const value = data[key];
      if (typeof value === "string") {
        return [value];
      }
      if (Array.isArray(value)) {
        return value;
      }
    }
  }
  return [];
};


export const getKeysExcludingField = <T extends object>(
  array: T[],
  trimField: keyof T
): Array<Exclude<keyof T, typeof trimField>> => {
  // Check if the array is not empty
  if (array.length === 0) {
    return []; // Return an empty array if the input array is empty
  }

  // Get keys from the first object and exclude the trimField
  const keys = Object.keys(array[0]).filter((key) => key !== trimField);

  return keys as Array<Exclude<keyof T, typeof trimField>>;
};

export function addSpaceBeforeCapitalLetters(input: string): string {
  // Use regex to match uppercase letters and prepend them with a space
  return input.replace(/([A-Z])/g, " $1").trim();
}