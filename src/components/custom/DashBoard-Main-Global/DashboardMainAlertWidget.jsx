import React, {  useState } from "react";
import {
  CloudUpload,
  DatabaseBackup,
  Flame,
  OctagonAlert,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AletsClear from "@/assets/dashboard-main-global/dashboard-main-alerts-widget-clear.gif";

const DashboardMainAlertWidget = () => {

  const categories = [
    "all",
    "Security",
    "Performance",
    "Backups",
    "Monitors",
    "Plugins",
    "Themes",
  ];

  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
  const [alerts, setAlerts] = React.useState([
    {
      id: 1,
      category: "Security",
      title: "Ready Oil",
      tag: "High Risk",
      tagColor: "text-[#DC2626]",
      tagBG: "bg-red-50",
      description: "Site is hacked with malware!",
      timestamp: "2m ago",
      button: "Resolve",
      btnColor: "text-white",
      btnBg: "!bg-[#DC2626]",
      icon: (
        <ShieldCheck
          size={24}
          strokeWidth={1}
          className="text-[#DC2626] shrink-0"
        />
      ),
      tagIcon: (
        <ShieldAlert
          size={12}
          strokeWidth={0.8}
          className="text-[#DC2626] shrink-0"
        />
      ),
    },
    {
      id: 2,
      category: "Security",
      title: "ABC Studios",
      tag: "High Risk",
      tagColor: "text-[#DC2626]",
      tagBG: "bg-red-50",
      description: "First Scan Complete. Malware found!",
      timestamp: "7m ago",
      button: "Resolve",
      btnColor: "text-white",
      btnBg: "!bg-[#DC2626]",
      icon: (
        <ShieldCheck
          size={24}
          strokeWidth={1}
          className="text-[#DC2626] shrink-0"
        />
      ),
      tagIcon: (
        <ShieldAlert
          size={12}
          strokeWidth={0.8}
          className="text-[#DC2626] shrink-0"
        />
      ),
    },
    {
      id: 3,
      category: "Backups",
      title: "GLA Accounts",
      tag: "38%",
      tagColor: "text-amber-500",
      tagBG: "bg-amber-50",
      description: "Auto-Restore incomplete; process cancelled.",
      timestamp: "50m ago",
      button: "View",
      btnColor: "text-emerald-900",
      btnBg: "!bg-zinc-100",
      btnShadow: "shadow-sm",
      icon: (
        <DatabaseBackup
          size={24}
          strokeWidth={1}
          className="text-amber-500 shrink-0"
        />
      ),
      tagIcon: (
        <TriangleAlert
          size={12}
          strokeWidth={1}
          className="text-yellow-500 shrink-0"
        />
      ),
    },
    {
      id: 4,
      category: "Security",
      title: "O2 Designs",
      tag: "High Risk",
      tagColor: "text-[#DC2626]",
      tagBG: "bg-red-50",
      description: "Firewall is off; Geo-blocking compromised",
      timestamp: "2m ago",
      button: "Turn On",
      btnColor: "text-white",
      btnBg: "!bg-[#DC2626]",
      icon: (
        <Flame size={24} strokeWidth={1} className="text-[#DC2626] shrink-0" />
      ),
      tagIcon: (
        <ShieldAlert
          size={12}
          strokeWidth={0.8}
          className="text-[#DC2626] shrink-0"
        />
      ),
    },
    {
      id: 5,
      category: "Backups",
      title: "Simply Awesome",
      tag: "High Risk",
      tagColor: "text-[#DC2626]",
      tagBG: "bg-red-50",
      description: "Daily backup creation failed",
      timestamp: "1hr ago",
      button: "Connect",
      btnColor: "text-white",
      btnBg: "!bg-[#DC2626]",
      icon: (
        <CloudUpload
          size={24}
          strokeWidth={1}
          className="text-[#DC2626] shrink-0"
        />
      ),
      tagIcon: (
        <ShieldAlert
          size={12}
          strokeWidth={0.8}
          className="text-[#DC2626] shrink-0"
        />
      ),
    },
    {
      id: 6,
      category: "Performance",
      title: "Generative BA",
      tag: "38%",
      tagColor: "text-amber-500",
      tagBG: "bg-amber-50",
      description: "SSL certificate expires in 5 days",
      timestamp: "2hr ago",
      button: "Attend",
      btnColor: "text-emerald-900",
      btnBg: "!bg-zinc-100",
      btnShadow: "shadow-sm",
      icon: (
        <DatabaseBackup
          size={24}
          strokeWidth={1}
          className="text-amber-500 shrink-0"
        />
      ),
      tagIcon: (
        <TriangleAlert
          size={12}
          strokeWidth={0.8}
          className="text-yellow-500 shrink-0"
        />
      ),
    },
    {
      id: 7,
      category: "Plugins",
      title: "Simply Awesome",
      tag: "High Risk",
      tagColor: "text-[#DC2626]",
      tagBG: "bg-red-50",
      description: "4 Plugins failed to update",
      timestamp: "2hr ago",
      button: "Resolve",
      btnColor: "text-white",
      btnBg: "!bg-[#DC2626]",
      icon: (
        <SlidersHorizontal
          size={24}
          strokeWidth={1}
          className="text-[#DC2626] shrink-0"
        />
      ),
      tagIcon: (
        <ShieldAlert
          size={12}
          strokeWidth={0.8}
          className="text-[#DC2626] shrink-0"
        />
      ),
    },
  ]);

  const [alertChangePercentage, ] = useState(() => {
    const previousAlertCount = 8; // Assuming 20 is the number of alerts 7 days ago
    return Math.round((alerts.length - previousAlertCount) / previousAlertCount * 100);
  });



  const handleRemoveAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredAlerts = alerts.filter((alert) => selectedCategory === 'all' || alert.category === selectedCategory);

  function allAlertsactive() {
    return (
      <>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border cursor-pointer text-emerald-700 text-xs !leading-[100%] font-normal !justify-center border-emerald-700 rounded-3xl py-2 px-4 bg-white shadow-[0_1px_2px_0_#0000000D] [&>svg]:!text-emerald-700 [&>svg]:!opacity-100 !min-w-[99px] !ring-0 !h-[31px]">
                <SelectValue>
                  {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="!min-w-[110px] !border !border-zinc-200 !bg-white !rounded-[6px] shadow-[0px_2px_4px_-1px_#0000000F,0px_4px_6px_-1px_#0000001A]">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&>svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&>svg]:data-[state=checked]:size-4 rounded-0 data-[state=checked]:rounded-[2px] bg-white hover:!bg-white"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex self-stretch w-[1px] bg-[#E4E4E7]"></div>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="Criticls"
                className="w-fit px-4 py-2  border h-8 border-zinc-200 text-xs leading-[100%] font-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
              >
                <Checkbox
                  id="Criticls"
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 hidden"
                />
                <span className="">12 Critical</span>
              </Label>
              <Label
                htmlFor="Warnings"
                className="w-fit px-4 py-2  border h-8 border-zinc-200 text-xs leading-[100%] font-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
              >
                <Checkbox
                  id="Warnings"
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 hidden"
                />
                <span className="">6 Warnings</span>
              </Label>
            </div>
          </div>
          <div
            key={alert.id}
            className={`flex flex-col gap-6 ${windowWidth >= 1920 ? "max-h-[392px]" : "max-h-[280px]"
              } h-full overflow-y-scroll scrollbar-hide`}
          >
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex rounded-[10px] p-2 border border-zinc-100 gap-4"
              >
                <div className="flex w-[26px] h-[26px] justify-between items-center bg-rose-50 p-[1px] rounded-[8px]">
                  {alert.icon}
                </div>
                <div className="flex flex-col grow gap-2">
                  <div className="flex flex-col gap-0">
                    <div className="flex w-full items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm leading-[100%] font-semibold text-[#18181B]">
                          {alert.title}
                        </span>
                        <span
                          className={`flex items-center gap-1 px-2 py-1 rounded-2xl text-center ${alert.tagBG} ${alert.tagColor} text-xs font-normal leading-tight cursor-default h-6`}
                        >
                          {alert.tagIcon}
                          {alert.tag}
                        </span>
                      </div>
                      <X
                        size={16}
                        strokeWidth={1}
                        className="text-[#71717A] shrink-0 cursor-pointer"
                        onClick={() => handleRemoveAlert(alert.id)}
                      />
                    </div>
                    <span className="text-xs leading-tight font-normal text-[#71717A]">
                      {alert.description}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs leading-tight font-normal text-[#71717A]">
                      {alert.timestamp}
                    </span>
                    <Button
                      className={`${alert.btnBg} ${alert.btnColor} ${alert.btnShadow} text-xs leading-1 font-normal !py-2 !px-2 gap-2 h-6 cursor-pointer rounded-[6px] `}
                    >
                      {alert.button}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function noAlertsActive() {



    return (
      <>
        <div className="flex flex-col grow items-center justify-center text-center p-2 gap-4">
          <div className="`h-[104px]` w-[162px] object-fill overflow-hidden flex items-center justify-center">
            <img
              src={AletsClear}
              alt="Manage Widget"
              className="w-full object-cover h-[104px]"
            />
          </div>
          <div className="flex flex-col items-center gap-[11px]">
            <p className="text-sm leading-[100%] font-semibold text-[#71717A]">
              No Alerts Detected
            </p>
            <p className="max-w-[274px] text-xs leading-tight font-normal text-[#71717A]">
              Your site is running smoothly without any critical issues or
              warnings.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="alerts max-w-[544px] w-full min-w-[440px] min-h-[448px] h-full max-h-[560px] flex flex-col gap-8 rounded-2xl py-8 px-6 bg-white border border-[#E4E4E7] shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <OctagonAlert
            size={24}
            strokeWidth={2}
            className="text-zinc-950 shrink-0"
          />
          <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
            Alerts
          </p>
          <span
            className={
              `inline-block px-2.5 py-0.5 rounded-[6px] text-center border text-xs font-medium leading-4 cursor-default h-5 ` +
              (alerts.length > 0
                ? "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]"
                : "border-emerald-200 bg-emerald-50 text-emerald-700")
            }
          >
            {alerts.length > 0 ? alerts.length + " Sites!" : "All Clear"}
          </span>
        </div>
        {alertChangePercentage !== 0 ?

          alertChangePercentage > 0 ?

            (<div className="flex items-center gap-[3px] w-fit">
              <TrendingUp
                size={16}
                strokeWidth={1}
                className="text-[#DC2626] !shrink-0"
              />
              <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                <span className="font-medium text-[#09090B]">+{alertChangePercentage}%</span> Last 7 days
              </p>
            </div>) : (
              <div className="flex items-center gap-[3px] w-fit">
                <TrendingDown
                  size={16}
                  strokeWidth={1}
                  className="text-emerald-500 !shrink-0"
                />
                <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                  <span className="font-medium text-[#09090B]">{alertChangePercentage}%</span> Last 7 days
                </p>
              </div>

            )
          : null


        }
      </div>
      {alerts.length > 0 ? allAlertsactive() : noAlertsActive()}
    </div>
  );
};

export default DashboardMainAlertWidget;
