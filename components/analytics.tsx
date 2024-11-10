import InformationCards from "./cards/infoCards";
import CountChart from "./charts/countChart";
import TeamBarChart from "./charts/teamsChart";
import { fetchAnalyticsData } from "@/lib/actions";

const Analytics = async () => {
  const { entityData, countData, topSoldItems} = await fetchAnalyticsData();

  return (
    <>
      <div className="flex gap-4 justify-between flex-wrap">
        {entityData.map((entity, idx) => (
          <InformationCards key={idx} entity={entity} />
        ))}
      </div>
      {/* Analytics */}
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 h-[450px]">
          <CountChart countData={countData}/>
        </div>
        <div className="w-full lg:w-2/3 h-[450px]">
          <TeamBarChart data={topSoldItems}/>
        </div>
      </div>
    </>
  );
}

export default Analytics;