import { Suspense } from "react";
import { Metadata } from "next";
import ProjectsTable from "@/components/tables/projectsTable";
import SkeletonTable from "@/components/ui/skeletons";
import { mockFetchData } from "@/lib/dataFetching";
import Pagination from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ParkingCenterPage({ searchParams }: _ISearchQuery) {
  const center = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  const totalPages = await mockFetchData(20, { center, pageSize });

  // Determine if we're on the last page
  const isLastPage = currentPage === totalPages;

  const rowsToRender = isLastPage ? Math.ceil(pageSize / 2) : pageSize;
  console.log(rowsToRender);

  return (
    <div className="">
      {/* <div className="flex items-center justify-between">
        <h1 className={`text-2xl`}>Parking Centers</h1>
      </div> */}
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search entityType="CENTERS" placeholder="Search by Center Name" />
        <NormalAddBtn
          href={dashboardRoutes.PARKING_LOTS.ADD}
          label="Parking Center"
        />
      </div> */}
      <Suspense
        key={center + currentPage}
        fallback={<SkeletonTable rowsToRender={9}/>}
      >
        <ProjectsTable
          query={center}
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
