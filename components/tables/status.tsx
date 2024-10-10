import { Typography } from "../ui/typography";

interface StatusBadgeProps {
  status: boolean | string | number | undefined; // Allow flexible status types
  trueLabel?: string; // Optional label for `true` values (for boolean statuses)
  falseLabel?: string; // Optional label for `false` values (for boolean statuses)
  styleMap?: { [key: string]: string }; // Custom styles based on status values
}

const defaultStyles = {
  true: "bg-green-700 dark:bg-green-800 text-white", // Default style for "true" status
  false: "bg-red-600 dark:bg-red-700 text-white", // Default style for "false" status
  default: "bg-gray-300 text-black", // Fallback for unknown statuses
};

// Dynamic StatusBadge that handles different types of status values
const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  trueLabel = "Active",
  falseLabel = "Inactive",
  styleMap = {},
}) => {
  let displayText;
  let statusStyle;

  if (typeof status === "boolean") {
    // If status is boolean, map it to true/false labels and styles
    displayText = status ? trueLabel : falseLabel;
    statusStyle = status ? defaultStyles.true : defaultStyles.false;
  } else if (typeof status === "string" || typeof status === "number") {
    // If status is a string or number, use it directly
    displayText = String(status);
    statusStyle = styleMap[displayText] || defaultStyles.default;
  } else {
    // Fallback for undefined or null values
    displayText = "Unknown";
    statusStyle = defaultStyles.default;
  }

  return (
    <Typography variant="span"
      className={`inline-block px-3 py-1 rounded-full font-mono font-semibold uppercase ${statusStyle}`}
    >
      {displayText}
    </Typography>
  );
};

export default StatusBadge;
