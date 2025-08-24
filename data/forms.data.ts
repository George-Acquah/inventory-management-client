import { ITEM_SEX_TYPE, ITEM_ZONE } from "@/schemas";
import { formatKey } from "@/utils/root.utils";

export const zoneOptions = Object.entries(ITEM_ZONE).map(([key, value]) => ({
  label: formatKey(key), // Use the enum key as the label
  value: value, // Use the enum value as the value
}));

export const sexTypeOptions = Object.entries(ITEM_SEX_TYPE).map(([key, value]) => ({
  label: formatKey(key), // Use the enum key as the label
  value: value, // Use the enum value as the value
}));

export const projectFields: _ICommonFieldProps[] = [
  {
    name: "projectName",
    label: "Project Name",
    type: "text",
    placeholder: "Enter project name",
    group: "Basic Information",
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "text", // Use date input for start date
    placeholder: "Select start date",
    group: "Basic Information",
  },
  {
    name: "endDate",
    label: "End Date",
    type: "text", // Use date input for end date
    placeholder: "Select end date",
    group: "Basic Information",
  },
  // Group: Project Details
  {
    name: "teamAssigned",
    label: "Team Assigned",
    type: "text",
    placeholder: "Enter team name or members",
    group: "Project Details",
  },
  {
    name: "status",
    label: "Status",
    type: "text",
    // options: [
    //   { value: "not_started", label: "Not Started" },
    //   { value: "in_progress", label: "In Progress" },
    //   { value: "completed", label: "Completed" },
    // ],
    placeholder: "Select project status",
    group: "Project Details",
  },
];

export const createItemFields: _ICommonFieldProps[] = [
  {
    name: "itemName",
    label: "Item Name",
    type: "text",
    placeholder: "Enter item name",
    group: "Basic Information",
  },
  {
    name: "stock",
    label: "Stock",
    type: "number",
    placeholder: "Enter available stock",
    group: "Basic Information",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "Enter item price",
    group: "Price Information",
  },

  {
    name: "lastPrice",
    label: "Last Price",
    type: "number",
    placeholder: "Enter last sold price",
    group: "Price Information",
  },
  {
    name: "zone",
    label: "Zone",
    type: "select",
    options: zoneOptions,
    group: "Category Information",
    placeholder: "Select a zone",
  },
  {
    name: "sexType",
    label: "Sex Type",
    type: "select",
    options: sexTypeOptions,
    group: "Category Information",
    placeholder: "Select sex type",
  },
];

export const teamFields: _ICommonFieldProps[] = [
  // Group: Basic Information
  {
    name: "teamName",
    label: "Team Name",
    type: "text",
    placeholder: "Enter team name",
    group: "Basic Information",
  },
  {
    name: "creationDate",
    label: "Creation Date",
    type: "text",
    placeholder: "Select creation date",
    group: "Basic Information",
  },
  // Group: Team Details
  {
    name: "department",
    label: "Department",
    type: "text",
    placeholder: "Enter department",
    group: "Team Details",
  },
  {
    name: "members",
    label: "Members",
    type: "text",
    placeholder: "List team members",
    group: "Team Details",
  },
];
