import Analytics from "@/components/analytics";
import Announcements from "@/components/announcements";
import EventCalendar from "@/components/calendars/eventCalendar";
import FinanceChart from "@/components/charts/financeChart";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {/* Right */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
      {/* Buttons */}
        
        {/* DashboardPage Cards */}
        <Suspense key={'analytics-data-key'} fallback={<p>loading ...</p>}>
          <Analytics />
        </Suspense>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* Left */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default DashboardPage;
