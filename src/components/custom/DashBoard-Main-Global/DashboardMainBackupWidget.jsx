import {
  CircleAlert,
  CloudFog,
  CloudUpload,
  RefreshCcw,
  Settings2,
  Timer,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BackupFirstRun from "@/assets/dashboard-main-global/dashboard-main-backup-first-run.gif";
import BackupInactive from "@/assets/dashboard-main-global/dashboard-main-backup-inactive.gif";
import CustomTooltip from "@/components/custom/CustomTooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

const generateBackupData = (startDateISO, numDays = 7) => {
  const data = [];
  const startDate = new Date(startDateISO);

  // Pick a base number for clean backups, e.g. 5-9 per day
  let baseClean = Math.floor(Math.random() * 5) + 5; // 5-9

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Add some randomness, but keep numbers near each other
    let clean = baseClean + Math.floor(Math.random() * 3) - 1; // baseClean ±1
    clean = Math.max(3, clean); // Minimum 3

    // Slightly higher chance of fails (20-40%)
    let failed = Math.random() < 0.35 ? Math.floor(Math.random() * 2) + 1 : 0; // 1-2 fails, or 0
    if (failed > clean) failed = clean;
    clean -= failed;

    data.push({
      date: currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      clean,
      vulnerable: 0,
      failed,
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
  const totalSites = dayData.clean + dayData.failed + (dayData.vulnerable || 0);

  // Repeat the sites array as many times as needed to reach totalSites
  let repeatedSites = [];
  while (repeatedSites.length < totalSites) {
    repeatedSites = repeatedSites.concat(sites);
  }
  // Slice to the exact totalSites needed
  repeatedSites = repeatedSites.slice(0, totalSites);

  return repeatedSites.map((site, idx) => {
    // Assign status: first N are clean, rest are failed
    const status = idx < dayData.clean ? "success" : "failed";
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
    ...data.map((day) => day.clean + day.vulnerable + day.failed)
  );

  const colors = {
    clean: "#2A9D90",
    vulnerable: "#E8C468",
    failed: "#F56F46",
  };

  const renderBar = (dayData, index) => {
    const { clean, vulnerable, failed } = dayData;
    const total = clean + vulnerable + failed;
    const height = (total / maxTries) * 48; // Scale to max height of 48px

    // Calculate percentages for gradient stops
    const failedPercent = (failed / total) * 100;
    const vulnerablePercent = ((failed + vulnerable) / total) * 100;

    // Create discrete gradient based on the segments
    let gradient = "";
    if (failed > 0 && vulnerable > 0 && clean > 0) {
      gradient = `linear-gradient(to top, ${colors.failed} 0%, ${colors.failed} ${failedPercent}%, ${colors.vulnerable} ${failedPercent}%, ${colors.vulnerable} ${vulnerablePercent}%, ${colors.clean} ${vulnerablePercent}%, ${colors.clean} 100%)`;
    } else if (failed > 0 && vulnerable > 0) {
      gradient = `linear-gradient(to top, ${colors.failed} 0%, ${colors.failed} ${failedPercent}%, ${colors.vulnerable} ${failedPercent}%, ${colors.vulnerable} 100%)`;
    } else if (failed > 0 && clean > 0) {
      gradient = `linear-gradient(to top, ${colors.failed} 0%, ${colors.failed} ${failedPercent}%, ${colors.clean} ${failedPercent}%, ${colors.clean} 100%)`;
    } else if (vulnerable > 0 && clean > 0) {
      gradient = `linear-gradient(to top, ${colors.vulnerable} 0%, ${colors.vulnerable
        } ${100 - (clean / total) * 100}%, ${colors.clean} ${100 - (clean / total) * 100
        }%, ${colors.clean} 100%)`;
    } else if (failed > 0) {
      gradient = colors.failed;
    } else if (vulnerable > 0) {
      gradient = colors.vulnerable;
    } else {
      gradient = colors.clean;
    }

    const barWidth = (120 - (data.length - 1) * 4) / data.length; // Total width 120px minus gaps
    const tooltipText = `${dayData.date}
${clean ? `${clean} Clean` : ""}
${vulnerable ? `${vulnerable} Vulnerable` : ""}
${failed ? `${failed} Failed` : ""}`;

    return (
      <Popover
        open={openPopover === index}
        onOpenChange={(open) => setOpenPopover(open ? index : false)}
      >

        <PopoverTrigger asChild>
          <div
            className="cursor-pointer transition-opacity duration-200 opacity-20 hover:opacity-100"
            style={{
              width: `${barWidth}px`,
              height: `${height}px`,
              background: gradient,
              borderRadius: '1.5px'
            }}
          >
            <CustomTooltip content={tooltipText} arrowPosition="left" arrowOffset={6} asChild>
              {/* The tooltip wraps the bar, but asChild lets it pass the ref */}
              <span style={{ display: "block", width: "100%", height: "100%" }} />
            </CustomTooltip>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[360px] p-4 flex flex-col gap-4 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] border border-zinc-200 rounded-2xl">
          <div className="flex items-center gap-2">
            <CloudFog
              size={16}
              strokeWidth={1}
              className="text-zinc-950 shrink-0"
            />
            <p className="text-xs leading-tight font-medium text-black">
              Backup Details - <span>{toShortDate(dayData.date)}</span>
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
                      {dayData.clean +
                        dayData.failed +
                        (dayData.vulnerable || 0)}
                    </span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    Total
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
                    <span>{dayData.clean}</span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    Successful
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
                    <span>{dayData.failed}</span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    Failed
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
      </Popover >
    );
  };

  return (
    <div className="flex items-end" style={{ width: "120px", gap: "4px" }}>
      {data.map((dayData, index) => renderBar(dayData, index))}
    </div>
  );
};

const DashboardMainBackupWidget = () => {
  // Possible states: "inactive", "active", "off", "firstRun", "issues"
  const [status, setStatus] = useState("inactive");
  const backupData = generateBackupData(new Date().toISOString());

  function getTimeAgo(timeString) {
    // Accepts "13:51", "01:51 PM", or "01:51 AM"
    if (!timeString) return "";

    let hour = 0,
      min = 0;
    let isPM = false;

    // Check for AM/PM
    if (
      timeString.toLowerCase().includes("am") ||
      timeString.toLowerCase().includes("pm")
    ) {
      const [hm, ampm] = timeString.split(" ");
      [hour, min] = hm.split(":").map(Number);
      isPM = ampm.toLowerCase() === "pm";
      if (isPM && hour < 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;
    } else {
      [hour, min] = timeString.split(":").map(Number);
    }

    const now = new Date();
    const itemDate = new Date(now);
    itemDate.setHours(hour);
    itemDate.setMinutes(min);
    itemDate.setSeconds(0);

    let diff = Math.floor((now - itemDate) / 1000); // in seconds
    if (diff < 0) diff += 24 * 3600; // handle times from earlier today

    if (isNaN(diff)) return ""; // fallback for invalid times

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  }


  // Collect all failed items from all days in the graph
  const allFailedItems = backupData.flatMap((dayData) =>
    generateBackupStatusList(dayData, sites)
      .filter((item) => item.status === "failed")
      .map((item) => ({
        ...item,
        date: dayData.date, // Optionally add the date for grouping/display
      }))
  );

  function inactiveState() {
    return (
      <>
        <div className="flex flex-col grow justify-between items-center text-center">
          <div className="flex flex-col justify-center items-center gap-6 grow text-center">
            <div className="h-[96px] w-[123px] object-fill overflow-hidden flex items-center justify-center">
              <img
                src={BackupInactive}
                alt="Backup Inactive"
                className="w-full object-cover h-[96px]"
              />
            </div>
            <div className="flex flex-col gap-8 items-center">
              <div className="flex flex-col gap-[11px] items-center text-[#71717A]">
                <p className="text-sm leading-[100%] font-semibold">
                  Backups are turned off on all sites.
                </p>
                <p className="text-xs leading-tight font-normal">
                  Your sites are not protected. Enable backups to secure your content.
                </p>
              </div>
              <div className="flex flex-col items-center text-left py-1 px-4 rounded-[12px] bg-zinc-50">
                <ul className="flex flex-col gap-2 list-none [&>li]:relative [&>li]:pl-[14px] [&>li]:before:absolute [&>li]:before:top-1/2 [&>li]:before:left-[0px] [&>li]:before:h-[6px] [&>li]:before:w-[6px] [&>li]:before:-translate-y-1/2 [&>li]:before:rounded-full [&>li]:before:bg-zinc-300 [&>li]:before:content-[''] text-xs font-normal leading-tight !text-left text-[#71717A]">
                  <li>Never lose data during updates</li>
                  <li>Instant recovery from hacks or crashes</li>
                  <li>Set it once - and forget it</li>
                </ul>
              </div>
            </div>
            <Button
            className="!bg-emerald-900 text-white text-[14px] leading-tight font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer"
            onClick={() => setStatus("firstRun")}
          >
            <Settings2
              size={16}
              strokeWidth={1}
              className="text-white shrink-0"
            />
            Enable All Backups
          </Button>
          </div>
          
        </div>
      </>
    );
  }

  function firstRun() {
    return (
      <>
        <div className="flex flex-col grow justify-between">
          <div className="flex flex-col  gap-8">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 justify-between">
              <div className="flex flex-col gap-2 p-2">
                <p className="text-lg leading-[100%] font-bold text-emerald-700">
                  <span>34</span> sites
                </p>
                <p className="text-xs leading-tight font-normal text-[#09090B]">
                  Enabled
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <p className="text-lg leading-[100%] font-bold text-[#71717A]">
                  <span>0</span> sites
                </p>
                <p className="text-xs leading-tight font-normal text-[#09090B]">
                  Disabled
                </p>
              </div>
              <div className="flex flex-col w-fit gap-2 p-2">
                <p className="text-lg leading-[100%] font-bold text-[#71717A]">
                  <span>0</span> MB
                </p>
                <p className="text-xs leading-tight font-normal text-[#09090B]">
                  Avg Site Size
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 px-4 grow justify-center items-center text-center">
            <div className="h-[153px] w-[196px] object-fill overflow-hidden flex items-center justify-center">
              <img
                src={BackupFirstRun}
                alt="Backup First Run"
                className="w-full object-cover h-[153px]"
              />
            </div>
            <div className="flex flex-col gap-[11px] items-center text-[#71717A]">
              <p className="text-sm leading-[100%] font-semibold">
                Backup Setup Complete - First Run Pending
              </p>
              <p className="text-xs leading-tight font-normal">
                Your backup system is ready! <br />
                The first automatic backup will run shortly to start protecting
                your sites.
              </p>
            </div>
            <Button
            className=" !bg-emerald-900 text-white text-[14px] leading-tight font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer"
            onClick={() => setStatus("active")}
          >
            <RefreshCcw
              size={16}
              strokeWidth={1}
              className="text-white shrink-0"
            />
            Run Backup Now
          </Button>
          </div>
          
        </div>
      </>
    );
  }

  function activeState() {
    return (
      <>
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-4 justify-between">
              <div className="flex flex-col gap-2 p-2">
                <p
                  className={`text-lg leading-[100%] font-bold ${status === "off" ? "text-[#71717A]" : "text-emerald-700"
                    }`}
                >
                  <span>{status === "off" ? "0" : "34"}</span> sites
                </p>
                <p className="text-xs leading-tight font-normal text-[#09090B]">
                  Enabled
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2">
                <p
                  className={`text-lg leading-[100%] font-bold ${status === "off" || status === "issues"
                    ? "text-[#DC2626]"
                    : "text-[#71717A]"
                    }`}
                >
                  <span>
                    {status === "off" || status === "issues" ? "5" : "0"}
                  </span>{" "}
                  sites
                </p>
                <p className="text-xs leading-tight font-normal text-[#09090B]">
                  Disabled
                </p>
              </div>
              <div className="flex flex-col w-fit gap-2 p-2">
                <p className="text-lg leading-[100%] font-bold text-[#71717A]">
                  <span>192</span> MB
                </p>
                <p className="text-xs leading-tight font-normal text-[#09090B]">
                  Avg Site Size
                </p>
              </div>
            </div>
            {status === "off" ? null : (
              <div className="flex flex-col gap-1">
                <div className="flex items-end pb-[3.1px] justify-between border-b border-dashed border-[#E4E4E7]">
                  <div className="flex flex-col gap-2 py-1 self-end">
                    <div className="flex gap-2">
                      <span className="text-2xl leading-[100%] font-medium text-emerald-700">
                        238
                      </span>
                      <p className="text-2xl leading-[100%] font-medium text-[#09090B]">
                        Total Backups
                      </p>
                    </div>
                    <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                      <span className="font-medium text-[#09090B]">93%</span>{" "}
                      success rate since last 7 days
                    </p>
                  </div>
                  <div className="flex min-w-[120px] w-full max-w-[120px] min-h-12 h-full max-h-12">
                    <BackupStatusBars data={backupData} />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-6">
                  <div className="flex items-center gap-1">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.2">
                        <path
                          d="M6 2C9.6 2 10.5 2.9 10.5 6.5C10.5 10.1 9.6 11 6 11C2.4 11 1.5 10.1 1.5 6.5C1.5 2.9 2.4 2 6 2Z"
                          fill="#2A9D90"
                        />
                      </g>
                    </svg>
                    <p className="text-xs leading-tight font-normal text-[#09090B]">
                      <span>238</span> Successful
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.2">
                        <path
                          d="M6 2C9.6 2 10.5 2.9 10.5 6.5C10.5 10.1 9.6 11 6 11C2.4 11 1.5 10.1 1.5 6.5C1.5 2.9 2.4 2 6 2Z"
                          fill="#E76E50"
                        />
                      </g>
                    </svg>
                    <p className="text-xs leading-tight font-normal text-[#09090B]">
                      <span>0</span> Failed
                    </p>
                  </div>
                </div>
              </div>
            )}
            {status === "off" ? null : (
              <div className="flex flex-col p-2 gap-4 border border-zinc-100 rounded-[8px]">
                <div className="flex items-center gap-2">
                  <Timer
                    size={16}
                    strokeWidth={1}
                    className="text-[#09090B] shrink-0"
                  />
                  <p className="text-sm leading-[100%] font-semibold text-[#09090B]">
                    Real-Time Updates
                  </p>
                </div>
                <div className="flex items-center pl-6 justify-between gap-0.5">
                  <div className="flex items-center gap-2 w-fit">
                    <span className="text-base leading-6 font-bold text-[#09090B]">
                      16
                    </span>
                    <span
                      className={`px-2 py-1 bg-sky-50 rounded-2xl text-center text-sky-600 text-xs font-normal leading-[100%] cursor-default h-[23px] flex items-center justify-center`}
                    >
                      Sites
                    </span>
                  </div>
                  <div className="flex items-center gap-2 w-fit">
                    <span className="text-base leading-6 font-bold text-[#09090B]">
                      45
                    </span>
                    <span
                      className={`px-2 py-1 bg-emerald-50 rounded-2xl text-center text-emerald-700 text-xs font-normal leading-[100%] cursor-default h-[23px] flex items-center justify-center`}
                    >
                      New Events
                    </span>
                  </div>
                  <div className="flex items-center gap-2 w-fit">
                    <span className="text-base leading-6 font-bold text-[#09090B]">
                      32
                    </span>
                    <span
                      className={`px-2 py-1 bg-zinc-50 rounded-2xl text-center text-zinc-600 text-xs font-normal leading-[100%] cursor-default h-[23px] flex items-center justify-center`}
                    >
                      Updated Events
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-[17px] font-semibold text-[#09090B]">
              Recent Issues
            </p>
            {status === "active" && (
              <p className="text-sm leading-[17px] font-medium text-zinc-600">
                No recent issues detected.
              </p>
            )}
            {(status === "off" || status === "active") && (
              <div className="flex p-[1px] bg-[linear-gradient(91.6deg,_#FAFAFA_0.39%,_#ECFDF5_100.45%)] rounded-[6px]">
                <div className="flex grow gap-4  rounded-[5px] py-2 px-4" style={{
                  background: status === "off" ? "linear-gradient(91.23deg, #FEF2F2 -7.05%, #FFFFFF 14.71%, #FFFFFF 70.25%, #FEF2F2 112.05%)" : "linear-gradient(91.23deg, #ECFDF5 -7.05%, #FFFFFF 14.71%, #FFFFFF 70.25%, #ECFDF5 112.05%)"
                }}>
                  {status === "off" ? (
                    <CircleAlert
                      size={24}
                      strokeWidth={2}
                      className="text-[#DC2626] shrink-0"
                    />
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
                        fill="#047857"
                      />
                      <path
                        d="M15 6.66699L8.125 13.3337L5 10.3034"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={`text-sm leading-[17px] font-semibold ${status === "off" ? "text-[#DC2626]" : "text-emerald-700"
                        }`}
                    >
                      {status === "off"
                        ? "All Backups are Disabled"
                        : "All Backups Running Smoothly"}
                    </span>
                    <span className="text-xs leading-tight font-normal text-zinc-800">
                      {status === "off"
                        ? "Your sites are not protected. Enable backups to secure your content.."
                        : "All 34 sites are backed up successfully in the last 7 days."}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {status === "active" ? null : (
              <div className="flex flex-col min-h-0">
                <div className="flex flex-col space-y-4 max-h-[192px] overflow-y-auto scrollbar-hide" style={{
                  paddingBottom: allFailedItems.length > 2 ? '36px' : '0px'
                }}>
                  {allFailedItems.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="flex w-fit pt-0.5">{item.icon}</div>
                        <div className="flex flex-col gap-[7px]">
                          <span className="font-medium text-sm leading-[100%] text-zinc-800">
                            {item.url}
                          </span>
                          <span className="text-xs leading-tight font-normal text-zinc-500">
                            Backups Disabled
                          </span>
                        </div>
                      </div>
                      <span className="text-xs leading-tight font-normal text-zinc-500">
                        {getTimeAgo(item.time)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {status === "off" && (
          <Button
            className="self-end !bg-zinc-100 text-emerald-900 text-[14px] leading-tight font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer"
            onClick={() => setStatus("active")}
          >
            <Settings2
              size={16}
              strokeWidth={1}
              className="text-emerald-900 shrink-0"
            />
            Enable All Backups
          </Button>
        )}
      </>
    );
  }

  function activated() {
    return (
      <>
        <div className="flex flex-col gap-[30px] justify-between grow  overflow-y-hidden">
          {status === "firstRun" ? firstRun() : activeState()}
        </div>
      </>
    );
  }

  return (
    <div className="backups bg-white border border-b-0 border-[#E4E4E7] p-6 rounded-2xl max-w-[544px] w-full min-w-[544px] max-h-[560px] h-full min-h-[560px] flex flex-col gap-8 shadow-[0_1px_2px_0px_#0000000D]">
      <div className="flex items-center gap-2">
        <CloudUpload
          size={24}
          strokeWidth={2}
          className="text-[#18181B] shrink-0"
        />
        <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
          Backups
        </p>
        <span
          className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center ${status === "inactive" || status === "off"
            ? "border border-red-200 bg-[#FEF2F2] text-[#DC2626]"
            : status === "issues"
              ? "border border-amber-200 bg-amber-50 text-amber-600"
              : "border border-emerald-200 bg-emerald-50 text-emerald-700"
            } text-xs font-medium  cursor-default h-5`}
        >
          {status === "inactive" || status === "off"
            ? "All Disabled"
            : status === "firstRun"
              ? "First Run Due!"
              : status === "issues"
                ? "3 Sites needs Attention"
                : "All Good!"}
        </span>
      </div>
      {status === "inactive" ? inactiveState() : activated()}
    </div>
  );
};

export default DashboardMainBackupWidget;
