import * as React from "react";
import { cn } from "@/utils/classes.utils";
import { THEME } from "@/utils/constants";
import { Typography } from "./typography";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

interface _IChartHeader extends React.HTMLAttributes<HTMLDivElement> {
  headerTitle?: string;
  headerElipses?: boolean;
}

const Chart = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(`rounded-xl w-full h-full p-4 ${THEME.secBg}`, className)}
      {...props}
    />
  )
);
Chart.displayName = "Chart";

const ChartHeader = React.forwardRef<HTMLDivElement, _IChartHeader>(
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
ChartHeader.displayName = "ChartHeader";

const ChartTitle = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
ChartTitle.displayName = "ChartTitle";

const ChartDescription = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
ChartDescription.displayName = "ChartDescription";

const ChartContent = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full h-[75%]", className)}
      {...props}
    />
  )
);
ChartContent.displayName = "ChartContent";

const ChartFooter = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex justify-center gap-4", className)}
      {...props}
    />
  )
);
ChartFooter.displayName = "ChartFooter";

export {
  Chart,
  ChartHeader,
  ChartFooter,
  ChartTitle,
  ChartDescription,
  ChartContent,
};
