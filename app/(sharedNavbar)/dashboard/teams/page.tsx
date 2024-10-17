import { Suspense } from "react";
import { Metadata } from "next";
import SkeletonTable from "@/components/ui/skeletons";
import Pagination from "@/components/ui/pagination";
import TeamsTable from "@/components/tables/teamsTable";
import { mockFetchData } from "@/lib/dataFetching";

export const metadata: Metadata = {
  title: "Teams",
};

export default async function TeamsPage({ searchParams }: _ISearchQuery) {
  const teams = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  // Fetch only the total number of pages
  const totalPages = await mockFetchData(27, { teams, pageSize });

  // Determine if we're on the last page
  const isLastPage = currentPage === totalPages;

  const rowsToRender = isLastPage ? Math.ceil(pageSize / 2) : pageSize;
console.log(rowsToRender);

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Show skeleton while data is being fetched */}
      <Suspense
        key={teams + currentPage}
        fallback={<SkeletonTable rowsToRender={7} />}
      >
        <TeamsTable
          query={teams}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </Suspense>

      <div className="w-full max-w-full overflow-hidden">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
