import React from "react";
import TableComponent from "./tableComponent";
import { projectsData } from "@/data/dummy.data";
import { mockFetchData } from "@/lib/dataFetching";
import { deleteEntity } from "@/lib/actions";

const ProjectsTable = async ({query, currentPage, pageSize}: _ISpecificTableProps) => {
  const projects = await mockFetchData(projectsData, { query, currentPage, pageSize})

  const columns = ["title", "description", "teamMembers", "isActive"]; // Specify columns to display
  return (
    <TableComponent
      data={projects}
      columnData={columns}
      entityType="project"
      deleteAction={deleteEntity}
    />
  );
};

export default ProjectsTable;
