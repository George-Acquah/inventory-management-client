import { Suspense } from "react";
import { Metadata } from "next";
import SkeletonTable from "@/components/ui/skeletons";
import { mockFetchData } from "@/lib/dataFetching";
import Pagination from "@/components/ui/pagination";
import { TransactionsTable } from "@/components/tables/tables";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function TransactionsPage({ searchParams }: _ISearchQuery) {
  const inventory = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await mockFetchData(20, { inventory, pageSize });

  const isLastPage = currentPage === totalPages;

  const rowsToRender = isLastPage ? Math.ceil(pageSize / 2) : pageSize;

  return (
    <div className="">
      <Suspense
        key={inventory + currentPage}
        fallback={<SkeletonTable rowsToRender={rowsToRender} />}
      >
        <TransactionsTable
          query={inventory}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Suspense>
      <div className="mt-5 w-full">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
