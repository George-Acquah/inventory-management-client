"use client";

import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown";
import { Typography } from "../ui/typography";

type _TRadioOptions = "Option 1" | "Option 2";
const radioOptions: _TRadioOptions[] = ["Option 1", "Option 2"];
const ExampleDropdown: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] =
    useState<_TRadioOptions>("Option 1");
  const dropDownSubMenuRef = useRef<HTMLDivElement>(null);
  const position = "left";

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <DropdownMenu
        trigger={
          <DropdownMenuTrigger
            variant="link"
            size="default"
            className="px-4 py-2 shadow-md"
          >
            Options
          </DropdownMenuTrigger>
        }
        style={{
          left: position === "left" ? "-12.8rem" : undefined, // Adjust this value as needed to position it on the left
          top: position === "left" ? "100%" : undefined, // Position it below the trigger
        }}
        className="bg-white ring-1 ring-black w-56 rounded-md px-1"
      >
        {(onClose) => (
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                // Perform action here
                console.log("Profile clicked");
                onClose(); // Close the dropdown when clicked
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onClose}>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              checked={checkboxChecked}
              checkboxClassName={`font-bold ${
                checkboxChecked
                  ? "bg-neutral-600 text-white"
                  : "border-neutral-400"
              }`}
              onClick={() => setCheckboxChecked(!checkboxChecked)}
            >
              <Typography variant="span" color="default" className="ml-5">
                Enable notifications
              </Typography>
            </DropdownMenuCheckboxItem>

            <DropdownMenuLabel inset>Radio Group</DropdownMenuLabel>

            {radioOptions.map((option, idx) => (
              <DropdownMenuRadioItem
                key={idx}
                onClick={() => setSelectedRadio(option)}
                className={selectedRadio === option ? "bg-gray-100" : ""}
                radioClassName={`rounded-full h-2 w-2  ${
                  selectedRadio === option ? "bg-neutral-600" : "bg-neutral-200"
                }`}
              >
                <Typography variant="span" className="ml-5">
                  {option}
                </Typography>
              </DropdownMenuRadioItem>
            ))}

            <DropdownMenuSubTrigger
              position={position}
              style={{
                left: position === "left" ? "-49%" : "55%", // Shift the submenu to the right of the trigger
                top: "0", // Align it to the top of the trigger
              }}
              ref={dropDownSubMenuRef}
              trigger={<Typography variant="span">More options</Typography>}
            >
              <DropdownMenuSubContent
                style={{
                  left: position === "left" ? "-49%" : "55%", // Shift the submenu to the right of the trigger
                  top: "0", // Align it to the top of the trigger
                }}
                position={position}
                className="px-1"
              >
                <DropdownMenuItem onClick={onClose}>
                  <Typography variant="span">Sub Option 1</Typography>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onClose}>
                  <Typography variant="span">Sub Option 2</Typography>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSubTrigger>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onClose}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

export default ExampleDropdown;
