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
