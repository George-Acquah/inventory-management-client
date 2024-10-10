import * as React from "react";
import { cn } from "@/utils/classes.utils";
import { THEME } from "@/utils/constants";
import { Typography } from "./typography";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

interface _ICalendarHeader extends React.HTMLAttributes<HTMLDivElement> {
  headerTitle?: string;
  headerElipses?: boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(`p-4 rounded-md ${THEME.secBg}`, className)}
      {...props}
    />
  )
);
Calendar.displayName = "Calendar";

const CalendarHeader = React.forwardRef<HTMLDivElement, _ICalendarHeader>(
  ({ className, headerTitle, headerElipses, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex justify-between items-center", className)}
      {...props}
    >
      {headerElipses && headerTitle ? (
        <>
          <Typography variant="h1" className="text-xl">
            {headerTitle}
          </Typography>
          <EllipsisHorizontalIcon className="w-8 h-8 text-primary cursor-pointer" />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  )
);
CalendarHeader.displayName = "CalendarHeader";

const CalendarTitle = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CalendarTitle.displayName = "CalendarTitle";

const CalendarDescription = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CalendarDescription.displayName = "CalendarDescription";

const CalendarContent = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
);
CalendarContent.displayName = "CalendarContent";

const CalendarFooter = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex justify-center gap-4", className)}
      {...props}
    />
  )
);
CalendarFooter.displayName = "CalendarFooter";

export {
  Calendar,
  CalendarHeader,
  CalendarFooter,
  CalendarTitle,
  CalendarDescription,
  CalendarContent,
};
