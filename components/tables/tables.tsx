import React from "react";
import TableComponent from "./tableComponent";
import { projectsData } from "@/data/dummy.data";
import { mockFetchData } from "@/lib/dataFetching";
import { deleteEntity, deleteItem, fetchItems } from "@/lib/actions";

export const InventoryTable = async ({
  query,
  currentPage,
  pageSize,
}: _ISpecificTableProps) => {
  const inventoryItems = await fetchItems(query, currentPage, pageSize);

  const columns = [
    "price",
    "lastPrice",
    "zone",
    "sexType",
    "stock",
    "addedById",
    "createdAt",
    "updatedAt",
  ];
  const specialColumns: [string, string, string] = [
    "itemImage",
    "itemName",
    "addedByName",
  ];
  return (
    <TableComponent
      data={inventoryItems}
      columnData={columns}
      specialColumns={specialColumns}
      specialFieldHeader="Item Info"
      entityType="item"
      deleteAction={deleteItem}
      customRoute="inventory"
    />
  );
};


export const TransactionsTable = async ({
  query,
  currentPage,
  pageSize,
}: _ISpecificTableProps) => {
  const projects = await mockFetchData(projectsData, {
    query,
    currentPage,
    pageSize,
  });

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