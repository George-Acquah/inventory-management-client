"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./button";
import { cn } from "@/utils/classes.utils";
import { useTheme } from "next-themes";

interface _ITooltip {
  items: _ITooltipItem[];
  className?: string;
}

export const AnimatedTooltip = ({
  items,
  className = "-top-16 -left-1/2 translate-x-1/2",
}: _ITooltip) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setTheme, systemTheme } = useTheme();

  // Resolve the theme if "system" is selected
  const resolvedTheme = (theme: string) =>
    theme === "system" ? systemTheme : theme;

  const renderIcon = (icon: any, name: string, themeProp?: string) => {
    const Icon = icon;
    return (
      <Button
        variant="default"
        aria-label={name}
        size="default"
        className="px-2 py-2"
      >
        <Icon
          onClick={() => setTheme(themeProp ?? "system")}
          className="object-cover !m-0 !p-0 object-top h-8 w-8 group-hover:scale-105 group-hover:z-30 relative transition duration-500"
        />
      </Button>
    );
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="-mr-4 relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}
          <div
            className={cn(
              "absolute flex text-xs w-32 flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2 transition-all duration-300 transform scale-90 opacity-0",
              hoveredIndex === item.id
                ? "scale-100 opacity-100 translate-y-0"
                : "translate-y-3",
              className
            )}
          >
            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
            <div className="font-bold text-white relative z-30 text-base">
              {item.name}
            </div>
            {item.designation && (
              <div className="text-white text-xs">{item.designation}</div>
            )}
          </div>

          {/* Render image or icon */}
          {item.image && (
            <Image
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
            />
          )}
          {item.icon &&
            renderIcon(item.icon, item.name, resolvedTheme(item.theme))}
        </div>
      ))}
    </>
  );
};
