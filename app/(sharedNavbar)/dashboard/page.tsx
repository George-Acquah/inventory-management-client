import Announcements from "@/components/announcements";
import EventCalendar from "@/components/calendars/eventCalendar";
import InformationCards from "@/components/cards/infoCards";
import CountChart from "@/components/charts/countChart";
import FinanceChart from "@/components/charts/financeChart";
import TeamBarChart from "@/components/charts/teamsChart";
import { entityData } from "@/data/root.data";

const DashboardPage = ({ searchParams }: _ISearchQuery) => {
  const user = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.size) || 5;

  console.log(user, currentPage, pageSize);
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {/* Right */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* DashboardPage Cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          {entityData.map((entity, idx) => (
            <InformationCards key={idx} entity={entity} />
          ))}
        </div>
        {/* Analytics */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <TeamBarChart />
          </div>
        </div>
        {/* Bottom Finance */}
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
