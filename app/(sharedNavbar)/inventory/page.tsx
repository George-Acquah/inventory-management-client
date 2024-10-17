import InventoryActions from "@/components/inventory/inventoryActions";
import Pagination from "@/components/ui/pagination";
import { Typography } from "@/components/ui/typography";
import { mockFetchData } from "@/lib/dataFetching";
import { PlusIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const InventoryBasket = dynamic(
  () => import("@/components/inventory/inventoryBasket"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ShoppingBasket = dynamic(
  () => import("@/components/inventory/shoppingCart").then(mod => mod.ShoppingBasket),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ClearBasket = dynamic(
  () =>
    import("@/components/inventory/shoppingCart").then(
      (mod) => mod.ClearBasket
    ),
  {
    loading: () => <p>Loading...</p>
  }
);

const ItemsList = dynamic(() => import("@/components/inventory/ItemsList"), {
  loading: () => <p>Loading...</p>,
});

const InventoryPage = async ({ searchParams }: _ISearchQuery) => {
  const query = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await mockFetchData(20, { query, pageSize });
  return (
    <div className="">
      {/* Header */}
      <div className="flex gap-4 flex-col md:flex-row">
        {/* Left */}
        <div className="w-full lg:w-4/5 flex flex-col gap-8">
          {/* Items Lists */}
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4">
            <Suspense key={query + currentPage} fallback={<h1>loading</h1>}>
              <ItemsList
                query={query}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </Suspense>
          </div>

          {/* Pagination */}
          <Pagination totalPages={totalPages} />
        </div>
        {/* Right */}
        <div className="w-full lg:w-1/5 flex flex-col gap-2">
          <Typography variant="h3" className="text-center">
            Admin Actions
          </Typography>
          <InventoryActions
            type="create"
            trigger={
              <div className="bg-secondary flex gap-2 items-center justify-center dark:bg-secondary-dark text-white dark:text-black px-6 py-2 rounded-full">
                <PlusIcon className="h-4 w-4" />
                Add new item
              </div>
            }
          />
          <div className="mt-8">
            <div className="flex gap-4 justify-between items-center px-4">
              <div className="flex gap-2 items-center">
              <Typography variant="h3" className="text-center">
                Your Basket
              </Typography>
              <ShoppingBasket />
              </div>
              <ClearBasket />
            </div>
            <Suspense key={query + currentPage} fallback={<h1>loading</h1>}>
              <InventoryBasket />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
