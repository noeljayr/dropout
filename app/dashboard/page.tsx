import ClassChart from "@/components/pages/home/ClassChart";
import Overview from "@/components/pages/home/Overview";
import RecentTable from "@/components/pages/home/RecentTable";
import RiskDistribution from "@/components/pages/home/RiskDistribution";
import React from "react";

function Dashboard() {
  return (
    <div className="grid w-full pr-4 grid-rows-[auto_auto_1fr] overflow-hidden">
      <Overview />

      <div className="grid w-full grid-cols-[auto_1fr] gap-4 my-4">
        <RiskDistribution />
        <ClassChart />
      </div>

      <RecentTable />
    </div>
  );
}

export default Dashboard;
