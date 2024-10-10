import { ArrowLeftEndOnRectangleIcon, BriefcaseIcon, ClipboardDocumentIcon, CodeBracketIcon, Cog8ToothIcon, UserIcon, UsersIcon  } from "@heroicons/react/24/outline"

export const sidebarLinks: _ILinks[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <CodeBracketIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: (
      <BriefcaseIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Teams",
    href: "/dashboard/teams",
    icon: (
      <UsersIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Tasks",
    href: "/dashboard/tasks",
    icon: (
      <ClipboardDocumentIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Clients",
    href: "/dashboard/clients",
    icon: (
      <UserIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <Cog8ToothIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "/logout",
    icon: (
      <ArrowLeftEndOnRectangleIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export const notificationsData: _INotification[] = [
  {
    id: 1,
    subject: "System Update",
    message: "A new system update is available.",
  },
  {
    id: 2,
    subject: "Meeting Reminder",
    message: "Don't forget about the meeting at 3 PM today.",
  },
  {
    id: 3,
    subject: "Promotion Alert",
    message: "You have been promoted to Senior Developer!",
  },
  {
    id: 4,
    subject: "Password Reset",
    message: "Your password reset request has been processed.",
  },
  {
    id: 5,
    subject: "New Assignment",
    message: "You have a new task assigned in your project.",
  },
  {
    id: 6,
    subject: "Event Invitation",
    message: "You are invited to the annual tech conference.",
  },
  {
    id: 7,
    subject: "Weekly Summary",
    message: "Here is your weekly summary report.",
  },
];

