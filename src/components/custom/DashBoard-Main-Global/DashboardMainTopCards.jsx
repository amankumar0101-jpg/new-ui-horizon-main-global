import React from "react";
import DashboardMainTopCardsGreetingBar from "./DashboardMainTopCardsGreetingBar";
import DashboardMainTopCardsOverviewCards from "./DashboardMainTopCardsOverviewCards";

const   DashboardMainTopCards = () => {
  return (
    <div className="site-summary flex flex-col gap-4">
      <DashboardMainTopCardsGreetingBar />
      <DashboardMainTopCardsOverviewCards />
    </div>
  );
};

export default DashboardMainTopCards;
