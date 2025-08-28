import React from "react";
import DashboardMainTopCards from "./DashboardMainTopCards";
import DashboardMainAdvancedMonitoring from "./DashboardMainAdvancedMonitoring";
import DashboardMainManageWidget from "./DashboardMainManageWidget";
import DashboardMainAccountSummaryWidget from "./DashboardMainAccountSummaryWidget";
import DashboardMainAlertWidget from "./DashboardMainAlertWidget";
import DashboardMainStagingWidget from "./DashboardMainStagingWidget";
import DashboardMainAuditLog from "./DashboardMainAuditLog";
import DashboardMainPerformanceWidget from "./DashboardMainPerformanceWidget";
import DashboardMainReportWidget from "./DashboardMainReportWidget";
import DashboardMainBackupWidget from "./DashboardMainBackupWidget";
import DashboardMainSecurityFirewallWidget from "./DashboardMainSecurityFirewallWidget";
import { Button } from "@/components/ui/button";
import "../../../pages/DashboardMainGlobal.css";
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
