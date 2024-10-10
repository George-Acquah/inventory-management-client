import { WrenchIcon } from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const themesTypeData: _ITooltipItem[] = [
  {
    id: 1,
    name: "Light Theme",
    theme: 'light',
    icon: MoonIcon,
  },
  {
    id: 2,
    name: "Dark Theme",
    theme: 'dark',
    icon: SunIcon,
  },
  {
    id: 3,
    name: "System",
    theme: 'system',
    icon: WrenchIcon,
  },
];
