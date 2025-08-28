import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Goal, Plug, Plus, TrendingUp, Users } from "lucide-react";
import Greetings from "@/assets/dashboard-main-global/dashboard-top-cards-greetings.gif";

const DashboardMainTopCardsGreetingBar = () => {
  const tags = [
    { label: "Shortlisted", bgColor: "bg-sky-50", textColor: "text-sky-600" },
    {
      label: "Approved",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    { label: "Pending", bgColor: "bg-yellow-50", textColor: "text-yellow-600" },
    { label: "Admin", bgColor: "bg-cyan-50", textColor: "text-cyan-600" },
    { label: "Agency", bgColor: "bg-zinc-50", textColor: "text-zinc-600" },
    { label: "Rejected", bgColor: "bg-red-50", textColor: "text-red-600" },
    {
      label: "In Review",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    { label: "Hired", bgColor: "bg-green-50", textColor: "text-green-600" },
    { label: "Interview", bgColor: "bg-amber-50", textColor: "text-amber-600" },
  ];

  // Responsive logic for tags
  const [visibleCount, setVisibleCount] = useState(5);
  const [dynamicGap, setDynamicGap] = useState("80px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setVisibleCount(3);
        setDynamicGap("40px");
      } else if (window.innerWidth < 1920) {
        setVisibleCount(3);
        setDynamicGap("40px");
      } else {
        setVisibleCount(5);
        setDynamicGap("80px");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full rounded-2xl p-[1px] bg-[linear-gradient(92.18deg,_rgba(6,95,70,0.5)_0.46%,_rgba(12,197,145,0.145)_19.42%)]">
      <div className="flex flex-col bg-white rounded-[15px] bg-[linear-gradient(99.31deg,_#D1FAE5_-52.87%,_#FFFFFF_61.21%)] pt-8 px-8 pb-6 w-full gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-5xl leading-[100%] font-bold bg-[linear-gradient(90deg,_#022C22_0%,_#10B981_100%)] bg-clip-text text-transparent">
                  Hello, <span>John!</span>
                </h1>
                <div className="size-[58px] object-fill overflow-hidden flex items-center justify-center">
                  <img
                    src={Greetings}
                    alt="Greetings"
                    className="w-full object-cover h-[58px]"
                  />
                </div>
              </div>
              <span className="flex items-center justify-center gap-2 px-2 py-1 rounded-[8px] text-center border border-[#E4E4E7] bg-zinc-50 text-zinc-600 text-sm font-normal">
                <Plug
                  strokeWidth={1}
                  size={16}
                  className="text-zinc-600 shrink-0"
                />
                Administrator
              </span>
            </div>
            <Button className="!bg-emerald-900 cursor-pointer text-white !text-sm  !font-medium !py-2 !px-4 gap-2 !rounded-[6px] min-h-10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33398 7.99998H12.6673M8.00065 3.33331V12.6666" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>Add Site</span>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="max-w-[513px] w-full min-w-[513px] text-sm leading-[1.43] font-medium text-[#09090B]">
              Welcome back to your WP Remote dashboard. Here's what's happening
              with your sites today. Do not forget to go through our latest
              announcements!
            </p>
            <div
              className="flex p-2 justify-between w-fit"
              style={{ gap: dynamicGap }}
            >
              <div className="flex flex-col gap-2 w-fit">
                <div className="flex items-start gap-4 justify-between">
                  <span className="text-2xl leading-[100%] font-bold text-emerald-700">
                    +11%
                  </span>
                  <Goal
                    strokeWidth={1}
                    size={16}
                    className="text-[#71717A] shrink-0"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp
                    size={16}
                    strokeWidth={1}
                    className="text-emerald-600 shrink-0"
                  />
                  <p className="text-sm leading-[100%] font-normal text-[#09090B]">
                    Activity this week
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[124px]">
                <div className="flex items-start gap-4 justify-between">
                  <span className="text-2xl leading-[100%] font-bold text-[#71717A]">
                    12
                  </span>
                  <Users
                    strokeWidth={1}
                    size={16}
                    className="text-[#71717A] shrink-0"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm leading-[100%] font-normal text-[#09090B]">
                    Team Members
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[124px]">
                <div className="flex items-start gap-4 justify-between">
                  <span className="text-2xl leading-[100%] font-bold text-[#71717A]">
                    28
                  </span>
                  <Goal
                    strokeWidth={1}
                    size={16}
                    className="text-[#71717A] shrink-0"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm leading-[100%] font-normal text-[#09090B]">
                    Total Clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center h-8 gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2C12.8 2 14 3.2 14 8C14 12.8 12.8 14 8 14C3.2 14 2 12.8 2 8C2 3.2 3.2 2 8 2Z"
                fill="#22C55E"
              />
            </svg>
            <p className="text-xs leading-4 font-normal text-[#09090B]">
              Last Login:{" "}
              <span className="font-semibold">11:11 AM, 2 hrs ago</span>
            </p>
          </div>
          <div className="flex items-center py-2 pl-2 pr-2.5 gap-2 justify-end">
            <p className="text-sm leading-[100%] font-semibold text-[#71717A]">
              Tags :
            </p>
            {/* Responsive tags display:
              - 2xl and above: show first 5 tags, rest as +N - below 2xl: show first 3 tags, rest as +N */}
            <div className="flex items-center gap-2">
              {tags.slice(0, visibleCount).map((tag, index) => (
                <span
                  key={index}
                  className={`flex items-center px-2 py-1 rounded-2xl text-center ${tag.bgColor} ${tag.textColor} leading-[100%] text-xs font-normal h-6 cursor-default`}
                >
                  {tag.label}
                </span>
              ))}
              {tags.length > visibleCount && (
                <span
                  className={`flex items-center px-2 py-1 rounded-2xl text-center bg-zinc-100 text-zinc-600 leading-[100%] text-xs font-normal h-6 cursor-pointer`}
                >
                  +{tags.length - visibleCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainTopCardsGreetingBar;
