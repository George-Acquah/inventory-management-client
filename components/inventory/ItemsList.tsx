import { fetchItems } from "@/lib/actions";
import dynamic from "next/dynamic";
import React from "react";

const InventoryItemsCard = dynamic(() => import("../cards/itemsCard"), {
  loading: () => <h1>loading ...</h1>,
  // ssr: false
});

const ItemsList = async ({query, currentPage, pageSize}: _ISpecificTableProps) => {
  const items = await fetchItems(query, currentPage, pageSize);
  return (
    <React.Fragment>
        {items.map((item) => (
          <InventoryItemsCard key={item._id} item={item} className="" />
        ))}
    </React.Fragment>
  );
};

export default ItemsList;
