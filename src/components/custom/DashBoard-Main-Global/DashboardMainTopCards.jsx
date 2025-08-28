import React from "react";
import DashboardMainTopCardsGreetingBar from "./DashboardMainTopCardsGreetingBar";
import DashboardMainTopCardsOverviewCards from "./DashboardMainTopCardsOverviewCards";

const   DashboardMainTopCards = () => {
  return (
    <div className="top-cards flex flex-col gap-4">
      <DashboardMainTopCardsGreetingBar />
      <DashboardMainTopCardsOverviewCards />
    </div>
  );
};

export default DashboardMainTopCards;
