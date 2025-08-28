import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Activity, CloudFog, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AdvancedMonitoringInactive from "@/assets/dashboard-main-global/dashboard-main-advanced-monitoring.gif";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomTooltip from "../CustomTooltip";
import { toShortDate } from "@/lib/utils";

const sites = [
  { Name: "Blog Website", url: "blog.example.com" },
  { Name: "Shop Website", url: "shop.example.com" },
  { Name: "Site 2", url: "site2.example.com" },
  { Name: "WordPress Dummy", url: "wordpressdummy.example.com" },
  { Name: "Site 3", url: "site3.example.com" },
  { Name: "Site 4", url: "site4.example.com" },
  { Name: "Site 5", url: "site5.example.com" },
  { Name: "Site 6", url: "site6.example.com" },
  { Name: "Site 7", url: "site7.example.com" },
];

const generateMonitoringData = (startDateISO, numDays = 7) => {
  const data = [];
  const startDate = new Date(startDateISO);

  // Pick a base number for clean backups, e.g. 5-9 per day
  let baseSiteCount = Math.floor(Math.random() * 5) + 5; // 5-9

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Add some randomness, but keep numbers near each other
    let siteUp = baseSiteCount + Math.floor(Math.random() * 3) - 1; // baseClean ±1
    siteUp = Math.max(3, siteUp); // Minimum 3

    // Slightly higher chance of fails (20-40%)
    let siteDown = Math.random() < 0.35 ? Math.floor(Math.random() * 2) + 1 : 0; // 1-2 fails, or 0
    if (siteDown > siteUp) siteDown = siteUp;
    siteUp -= siteDown;

    data.push({
      date: currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      siteUp: siteUp,
      siteDown: siteDown,
    });
  }

  return data;
};

const getStatusDot = (status) =>
  status === "success" ? (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 align-middle"
    >
      <g opacity="0.2">
        <path
          d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
          fill="#047857"
        />
      </g>
    </svg>
  ) : (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2 align-middle"
    >
      <g opacity="0.2">
        <path
          d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
          fill="#DC2626"
        />
      </g>
    </svg>
  );

function generateBackupStatusList(dayData, sites) {
  // Calculate total sites for this bar/day
  const totalSites = dayData.siteUp + dayData.siteDown;

  // Repeat the sites array as many times as needed to reach totalSites
  let repeatedSites = [];
  while (repeatedSites.length < totalSites) {
    repeatedSites = repeatedSites.concat(sites);
  }
  // Slice to the exact totalSites needed
  repeatedSites = repeatedSites.slice(0, totalSites);

  return repeatedSites.map((site, idx) => {
    // Assign status: first N are clean, rest are failed
    const status = idx < dayData.siteUp ? "success" : "failed";
    // Generate a time for demo
    const hour = String(12 + idx).padStart(2, "0");
    const min = String(51 + idx).padStart(2, "0");
    const time = `${hour}:${min}`;
    return {
      icon: getStatusDot(status),
      Name: site.Name,
      url: site.url,
      status,
      time,
    };
  });
}

const BackupStatusBars = ({ data = [] }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [filter, setFilter] = useState("total"); // "total" | "success" | "failed"

  if (!data.length) return null;

  // Find the maximum total tries across all days for scaling
  const maxTries = Math.max(
    ...data.map((day) => day.siteUp + day.siteDown)
  );

  const colors = {
    clean: "#2A9D90",
    vulnerable: "#E8C468",
    failed: "#F56F46",
  };

  const renderBar = (dayData, index) => {
    const { siteUp, siteDown } = dayData;
    const total = siteUp + siteDown;
    const height = (total / maxTries) * 48; // Scale to max height of 48px

    // Calculate percentages for gradient stops

    const failedPercent = (siteDown / total) * 100;

    // Create discrete gradient based on the segments
    let gradient = "";
    // Only two sections: siteDown (failed) and siteUp (success/clean)
    if (siteDown > 0 && siteUp > 0) {
      gradient = `linear-gradient(to top, ${colors.failed} 0%, ${colors.failed} ${failedPercent}%, ${colors.clean} ${failedPercent}%, ${colors.clean} 100%)`;
    } else if (siteDown > 0) {
      gradient = colors.failed;
    } else {
      gradient = colors.clean;
    }

    const barWidth = (66.86 - (data.length - 1) * 4) / data.length; // Total width 120px minus gaps


    return (
      <div
        key={index}
        style={{
          position: "relative",
          width: `${barWidth}px`,
          height: `${height}px`,
        }}
      >
        {/* <CustomTooltip
          content={tooltipText}
          arrowPosition="left"
          arrowOffset={1}
        >
          <div
            className="absolute inset-0 cursor-pointer transition-opacity duration-200 opacity-20 hover:opacity-100"
            style={{
              background: gradient,
              borderRadius: "1.5px",
              zIndex: 2,
              pointerEvents: "auto",
            }}
            onClick={() => setOpenPopover(index)}
          />
        </CustomTooltip> */}
        <Popover
          open={openPopover === index}
          onOpenChange={(open) => setOpenPopover(open ? index : false)}
        >
          <PopoverTrigger asChild>
            <div
              className={`absolute inset-0 cursor-pointer transition-opacity duration-200 opacity-20 hover:opacity-100 ${openPopover === index ? "opacity-100" : "opacity-20"
                }`}
              style={{
                background: gradient,
                borderRadius: "1.5px",
                zIndex: 2,
                pointerEvents: "auto",
              }}
              onClick={() => setOpenPopover(index)}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[360px] p-4 flex flex-col gap-4 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] border border-zinc-200 rounded-2xl">
            <div className="flex items-center gap-2">
              <Activity
                size={16}
                strokeWidth={1}
                className="text-zinc-950 shrink-0"
              />
              <p className="text-xs leading-tight font-medium text-black">
                Monitoring Details - <span>{toShortDate(dayData.date)}</span>
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-2">
                <Label
                  htmlFor="total"
                  className="py-1 px-2 bg-[#0478570D] cursor-pointer border border-transparent rounded-[8px] text-emerald-900 has-[[aria-checked=true]]:border-[#065F4699] has-[[aria-checked=true]]:bg-[#0478570D] has-[[aria-checked=true]]:text-emerald-900 flex flex-col gap-0.5 items-center text-center"
                >
                  <Checkbox
                    id="total"
                    checked={filter === "total"}
                    onCheckedChange={() => setFilter("total")}
                    className="hidden"
                  />
                  <div className="flex flex-col gap-0.5 items-center text-center">
                    <p className="text-lg leading-6 font-bold text-emerald-900">
                      <span>
                        {total}
                      </span>
                    </p>
                    <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                      All
                    </p>
                  </div>
                </Label>
                <Label
                  htmlFor="Successful"
                  className="py-1 px-2 bg-emerald-50 cursor-pointer border border-transparent rounded-[8px] has-[[aria-checked=true]]:border-emerald-300 has-[[aria-checked=true]]:bg-emerald-50 flex flex-col gap-0.5 items-center text-center"
                >
                  <Checkbox
                    id="Successful"
                    checked={filter === "success"}
                    onCheckedChange={() => setFilter("success")}
                    className="hidden"
                  />
                  <div className="flex flex-col gap-0.5 items-center text-center">
                    <p className="text-lg leading-6 font-bold text-emerald-600">
                      <span>{siteUp}</span>
                    </p>
                    <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                      Sites Up
                    </p>
                  </div>
                </Label>
                <Label
                  htmlFor="Failed"
                  className="py-1 px-2 bg-red-50 cursor-pointer border border-transparent rounded-[8px] has-[[aria-checked=true]]:border-rose-300 has-[[aria-checked=true]]:bg-red-50 flex flex-col gap-0.5 items-center text-center"
                >
                  <Checkbox
                    id="Failed"
                    checked={filter === "failed"}
                    onCheckedChange={() => setFilter("failed")}
                    className="hidden"
                  />
                  <div className="flex flex-col gap-0.5 items-center text-center">
                    <p className="text-lg leading-6 font-bold text-[#DC2626]">
                      <span>{siteDown}</span>
                    </p>
                    <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                      Sites Down
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex flex-col gap-4 max-h-[244px] overflow-y-scroll scrollbar-hide">
                {(() => {
                  const allItems = generateBackupStatusList(dayData, sites);
                  const filteredItems =
                    filter === "total"
                      ? allItems
                      : allItems.filter(
                        (item) =>
                          item.status === filter.replace("success", "success")
                      );

                  return filteredItems.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="flex w-fit pt-0.5">{item.icon}</div>

                        <div className="flex flex-col gap-[7px]">
                          <span
                            className={`font-medium text-sm leading-[100%] text-zinc-800`}
                          >
                            {item.Name}
                          </span>
                          <span className="text-xs leading-tight font-normal text-zinc-500">
                            {item.url}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs leading-tight font-normal text-zinc-500">
                        {item.time}
                      </span>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className="flex items-end" style={{ width: "120px", gap: "4px" }}>
      {data.map((dayData, index) => renderBar(dayData, index))}
    </div>
  );
};

const DashboardMainAdvancedMonitoring = () => {
  const [isChecked, setIsChecked] = useState(false);
  const backupData = generateMonitoringData(new Date().toISOString(), 4);
  const siteData = [
    {
      domain: "blog.example.com",
      message: "Site Down",
      timestamp: "12:35am",
      name: "Blog Website",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#DC2626"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "aurora-status.io",
      message: "SSL Certificates Expiring",
      timestamp: "12:35am",
      name: "Site 2",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#D97706"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "quantum-metrics.com",
      message: "Domain Name Expiring",
      timestamp: "1:35am",
      name: "WordPress Dummy",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#D97706"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "nova-systems.dev",
      message: "Outdated PHP Version",
      timestamp: "10:35am",
      name: "Blog Website",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#52525B"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "zenith-monitoring.net",
      message: "Site Down",
      timestamp: "11:35am",
      name: "Site 3",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#DC2626"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "blog.example.com",
      message: "Site Down",
      timestamp: "10:35am",
      name: "WordPress Dummy",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#DC2626"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "aurora-status.io",
      message: "SSL Certificates Expiring",
      timestamp: "12:35am",
      name: "Blog Website",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#D97706"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "quantum-metrics.com",
      message: "Domain Name Expiring",
      timestamp: "10:35am",
      name: "Site 4",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#D97706"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "nova-systems.dev",
      message: "Outdated PHP Version",
      timestamp: "10:35am",
      name: "WordPress Dummy",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#52525B"
            />
          </g>
        </svg>
      ),
    },
    {
      domain: "zenith-monitoring.net",
      message: "Site Down",
      timestamp: "1:35am",
      name: "Blog Website",
      time: "10m ago",
      icon: (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2">
            <path
              d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
              fill="#DC2626"
            />
          </g>
        </svg>
      ),
    },
  ];

  function activeState() {
    return (
      <>
        <div className="flex items-center justify-between pb-[3.09px] border-b border-dashed border-[#E4E4E7]">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium leading-[100%] text-emerald-700 ">
                99.8%
              </span>{" "}
              <p className="text-2xl font-medium leading-[100%] text-[#09090B]">
                Avg. Uptime
              </p>
            </div>
            <div className="flex items-center gap-[3px]">
              <TrendingUp
                size={16}
                strokeWidth={1}
                className="text-emerald-600 shrink-0"
              />
              <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                <span className="font-medium text-[#09090B]">+12%</span> from
                last 30 days
              </p>
            </div>
          </div>
          {/* graph */}
          <div className="flex w-[66.86px] h-12">
            <BackupStatusBars data={backupData} />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div className="flex flex-col gap-2 p-2 w-full max-w-[181px]">
            <span className="text-lg font-bold leading-[100%] text-emerald-700">
              36
            </span>
            <p className="text-xs font-normal leading-4 text-[#09090B]">
              Sites Up
            </p>
          </div>
          <div className="flex flex-col gap-2 p-2 w-full max-w-[181px]">
            <span className="text-lg font-bold leading-[100%] text-[#DC2626]">
              4
            </span>
            <p className="text-xs font-normal leading-4 text-[#09090B]">
              Sites Down
            </p>
          </div>
          <div className="flex flex-col gap-2 p-2 w-full max-w-[102px]">
            <span className="text-lg font-bold leading-[100%] text-[#71717A]">
              2m ago
            </span>
            <p className="text-xs font-normal leading-4 text-[#09090B]">
              Last Refreshed
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-h-72 h-full overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold leading-[100%] text-[#09090B]">
              Recent Issue
            </p>
            <div className="flex gap-2">
              <Label
                htmlFor="expiring"
                className="w-fit px-4 py-2 cursor-pointer border border-zinc-200 text-xs h-8 leading-[100%] font-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
              >
                <Checkbox
                  id="expiring"
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 hidden"
                />
                <span className="">Expiring</span>
              </Label>
              <Label
                htmlFor="Errors"
                className="w-fit px-4 py-2 cursor-pointer border h-8 border-zinc-200 text-xs leading-[100%] font-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
              >
                <Checkbox
                  id="Errors"
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 hidden"
                />
                <span className="">Errors</span>
              </Label>
            </div>
          </div>
          <div className="flex flex-col gap-4 grow overflow-y-scroll scrollbar-hide">
            {siteData.map((site, index) => (
              <div
                key={index}
                className="flex gap-4 justify-between items-start"
              >
                <div
                  className="flex gap-2 items-cen
              "
                >
                  {site.icon}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-sm font-medium leading-[100%] text-[#27272A]">
                      {site.domain}
                    </span>
                    <p className="text-xs font-normal text-zinc-400 leading-tight">
                      {site.message}
                    </p>
                  </div>
                </div>
                <p className="text-xs font-normal leading-[100%] text-[#71717A]">
                  {site.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function inActiveState() {
    return (
      <>
        <div className="flex flex-col items-center grow gap-6 p-4 text-center justify-center">
          <div className="h-[180px] w-[220px] object-fill overflow-hidden flex items-center justify-center">
            <img
              src={AdvancedMonitoringInactive}
              alt="Advanced Monitoring Inactive"
              className="w-full object-cover h-[180px]"
            />
          </div>
          <div className="flex flex-col gap-[29px] items-center">
            <p className="text-2xl font-bold leading-[100%] text-[#E4E4E7]">
              Stay One Step Ahead.
            </p>
            <div className="flex flex-col gap-[11px] items-center">
              <p className="text-sm font-semibold leading-[100%] text-[#71717A]">
                No sites have monitoring enabled.
              </p>
              <p className="w-[448px] text-xs font-normal leading-tight text-[#71717A] text-center">
                Enable Advanced Monitoring to track uptime, critical issues,
                content changes, domain & SSL status — all in one place.
              </p>
            </div>
          </div>
          <Button
            className="!w-fit !bg-emerald-900 cursor-pointer text-white !text-sm !leading-[100%] !font-medium !py-2 !px-4 gap-2 h-6 !rounded-[6px] min-h-8"
            onClick={() => setIsChecked(true)}
          >
            <Activity
              size={16}
              strokeWidth={1}
              className="text-white !shrink-0"
            />
            Enable on All Sites
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white advanced-monitoring flex flex-col pt-8 px-6 pb-6 gap-8 min-w-[544px] w-full max-w-[544px] min-h-[560px] h-full max-h-[560px] border border-[#E4E4E7] rounded-2xl shadow-[0px_1px_2px_0px_#0000000D]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity
            strokeWidth={2}
            size={24}
            className="text-zinc-950 shrink-0"
          />
          <p className="text-lg font-semibold leading-[100%] text-[#09090B]">
            Advanced Monitoring
          </p>
          <span
            className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border ${isChecked
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-500"
              } text-xs font-medium leading-normal cursor-default`}
          >
            {isChecked ? "40 Sites Monitored" : "Inactive"}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6 grow">
        {isChecked ? activeState() : inActiveState()}
      </div>
    </div>
  );
};

export default DashboardMainAdvancedMonitoring;
