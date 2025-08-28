import React from "react";
import DashboardMainTopCards from "@/components/custom/DashBoard-Main-Global/DashboardMainTopCards";
import DashboardMainAdvancedMonitoring from "@/components/custom/DashBoard-Main-Global/DashboardMainAdvancedMonitoring";
import DashboardMainManageWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainManageWidget";
import DashboardMainAccountSummaryWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainAccountSummaryWidget";
import DashboardMainAlertWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainAlertWidget";
import DashboardMainStagingWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainStagingWidget";
import DashboardMainAuditLog from "@/components/custom/DashBoard-Main-Global/DashboardMainAuditLog";
import DashboardMainPerformanceWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainPerformanceWidget";
import DashboardMainReportWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainReportWidget";
import DashboardMainBackupWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainBackupWidget";
import DashboardMainSecurityFirewallWidget from "@/components/custom/DashBoard-Main-Global/DashboardMainSecurityFirewallWidget";
import { Button } from "@/components/ui/button";
import "./DashboardMainGlobal.css";
//
const DashboardMainGlobal = () => {
  // return (
  //     <div className="flex flex-col gap-6 pt-4 pl-4 pr-6 pb-10">
  //       <DashboardMainTopCards />
  //       <div className="flex flex-wrap gap-6 pb-4">
  //         <DashboardMainAccountSummaryWidget />
  //         <DashboardMainAlertWidget />
  //         <DashboardMainManageWidget />
  //         <DashboardMainStagingWidget />
  //         <DashboardMainBackupWidget />
  //         <DashboardMainPerformanceWidget />
  //         <DashboardMainAuditLog />
  //         <DashboardMainReportWidget />
  //         <DashboardMainAdvancedMonitoring />
  //         <DashboardMainSecurityFirewallWidget />
  //       </div>
  //     </div>
  //   );

  const TopCards = <DashboardMainTopCards />;
  const accountSummary = <DashboardMainAccountSummaryWidget />;
  const alerts = <DashboardMainAlertWidget />;
  const manageUpdates = <DashboardMainManageWidget />;
  const staging = <DashboardMainStagingWidget />;
  const backupWidget = <DashboardMainBackupWidget />;
  const performance = <DashboardMainPerformanceWidget />;
  const securityFirewall = <DashboardMainSecurityFirewallWidget />;
  const reports = <DashboardMainReportWidget />;
  const activityLog = <DashboardMainAuditLog />;
  const advancedMonitoring = <DashboardMainAdvancedMonitoring />;

  return (
    <>


      <div className="dashboard-container p-4 pr-6 pb-14 bg-zinc-100 min-h-screen">
        {TopCards}
        {accountSummary}
        {alerts}
        {manageUpdates}
        {staging}
        {backupWidget}
        {performance}
        {securityFirewall}
        {reports}
        {activityLog}
        {advancedMonitoring}
      </div>
    </>
  );
};
// );

export default DashboardMainGlobal;
