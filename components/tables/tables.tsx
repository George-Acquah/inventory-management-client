import React from "react";
import TableComponent from "./tableComponent";
import { deleteItem, fetchItems, fetchTransactions } from "@/lib/actions";

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
  const transactions = await fetchTransactions(query, currentPage, pageSize);

  const columns = [
    "soldByName",
    "itemNames",
    "totalPrice",
    "totalQuantity",
    "createdAt",
    "updatedAt",
  ];
  return (
    <TableComponent
      data={transactions}
      columnData={columns}
      entityType="transaction"
      deleteAction={deleteItem}
    />
  );
};