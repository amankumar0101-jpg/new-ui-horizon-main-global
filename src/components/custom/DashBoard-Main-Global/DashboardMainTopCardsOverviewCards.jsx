import {
  FileChartLine,
  FileClock,
  Globe,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import React from "react";

const DashboardMainTopCardsOverviewCards = () => {

  const CARD_TOTAL_SITES = {
    title: "Total Sites",
    value: 42,
    icon: Globe,
    upCount: 39,
    downCount: 3,
  };

  const CARD_SITES_HACKED = {
    title: "Sites Hacked",
    value: 2,
    icon: ShieldCheck,
    subLabel: "From previous week",
    valueChange: -10,
  };

  const CARD_AUTO_UPDATES = {
    title: "Auto Updates",
    value: 12,
    icon: FileClock,
    subLabel: "Activity this week",
    valueChange: 2,
  };

  const CARD_SCHEDULED_REPORTS = {
    title: "Scheduled Reports",
    value: 14,
    icon: FileChartLine,
    subLabel: "Sent this week",
    valueChange: 4,
  };

  const cardData = {
    CARD_TOTAL_SITES,
    CARD_SITES_HACKED,
    CARD_AUTO_UPDATES,
    CARD_SCHEDULED_REPORTS,
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex justify-between items-start rounded-[12px] border bg-white border-[#E4E4E7] p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl leading-[100%] font-bold text-[#18181B]">
              {cardData.CARD_TOTAL_SITES.value}
            </span>
            <p className="text-sm leading-[100%] font-medium text-[#09090B]">
              Total Sites
            </p>
          </div>
          <div className="flex items-center gap-4">
            {cardData.CARD_TOTAL_SITES.upCount && <div className="flex items-center gap-1">
              <TrendingUp
                size={16}
                strokeWidth={1.2}
                className="text-emerald-600 shrink-0"
              />
              <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                <span>{cardData.CARD_TOTAL_SITES.upCount}</span> Up
              </p>
            </div>}
            {cardData.CARD_TOTAL_SITES.downCount && <div className="flex items-center gap-1">
              <TrendingDown
                size={16}
                strokeWidth={1.2}
                className="text-[#DC2626] shrink-0"
              />
              <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                <span>{cardData.CARD_TOTAL_SITES.downCount}</span> Down
              </p>
            </div>}
          </div>
        </div>
        <Globe size={24} strokeWidth={1} className="text-[#71717A] shrink-0" />
      </div>
      <div className="flex flex-col gap-[14.4px] rounded-[12px] border bg-white border-[#E4E4E7] p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl leading-[100%] font-bold text-[#DC2626]">
              {cardData.CARD_SITES_HACKED.value}
            </span>
            <p className="text-sm leading-[100%] font-medium text-[#09090B]">
              Sites Hacked
            </p>
          </div>
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-[#71717A] shrink-0"
          />
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs leading-[100%] font-normal text-[#71717A]">
            From previous week
          </p>
          <span className="flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 gap-1 items-center leading-tight text-xs font-medium cursor-default">
            <TrendingDown
              size={12}
              strokeWidth={1}
              className="text-emerald-700 shrink-0"
            />
            <span>{cardData.CARD_SITES_HACKED.valueChange}%</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[14.4px] rounded-[12px] border bg-white border-[#E4E4E7] p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl leading-[100%] font-bold text-[#18181B]">
              {cardData.CARD_AUTO_UPDATES.value}
            </span>
            <p className="text-sm leading-[100%] font-medium text-[#09090B]">
              Auto Updates
            </p>
          </div>
          <FileClock
            size={24}
            strokeWidth={1}
            className="text-[#71717A] shrink-0"
          />
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs leading-[100%] font-normal text-[#71717A]">
            Activity this week
          </p>
          <span className="flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 gap-1 items-center leading-tight text-xs font-medium cursor-default">
            <TrendingUp
              size={12}
              strokeWidth={1}
              className="text-emerald-700 shrink-0"
            />
            <span>{cardData.CARD_AUTO_UPDATES.value > 0? '+':''}{cardData.CARD_AUTO_UPDATES.valueChange}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[14.4px] rounded-[12px] border bg-white border-[#E4E4E7] p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl leading-[100%] font-bold text-[#18181B]">
              {cardData.CARD_SCHEDULED_REPORTS.value}
            </span>
            <p className="text-sm leading-[100%] font-medium text-[#09090B]">
              Scheduled Reports
            </p>
          </div>
          <FileChartLine
            size={24}
            strokeWidth={1}
            className="text-[#71717A] shrink-0"
          />
        </div>
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs leading-[100%] font-normal text-[#71717A]">
            Sent this week
          </p>
          <span className="flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 gap-1 items-center leading-tight text-xs font-medium cursor-default">
            {cardData.CARD_SCHEDULED_REPORTS.valueChange}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainTopCardsOverviewCards;
