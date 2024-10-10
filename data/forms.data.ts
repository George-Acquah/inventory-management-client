export const projectFields: _ICommonFieldProps[] = [
  // Group: Basic Information
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