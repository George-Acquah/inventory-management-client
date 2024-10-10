import React from "react";
import { THEME } from "@/utils/constants/index"; // Import your theme

interface SkeletonProps {
  rowsToRender: number// The original page size for normal pages
}

const SkeletonTable: React.FC<SkeletonProps> = ({ rowsToRender }) => {
  // Render an array of skeleton rows based on the numRows prop
  const skeletonRows = Array.from({ length: rowsToRender }, (_, rowIndex) => (
    <div
      key={`skeleton-row-${rowIndex}`}
      className={`flex gap-4 items-center p-2 ${THEME.secBg} rounded`}
    >
      {/* Each "cell" will take the full width */}
      <div className="h-10 w-full bg-neutral-300 dark:bg-neutral-700 rounded animate-pulse" />
    </div>
  ));

  return (
    <div className={`w-full ${THEME.mainBg} p-4 rounded-lg`}>
      {skeletonRows}
    </div>
  );
};

export default SkeletonTable;
