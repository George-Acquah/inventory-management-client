import React from "react";
import TableComponent from "./tableComponent"; // Import the reusable TableComponent
import { mockFetchData } from "@/lib/dataFetching";
import { teamsData } from "@/data/dummy.data";
import { deleteEntity } from "@/lib/actions";

const TeamsTable = async ({
  query,
  currentPage,
  pageSize,
}: _ISpecificTableProps) => {
  const teams = await mockFetchData(teamsData, {
    query,
    currentPage,
    pageSize,
  });

  const columns = ["projects", "isActive"]; // Normal columns
  const specialColumns: [string, string, string] = ["image", "name", "email"]; // Special columns

  return (
    <TableComponent
      data={teams}
      columnData={columns}
      entityType="team"
      deleteAction={deleteEntity}
      specialColumns={specialColumns} // Special columns passed here
      specialFieldHeader="Team Details" // Custom header for the special column
    />
  );
};

export default TeamsTable;
