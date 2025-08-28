import {
  CloudFog,
  FileChartColumnIncreasing,
  OctagonAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PerformanceEmpty from "@/assets/dashboard-main-global/dashboard-main-performance-empty.gif";
import CustomTooltip from "../CustomTooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toShortDate } from "@/lib/utils";

// const sites = [
//   { Name: "Blog Website", url: "blog.example.com" },
//   { Name: "Shop Website", url: "shop.example.com" },
//   { Name: "Site 2", url: "site2.example.com" },
//   { Name: "WordPress Dummy", url: "wordpressdummy.example.com" },
//   { Name: "Site 3", url: "site3.example.com" },
//   { Name: "Site 4", url: "site4.example.com" },
//   { Name: "Site 5", url: "site5.example.com" },
//   { Name: "Site 6", url: "site6.example.com" },
//   { Name: "Site 7", url: "site7.example.com" },
// ];

const generateSitePerformanceData = (date) => {

  const siteCount = Math.floor(Math.random() * 40 + 3)

  let prevTime = 102; // Including time for the 3 main websites
  let remainingTime = () => 60 * 24 - prevTime
  const getNewTime = function (current) {
    const randomAmountOfTimeBasedOnRemaining = Math.ceil(Math.random() * remainingTime() / (siteCount - 3 - current))
    prevTime += randomAmountOfTimeBasedOnRemaining
    // Convert prev time to 00:00 and onwards
    // Hour
    let hour = Math.floor(prevTime / 60)
    const isPM = hour >= 12
    hour = isPM ? hour - 12 : hour
    hour = hour < 10 ? '0' + hour : hour

    let min = prevTime % 60
    min = min < 10 ? '0' + min : min

    return `${hour}:${min} ${!isPM ? "AM" : "PM"}`
  }
  const sites = [
    { Name: "Blog Website", url: "blog.example.com", performanceScore: 95, time: "12:51 AM" },
    { Name: "Shop Website", url: "shop.example.com", performanceScore: 68, time: "01:20 AM" },
    { Name: "WordPress Dummy", url: "wordpressdummy.example.com", performanceScore: 74, time: "01:42 AM" },
    ...(new Array(siteCount - 3).fill({}).map((val, index) => ({
      Name: "Site" + (index + 1), url: `site${index + 1}.example.com`, performanceScore: Math.ceil(Math.random() * 66 + 30),
      time: getNewTime(index)
    })))
  ]

  return {
    date,
    sites
  }

}

const BUCKETS = [
  { key: "0-49", label: "0-49", color: "#34D399" },
  { key: "50-69", label: "50-69", color: "#059669" },
  { key: "70-89", label: "70-89", color: "#065F46" },
  { key: "90-100", label: "90-100", color: "#022C22" },
];




function getBarColor(score) {
  if (score >= 90) return "#022C22";
  if (score >= 70) return "#065F46";
  if (score >= 50) return "#059669";
  return "#34D399";
}

const BackupStatusBars = ({ data = [] }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [filter, setFilter] = useState("0-49"); // "total" | "success" | "failed"





  if (!data.sites.length) return null;

  const buckets = {
    "0-49": { label: "0-49", color: "#34D399", count: data.sites.filter((site) => site.performanceScore < 50).length },
    "50-69": { label: "50-69", color: "#059669", count: data.sites.filter((site) => site.performanceScore >= 50 && site.performanceScore < 70).length },
    "70-89": { label: "70-89", color: "#065F46", count: data.sites.filter((site) => site.performanceScore >= 70 && site.performanceScore < 90).length },
    "90-100": { label: "90-100", color: "#022C22", count: data.sites.filter((site) => site.performanceScore >= 90).length },
  }

  const maxCount = Math.max(buckets["0-49"].count, buckets["50-69"].count, buckets["70-89"].count, buckets["90-100"].count)




  const renderBar = (group, index) => {

    const height = (group.count / maxCount) * 48; // Scale to max height of 48px

    console.log(height, group.count)

    // Create discrete gradient based on the segments
    // let gradient = "";
    // if (failed > 0 && vulnerable > 0 && clean > 0) {
    //   gradient = `linear-gradient(to top, ${colors.failed} 0%, ${colors.failed} ${failedPercent}%, ${colors.vulnerable} ${failedPercent}%, ${colors.vulnerable} ${vulnerablePercent}%, ${colors.clean} ${vulnerablePercent}%, ${colors.clean} 100%)`;
    // } else if (failed > 0 && vulnerable > 0) {
    //   gradient = `linear-gradient(to top, ${colors.failed} 0%, ${colors.failed} ${failedPercent}%, ${colors.vulnerable} ${failedPercent}%, ${colors.vulnerable} 100%)`;
    // } else if (failed > 0 && clean > 0) {
    //   gradient = `linear-gradient(to top, ${colors.failed} 0%, ${colors.failed} ${failedPercent}%, ${colors.clean} ${failedPercent}%, ${colors.clean} 100%)`;
    // } else if (vulnerable > 0 && clean > 0) {
    //   gradient = `linear-gradient(to top, ${colors.vulnerable} 0%, ${
    //     colors.vulnerable
    //   } ${100 - (clean / total) * 100}%, ${colors.clean} ${
    //     100 - (clean / total) * 100
    //   }%, ${colors.clean} 100%)`;
    // } else if (failed > 0) {
    //   gradient = colors.failed;
    // } else if (vulnerable > 0) {
    //   gradient = colors.vulnerable;
    // } else {
    //   gradient = colors.clean;
    // }


    const barColor = group.color


    console.log(filter)
    const barWidth = (100 - (4 - 1) * 4) / 4; // Total width 120px minus gaps
    const tooltipText = `Score: ${group.label}
${group.count} sites`


    return (
      <Popover
        open={openPopover === index}
        onOpenChange={(open) => setOpenPopover(open ? index : false)}
      >
        <PopoverTrigger asChild>
          <div
            key={index}
            className="cursor-pointer transition-opacity duration-200 "
            style={{
              position: "relative",
              width: `${barWidth}px`,
              height: `${height}px`,
              background: barColor,
              borderRadius: "1.5px",
            }}
          >
            <CustomTooltip content={tooltipText} arrowPosition="left" arrowOffset={-5} arrowHeight={10} asChild>
              {/* The tooltip wraps the bar, but asChild lets it pass the ref */}
              <span style={{ display: "block", width: "100%", height: "100%" }} />
            </CustomTooltip>
          </div>
        </PopoverTrigger>

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


        <PopoverContent align="end" className="w-[360px] p-4 flex flex-col gap-4 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] border border-zinc-200 rounded-2xl">
          <div className="flex items-center gap-2">
            <FileChartColumnIncreasing
              size={16}
              strokeWidth={1}
              className="text-zinc-950 shrink-0"
            />
            <p className="text-xs leading-tight font-medium text-black">
              Performance Details - <span>{toShortDate(data.date)}</span>
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-4 gap-2">
              <Label
                htmlFor="0-49"
                className="py-1 px-2 bg-emerald-50 cursor-pointer border border-transparent rounded-[8px] text-emerald-900 has-[[aria-checked=true]]:border-[#065F4699]  has-[[aria-checked=true]]:text-emerald-900 flex flex-col gap-0.5 items-center text-center"
              >
                <Checkbox
                  id="0-49"
                  checked={filter === "0-49"}
                  onCheckedChange={() => setFilter("0-49")}
                  className="hidden"
                />
                <div className="flex flex-col gap-0.5 items-center text-center">
                  <p className="text-lg leading-6 font-bold" style={{
                    color: buckets['0-49'].color
                  }}>
                    <span>
                      {buckets['0-49'].count}
                    </span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    {buckets['0-49'].label}
                  </p>
                </div>
              </Label>
              <Label
                htmlFor="50-69"
                className="py-1 px-2 bg-emerald-50 cursor-pointer border border-transparent rounded-[8px] has-[[aria-checked=true]]:border-[#065F4699]  flex flex-col gap-0.5 items-center text-center"
              >
                <Checkbox
                  id="50-69"
                  checked={filter === "50-69"}
                  onCheckedChange={() => setFilter("50-69")}
                  className="hidden"
                />
                <div className="flex flex-col gap-0.5 items-center text-center">
                  <p className="text-lg leading-6 font-bold" style={{
                    color: buckets['50-69'].color
                  }}>
                    <span>
                      {buckets['50-69'].count}
                    </span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    {buckets['50-69'].label}
                  </p>
                </div>
              </Label>
              <Label
                htmlFor="70-89"
                className="py-1 px-2 bg-emerald-50 cursor-pointer border border-transparent rounded-[8px] has-[[aria-checked=true]]:border-[#065F4699] flex flex-col gap-0.5 items-center text-center"
              >
                <Checkbox
                  id="70-89"
                  checked={filter === "70-89"}
                  onCheckedChange={() => setFilter("70-89")}
                  className="hidden"
                />
                <div className="flex flex-col gap-0.5 items-center text-center">
                  <p className="text-lg leading-6 font-bold" style={{
                    color: buckets['70-89'].color
                  }}>
                    <span>
                      {buckets['70-89'].count}
                    </span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    {buckets['70-89'].label}
                  </p>
                </div>
              </Label>
              <Label
                htmlFor="90-100"
                className="py-1 px-2 bg-emerald-50 cursor-pointer border border-transparent rounded-[8px] has-[[aria-checked=true]]:border-[#065F4699]  flex flex-col gap-0.5 items-center text-center"
              >
                <Checkbox
                  id="90-100"
                  checked={filter === "90-100"}
                  onCheckedChange={() => setFilter("90-100")}
                  className="hidden"
                />
                <div className="flex flex-col gap-0.5 items-center text-center">
                  <p className=" leading-6 font-bold" style={{
                    color: buckets['90-100'].color
                  }}>
                    <span>
                      {buckets['90-100'].count}
                    </span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    {buckets['90-100'].label}
                  </p>
                </div>
              </Label>
            </div>
            <div className="flex flex-col gap-4 max-h-[244px] overflow-y-scroll scrollbar-hide">

              {data.sites.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className="flex w-fit pt-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 align-middle"
                      >
                        <g opacity="">
                          <path
                            d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
                            fill={getBarColor(item.performanceScore)}
                          />
                        </g>
                      </svg>
                    </div>

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
              ))
              }
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="flex items-end" style={{ width: "100px", gap: "4px" }}>
      {renderBar(buckets["0-49"], 0)}
      {renderBar(buckets["50-69"], 1)}
      {renderBar(buckets["70-89"], 2)}
      {renderBar(buckets["90-100"], 3)}

    </div>
  );
};

const DashboardMainPerformanceWidget = () => {
  // Possible states: "inactive", "active", "error", "hacked"
  const [status, setStatus] = useState("inactive");
  const performanceData = generateSitePerformanceData(new Date().toISOString())

  const allActivity = [
    {
      id: 1,
      name: "blog.example.com",
      score: 90,
      trend: 27,
      timestamp: "10m ago",
    },
    {
      id: 2,
      name: "shop.example.com",
      score: 85,
      trend: 15,
      timestamp: "20m ago",
    },
    {
      id: 3,
      name: "app.example.com",
      score: 78,
      trend: -12,
      timestamp: "25m ago",
    },
    {
      id: 4,
      name: "news.example.com",
      score: 92,
      trend: 8,
      timestamp: "30m ago",
    },
    {
      id: 5,
      name: "store.example.com",
      score: 81,
      trend: -5,
      timestamp: "40m ago",
    },
    {
      id: 6,
      name: "portal.example.com",
      score: 88,
      trend: 18,
      timestamp: "50m ago",
    },
    {
      id: 7,
      name: "media.example.com",
      score: 73,
      trend: -9,
      timestamp: "55m ago",
    },
    {
      id: 8,
      name: "cdn.example.com",
      score: 95,
      trend: 22,
      timestamp: "1h ago",
    },
  ];

  function inactiveState() {
    return (
      <div className="flex flex-col items-center grow justify-center text-center gap-6">
        <div className="h-16 w-[123px] object-fill overflow-hidden flex items-center justify-center">
          <img
            src={PerformanceEmpty}
            alt="Performance Empty"
            className="w-full object-cover rounded-[4px] h-16"
          />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="flex flex-col gap-[11px] items-center">
            <p className="text-sm leading-[100%] font-semibold text-zinc-500">
              Make Your Site Faster Instantly
            </p>
            <p className="text-xs leading-tight font-normal text-[#71717A]">
              Discover hidden performance blockers affecting your site’s speed.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-2 [&>li]:relative [&>li]:pl-[18px] [&>li]:before:absolute [&>li]:before:top-1/2 [&>li]:before:left-[0px] [&>li]:before:h-[8px] [&>li]:before:w-[8px] [&>li]:before:-translate-y-1/2 [&>li]:before:rounded-full [&>li]:before:bg-zinc-300 [&>li]:before:content-[''] py-2 px-4 bg-zinc-50 rounded-[12px] text-xs font-normal leading-tight text-[#71717A] text-left">
            <li>Faster Load Time</li>
            <li>Login Lockdown</li>
            <li>Reduced Page Size</li>
            <li>Track Core Web Vitals</li>
          </ul>
          <Button
            className="!bg-emerald-900 text-white text-[14px] leading-[100%] font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px] cursor-pointer"
            onClick={() => setStatus("active")}
          >
            <FileChartColumnIncreasing
              size={16}
              strokeWidth={1}
              className="text-white shrink-0"
            />
            Enable Airlift to Get Started
          </Button>
        </div>
      </div>
    );
  }

  function activeState() {
    return (
      <div className="relative overflow-y-hidden flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-end pb-1 border-b border-dashed border-[#E4E4E7] justify-between">
            <div className="flex flex-col gap-2.5 py-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl leading-[100%] font-medium ${status === "active"
                    ? "text-emerald-700"
                    : status === "hacked"
                      ? "text-[#DC2626]"
                      : "text-emerald-700"
                    }`}
                >
                  88%
                </span>
                <p className="text-2xl leading-[100%] font-medium text-[#09090B]">
                  Average Score
                </p>
              </div>
              <div className="flex item-center gap-[3px]">
                <TrendingUp
                  size={16}
                  strokeWidth={1}
                  className="text-emerald-600 shrink-0"
                />
                <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                  <span className="text-[#09090B] font-medium">+15%</span> from
                  last week
                </p>
              </div>
            </div>
            {/* Graph */}
            <div className="flex min-w-[100px] h-12">
              <BackupStatusBars data={performanceData} />
            </div>
          </div>
          <div className="flex justify-end items-center gap-6">
            <div className="flex items-center gap-1">
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    d="M6 2C9.6 2 10.5 2.9 10.5 6.5C10.5 10.1 9.6 11 6 11C2.4 11 1.5 10.1 1.5 6.5C1.5 2.9 2.4 2 6 2Z"
                    fill="#34D399"
                  />
                </g>
              </svg>
              <p className="text-xs leading-tight font-normal text-[#09090B]">
                0-49
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
                <g opacity="0.8">
                  <path
                    d="M6 2C9.6 2 10.5 2.9 10.5 6.5C10.5 10.1 9.6 11 6 11C2.4 11 1.5 10.1 1.5 6.5C1.5 2.9 2.4 2 6 2Z"
                    fill="#059669"
                  />
                </g>
              </svg>

              <p className="text-xs leading-tight font-normal text-[#09090B]">
                50-69
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
                <g opacity="0.8">
                  <path
                    d="M6 2C9.6 2 10.5 2.9 10.5 6.5C10.5 10.1 9.6 11 6 11C2.4 11 1.5 10.1 1.5 6.5C1.5 2.9 2.4 2 6 2Z"
                    fill="#065F46"
                  />
                </g>
              </svg>

              <p className="text-xs leading-tight font-normal text-[#09090B]">
                70-89
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
                <g opacity="0.8">
                  <path
                    d="M6 2C9.6 2 10.5 2.9 10.5 6.5C10.5 10.1 9.6 11 6 11C2.4 11 1.5 10.1 1.5 6.5C1.5 2.9 2.4 2 6 2Z"
                    fill="#022C22"
                  />
                </g>
              </svg>

              <p className="text-xs leading-tight font-normal text-[#09090B]">
                90-100
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {(status === "error" || status === "hacked") && (
            <div className="flex items-start gap-4 rounded-[8px] bg-zinc-50 py-2 px-4">
              {status === "error" ? (
                <TriangleAlert
                  size={24}
                  strokeWidth={1}
                  className="text-amber-600 shrink-0"
                />
              ) : (
                <OctagonAlert
                  size={24}
                  strokeWidth={1}
                  className="text-[#DC2626] shrink-0"
                />
              )}

              <div className="flex items-center justify-between w-full gap-6">
                <div className="flex flex-col gap-1">
                  <p
                    className={`text-xs leading-tight font-semibold ${status === "error" ? "text-zinc-800" : "text-[#DC2626]"
                      }`}
                  >
                    {status === "error"
                      ? "Performance Alert"
                      : "Site performance is severely degraded. "}
                  </p>
                  <p className="text-xs leading-tight font-medium text-zinc-600">
                    {status === "error"
                      ? "14 sites are lagging with scores under 70"
                      : "Airlift is disabled on most sites and needs immediate attention."}
                  </p>
                </div>
                {status === "error" && (
                  <Button className="!bg-white text-emerald-900 text-[14px] leading-tight font-medium !py-2 !px-2 gap-1 h-6 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer border border-zinc-200">
                    <FileChartColumnIncreasing
                      size={16}
                      strokeWidth={1}
                      className="text-emerald-900 shrink-0"
                    />
                    Optimize Sites
                  </Button>
                )}
              </div>
            </div>
          )}
          {status === "hacked" ? null : (
            <div className="flex items-start gap-4 py-2 px-4 rounded-[8px] bg-sky-50">
              <Sparkles
                size={24}
                strokeWidth={1}
                className="text-sky-700 shrink-0"
              />
              <p className="text-xs leading-tight font-semibold text-sky-700">
                83% of the sites have Airlift enabled. <br />
                <span className="font-medium">
                  Enable it on all sites to enhance speed and efficiency.
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 max-h-[249px] relative">
          <p className="sticky top-0 text-sm leading-[100%] font-semibold text-[#09090B]">
            Recent Activity
          </p>
          <div className="flex flex-col overflow-y-scroll scrollbar-hide gap-4">
            {allActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-2">
                  <div className="flex w-fit pt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.2">
                        <path d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z" fill={activity.trend > 0 ? "#047857" : "#DC2626"} />
                      </g>
                    </svg>

                  </div>
                  <div className="flex flex-col w-full gap-[7px]">
                    <span className="text-sm leading-[100%] font-medium text-zinc-800">
                      {activity.name}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <p className="text-xs leading-[100%] font-normal text-zinc-500">
                        <span>{activity.score}</span> Performance Score
                      </p>
                      <span
                        className={`flex items-center justify-center gap-1 px-2 py-1 rounded-2xl text-center text-xs font-medium leading-tight cursor-default h-6 ${activity.trend > 0 ? "text-emerald-700 bg-emerald-50" : "text-[#DC2626] bg-red-50"}`}
                      >
                        {
                          activity.trend > 0 ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5M11 3.5H8M11 3.5V6.5" stroke="#047857" strokeWidth="0.8" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                            : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11 8.5L6.75 4.25L4.25 6.75L1 3.5M11 8.5H8M11 8.5V5.5" stroke="#DC2626" strokeWidth="0.8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        }

                        <span>{activity.trend > 0 ? `+${activity.trend}%` : `${activity.trend}%`}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs leading-tight font-normal text-[#71717A]">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render based on status
  let content;
  if (status === "inactive") content = inactiveState();
  else if (status === "active") content = activeState();
  else if (status === "error") content = activeState();
  else if (status === "hacked") content = activeState();

  return (
    <div className="performance max-w-[544px]  w-full min-w-[544px] max-h-[560px] h-full min-h-[560px] border border-b-0 border-[#E4E4E7] shadow-[0px_1px_2px_0px_#0000000D] rounded-2xl bg-white flex flex-col gap-8 p-6">
      <div className="flex items-center gap-2">
        <FileChartColumnIncreasing
          size={24}
          strokeWidth={2}
          className="text-[#18181B] shrink-0"
        />
        <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
          Performance
        </p>
        {status !== 'inactive' && <span className={`inline-block px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium cursor-default leading-normal ${status === "hacked" ? "!bg-[#FEF2F2] !border-red-200 !text-[#DC2626]" : ''}`}>
          Airlift Enabled (25/30)
        </span>}
      </div>
      {content}
    </div>
  );
};

export default DashboardMainPerformanceWidget;
