import { zoneOptions, sexTypeOptions } from "@/data/forms.data";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown";
import { Typography } from "./ui/typography";
import { CSSProperties } from "react";
import { cn } from "@/utils/classes.utils";

const AppFilters = ({filterStyles, className}: { filterStyles: CSSProperties | undefined, className?: string }) => {
  return (
    <DropdownMenu
      trigger={<AdjustmentsHorizontalIcon className="w-6 h-6 cursor-pointer" />}
      style={filterStyles}
      className={cn(
        "dark:bg-neutral-800 bg-white ring-1 ring-black w-48 rounded-md px-1", className
      )}
    >
      {(onClose) => (
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Typography variant="h5">Filter by zones</Typography>
          </DropdownMenuLabel>
          {zoneOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={onClose}>
              <Typography variant="span">{option.label}</Typography>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <Typography variant="h5">Filter by sex types</Typography>
          </DropdownMenuLabel>
          {sexTypeOptions.map((option) => (
            <DropdownMenuItem key={option.value} onClick={onClose}>
              <Typography variant="span">{option.label}</Typography>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default AppFilters;