import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  ArrowDown01,
  BookUp,
  ChartArea,
  Check,
  ChevronRight,
  ChevronsUp,
  ChevronUp,
  CodeXml,
  Dna,
  Info,
  ListFilter,
  RotateCw,
  ScanEye,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  TimerReset,
  UserRoundCheck,
  X,
  Zap,
  ZapOff,
} from "lucide-react";
import ObjectCacheProIcon from "@/assets/dashboard-main-global/Dashboard-Main-Object-Cache-Pro-plugin.png";
import BreezeDisplayIcon from "@/assets/dashboard-main-global/Dashboard-Main-Breeze-Display-plugin.png";
import BrezWordPressCoreIconeDisplayIcon from "@/assets/dashboard-main-global/Dashboard-Main-WordPress-Core.png";
import TwentyTwentyFiveThemeIcon from "@/assets/dashboard-main-global/Dashboard-Main-Twenty-Twenty-Five-Theme.png";
import ManageWidgetInactive from "@/assets/dashboard-main-global/dashboard-main-manage-widget-inactive.gif";
import ManageWidgetPluginIcon from "@/assets/dashboard-main-global/dashboard-main-manage-widgets-plugin-icon.png";
import DashboardMainManageWidgetCircle from "./DashboardMainManageWidgetCircle";
import CustomTooltip from "../CustomTooltip";

function FilterPopover({ current, setCurrent, values }) {

  const selected = current || values[0].key



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="text-xs h-auto leading-tight font-medium border-emerald-700 shadow-none bg-white rounded-full min-w-[99px] !px-4 py-2 cursor-pointer text-emerald-700 hover:bg-white hover:text-emerald-700">
          {values.find(c => c.key === selected)?.label || "All"} <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 4.5L6.5 7.5L9.5 4.5" stroke="#047857" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="rounded-[6px] p-1 border border-zinc-200 min-w-[99px] w-full bg-white shadow-ui">
        <div className="flex flex-col">
          {values.map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCurrent(cat.key)}
              className={`flex items-center cursor-pointer  justify-between w-full py-1.5 px-2 rounded-[2px] text-black text-[14px] ${selected === cat.key ? "bg-zinc-100" : ""}`}
            >
              <span className="leading-tight">{cat.key === 'all' ? "All" : cat.label}</span>
              {selected === cat.key && (
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3337 4.5L6.00033 11.8333L2.66699 8.5" stroke="#059669" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ManageCategoryPopover({ currentCategory, setCategory, total = 0 }) {
  const categories = [
    { key: "all", label: "All" + ` (${total})` },
    { key: "plugins", label: "Plugins" },
    { key: "themes", label: "Themes" },
    { key: "wp core", label: "WP Core" },
  ];

  return <FilterPopover current={currentCategory} setCurrent={setCategory} values={categories} />;
}


const DashboardMainManageWidget = () => {
  const siteData = [
    {
      id: 1,
      name: "Object Cache Pro",
      type: "Plugin",
      icon: ObjectCacheProIcon,
      sitesCount: 2,
      version: null,
      statusIcon: (
        <ShieldAlert
          strokeWidth={1}
          size={12}
          className="text-[#DC2626] shrink-0"
        />
      ),
      children: [
        {
          id: "1-1",
          url: "https://wordpress-10453.-aaerera3e233.com",
          version: "5.3.3",
          newVersion: "5.3.5",
          updateType: "Major",
          score: 84,
          scoreColor: "#F59E0B66",
          statusIcon: (
            <Zap
              strokeWidth={1}
              size={12}
              className="text-emerald-500 shrink-0"
            />
          ),
        },
        {
          id: "1-2",
          url: "https://wordpressdummyer3456a3e233.com",
          version: "5.3.3",
          newVersion: "5.3.5",
          updateType: "Minor",
          score: 52,
          scoreColor: "#DC262666",
          statusIcon: (
            <ZapOff
              strokeWidth={1}
              size={12}
              className="text-zinc-400 shrink-0"
            />
          ),
        },
      ],
    },
    {
      id: 2,
      name: "Breeze Display",
      type: "Plugin",
      icon: BreezeDisplayIcon,
      sitesCount: 2,
      version: null,
      statusIcon: (
        <TimerReset
          strokeWidth={1}
          size={12}
          className="text-zinc-600 shrink-0"
        />
      ),
      children: [
        {
          id: "2-1",
          url: "https://wordpress-10453.-aaerera3e233.com",
          version: "5.3.3",
          newVersion: "5.3.5",
          updateType: "Major",
          score: 84,
          scoreColor: "#F59E0B66",
          statusIcon: (
            <Zap
              strokeWidth={1}
              size={12}
              className="text-emerald-500 shrink-0"
            />
          ),
        },
        {
          id: "2-2",
          url: "https://wordpressdummyer3456a3e233.com",
          version: "5.3.3",
          newVersion: "5.3.5",
          updateType: "Minor",
          score: 52,
          scoreColor: "#DC262666",
          statusIcon: (
            <ZapOff
              strokeWidth={1}
              size={12}
              className="text-zinc-400 shrink-0"
            />
          ),
        },
      ],
    },
    {
      id: 3,
      name: "WordPress Core",
      type: "Core",
      icon: BrezWordPressCoreIconeDisplayIcon,
      sitesCount: 2,
      version: null,
      statusIcon: "",
      children: [
        {
          id: "3-1",
          url: "https://wordpress-10453.-aaerera3e233.com",
          version: "6.7.1",
          newVersion: "6.8.2",
          updateType: "Major",
          phpVersion: "8.0",
          phpIcon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.66699C3.51432 3.66699 0 5.57064 0 8.00033C0 10.43 3.51432 12.3337 8 12.3337C12.4857 12.3337 16 10.43 16 8.00033C16 5.57064 12.4857 3.66699 8 3.66699ZM7.16927 5.00033H8.043L7.7656 6.33366H8.5456C9.04033 6.33366 9.3724 6.40267 9.5612 6.57585C9.74607 6.74639 9.80207 7.02639 9.72787 7.40786L9.38153 9.00033H8.49347L8.81253 7.52766C8.85153 7.32586 8.83593 7.18519 8.7682 7.11099C8.70053 7.03679 8.55207 7.00033 8.3294 7.00033H7.6302L7.20833 9.00033H6.33333L7.16927 5.00033ZM3.33333 6.33366H5.11068C5.95833 6.33366 6.47135 6.90139 6.27083 7.74899C6.03776 8.73339 5.41276 9.00033 4.26432 9.00033H3.71485L3.54037 10.0003H2.65755L3.33333 6.33366ZM10.3333 6.33366H12.1107C12.9583 6.33366 13.4713 6.90139 13.2708 7.74899C13.0377 8.73339 12.4127 9.00033 11.2643 9.00033H10.7149L10.5403 10.0003H9.65753L10.3333 6.33366ZM4.08985 7.00033L3.83854 8.33366H4.40885C4.90235 8.33366 5.36068 8.27766 5.4375 7.54199C5.46615 7.25686 5.34765 7.00033 4.77735 7.00033H4.08985ZM11.0899 7.00033L10.8385 8.33366H11.4089C11.9023 8.33366 12.3607 8.27766 12.4375 7.54199C12.4661 7.25686 12.3477 7.00033 11.7773 7.00033H11.0899Z"
                fill="black"
              />
            </svg>
          ),
          scoreColor: "#10B98166",
          statusIcon: (
            <Zap
              strokeWidth={1}
              size={12}
              className="text-emerald-500 shrink-0"
            />
          ),
        },
        {
          id: "3-2",
          url: "https://wordpressdummyer3456a3e233.com",
          version: "6.7.1",
          newVersion: "6.8.2",
          updateType: "Minor",
          phpVersion: "8.0",
          phpIcon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.66699C3.51432 3.66699 0 5.57064 0 8.00033C0 10.43 3.51432 12.3337 8 12.3337C12.4857 12.3337 16 10.43 16 8.00033C16 5.57064 12.4857 3.66699 8 3.66699ZM7.16927 5.00033H8.043L7.7656 6.33366H8.5456C9.04033 6.33366 9.3724 6.40267 9.5612 6.57585C9.74607 6.74639 9.80207 7.02639 9.72787 7.40786L9.38153 9.00033H8.49347L8.81253 7.52766C8.85153 7.32586 8.83593 7.18519 8.7682 7.11099C8.70053 7.03679 8.55207 7.00033 8.3294 7.00033H7.6302L7.20833 9.00033H6.33333L7.16927 5.00033ZM3.33333 6.33366H5.11068C5.95833 6.33366 6.47135 6.90139 6.27083 7.74899C6.03776 8.73339 5.41276 9.00033 4.26432 9.00033H3.71485L3.54037 10.0003H2.65755L3.33333 6.33366ZM10.3333 6.33366H12.1107C12.9583 6.33366 13.4713 6.90139 13.2708 7.74899C13.0377 8.73339 12.4127 9.00033 11.2643 9.00033H10.7149L10.5403 10.0003H9.65753L10.3333 6.33366ZM4.08985 7.00033L3.83854 8.33366H4.40885C4.90235 8.33366 5.36068 8.27766 5.4375 7.54199C5.46615 7.25686 5.34765 7.00033 4.77735 7.00033H4.08985ZM11.0899 7.00033L10.8385 8.33366H11.4089C11.9023 8.33366 12.3607 8.27766 12.4375 7.54199C12.4661 7.25686 12.3477 7.00033 11.7773 7.00033H11.0899Z"
                fill="black"
              />
            </svg>
          ),
          scoreColor: "#10B98166",
          statusIcon: (
            <ZapOff
              strokeWidth={1}
              size={12}
              className="text-zinc-400 shrink-0"
            />
          ),
        },
      ],
    },
    {
      id: 4,
      name: "Twenty Twenty-Five",
      type: "Theme",
      icon: TwentyTwentyFiveThemeIcon,
      sitesCount: 2,
      version: null,
      statusIcon: (
        <TimerReset
          strokeWidth={1}
          size={12}
          className="text-zinc-600 shrink-0"
        />
      ),
      children: [
        {
          id: "4-1",
          url: "https://wordpress-10453.-aaerera3e233.com",
          version: "6.7.1",
          newVersion: "6.8.2",
          updateType: "Major",
          scoreColor: "#F59E0B66",
          statusIcon: (
            <Zap
              strokeWidth={1}
              size={12}
              className="text-emerald-500 shrink-0"
            />
          ),
        },
        {
          id: "4-2",
          url: "https://wordpressdummyer3456a3e233.com",
          version: "6.7.1",
          newVersion: "6.8.2",
          updateType: "Minor",
          scoreColor: "#F59E0B66",
          statusIcon: (
            <ZapOff
              strokeWidth={1}
              size={12}
              className="text-zinc-400 shrink-0"
            />
          ),
        },
      ],
    },
  ];

  // Calculate counts
  const allCount = siteData.reduce(
    (acc, item) => acc + (item.children?.length || 0),
    0
  );

  const [selected, setSelected] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [checked, setChecked] = useState({});
  const [autoUpdate,] = useState(true);

  const [popoverOpen, setPopoverOpen] = useState({});


  const handleToggle = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChildCheck = (parentId, childId, value) => {
    setChecked((prev) => ({
      ...prev,
      [parentId]: {
        ...prev[parentId],
        [childId]: value,
      },
    }));
  };

  const handleParentCheck = (parentId, value, children) => {
    setChecked((prev) => ({
      ...prev,
      [parentId]: children.reduce(
        (acc, child) => ({ ...acc, [child.id]: value }),
        {}
      ),
    }));
  };

  const handleAllCheck = (value) => {
    const newChecked = {};
    siteData.forEach((item) => {
      if (item.children) {
        newChecked[item.id] = {};
        item.children.forEach((child) => {
          newChecked[item.id][child.id] = value;
        });
      }
    });
    setChecked(newChecked);
  };

  const getParentCheckboxState = (parentId, children) => {
    const childStates = children.map((child) => checked[parentId]?.[child.id]);
    const allChecked = childStates.length > 0 && childStates.every(Boolean);
    return {
      checked: allChecked,
      indeterminate: false, // always false, no indeterminate state
    };
  };

  const getAllCheckboxState = () => {
    const allChildren = siteData.flatMap((item) =>
      (item.children || []).map((child) => ({
        parentId: item.id,
        childId: child.id,
      }))
    );
    const allChecked =
      allChildren.length > 0 &&
      allChildren.every(
        ({ parentId, childId }) => checked[parentId]?.[childId]
      );
    return {
      checked: allChecked,
      indeterminate: false, // always false, no indeterminate state
    };
  };

  const allCheckboxState = getAllCheckboxState();

  const anyChecked = Object.values(checked).some((group) =>
    Object.values(group).some(Boolean)
  );

  const getFilteredData = () => {
    if (!selected || selected === "all") return siteData;
    if (selected === "plugins")
      return siteData.filter((item) => item.type === "Plugin");
    if (selected === "themes")
      return siteData.filter((item) => item.type === "Theme");
    if (selected === "wp core")
      return siteData.filter((item) => item.type === "Core");
  };

  const filteredData = getFilteredData();
  const filteredCount = filteredData.reduce(
    (acc, item) => acc + (item.children?.length || 0),
    0
  );


  // Update activeTable to accept data
  function activeTable(data) {
    return (
      <>
        {data.map((item) => {
          const { checked: parentChecked } = getParentCheckboxState(
            item.id,
            item.children || []
          );
          return (
            <div key={item.id} className="flex flex-col">
              <div className="flex items-center justify-between py-2 gap-4">
                <div className="flex items-center gap-2">
                  <ChevronRight
                    strokeWidth={1.5}
                    size={24}
                    className={`text-[#18181B] shrink-0 cursor-pointer transition-transform duration-200 ${expanded[item.id] ? "rotate-90" : ""
                      }`}
                    onClick={() => handleToggle(item.id)}
                  />
                  <Checkbox
                    className="border border-emerald-900 rounded-[2px] data-[state=checked]:bg-emerald-900"
                    checked={parentChecked}
                    onCheckedChange={(value) =>
                      handleParentCheck(item.id, value, item.children || [])
                    }
                  />
                </div>
                <div className="flex items-center max-w-[304px] w-full px-2 gap-4">
                  <div className="flex items-center justify-center max-w-8 min-w-8 w-full max-h-8 min-h-8 h-full">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs leading-[100%] font-medium text-[#18181B]">
                        {item.name}
                      </span>
                      {item.statusIcon &&
                        item.statusIcon.type === ShieldAlert ? (
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <ShieldAlert
                              strokeWidth={1}
                              size={12}
                              className="text-[#DC2626] shrink-0"
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            align="start"
                            height={10}
                            width={6}
                            alignOffset={-6}
                            className="py-[5.5px] px-3 rounded-[4px] [&_svg]:fill-transparent [&_svg]:bg-zinc-950 bg-zinc-950"
                          >
                            <p className="text-[10px] leading-tight font-normal text-zinc-50">
                              Vulnerability Detected <br /> Immediate Update
                              recommended
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        item.statusIcon
                      )}
                    </div>
                    {
                      item.type !== 'Core' &&
                      <span className="text-xs leading-[100%] font-normal text-zinc-600">
                        {item.type}
                      </span>}
                  </div>
                </div>
                <div className="flex max-w-[76px] w-full min-w-[76px]"></div>
                <div className="flex items-center">
                  <p className="text-xs text-emerald-700 leading-[100%] font-medium">
                    <span className="">
                      {item.sitesCount}
                    </span>{" "}
                    Sites
                  </p>
                </div>
                <div className="flex max-w-5 w-full min-w-5"></div>
              </div>
              {expanded[item.id] && item.children && (
                <div className="pl-16 flex flex-col">
                  {item.children.map((child) => {

                    return (
                      <div
                        key={child.id}
                        className="flex items-center justify-between gap-4 py-2"
                      >
                        <div className="flex w-4 h-4">
                          <Checkbox
                            className="border border-emerald-900 rounded-[2px] data-[state=checked]:bg-emerald-900"
                            checked={checked[item.id]?.[child.id] || false}
                            onCheckedChange={(value) =>
                              handleChildCheck(item.id, child.id, value)
                            }
                          />
                        </div>
                        <div className="flex flex-col max-w-[268px] w-full gap-2.5 px-2">
                          <div className="flex items-center gap-2">
                            <a
                              href="#"
                              className="text-xs leading-[100%] text-emerald-900 font-normal max-w-[168px] truncate inline-block align-bottom"
                              title={child.url}
                            >
                              {child.url}
                            </a>
                            {child.statusIcon}
                          </div>
                          <span className="text-xs leading-[100%] font-normal text-zinc-600">
                            {child.version}
                          </span>
                        </div>
                        <div className="flex max-w-[76px] w-full min-w-[76px] gap-2 px-2">
                          {typeof child.score !== "undefined" &&
                            child.score !== null ? (
                            <Popover
                              open={!!popoverOpen[child.id]}
                              onOpenChange={(open) =>
                                setPopoverOpen((prev) => ({ ...prev, [child.id]: open }))
                              }
                            >
                              <PopoverTrigger
                                onMouseEnter={() =>
                                  setPopoverOpen((prev) => ({ ...prev, [child.id]: true }))
                                }
                                onMouseLeave={() =>
                                  setPopoverOpen((prev) => ({ ...prev, [child.id]: false }))
                                }
                              >                                <div>
                                  <DashboardMainManageWidgetCircle
                                    score={`${child.score}%`}
                                    scoreColor={child.scoreColor}
                                  />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent align="start"
                                side='center'
                                onMouseEnter={() =>
                                  setPopoverOpen((prev) => ({ ...prev, [child.id]: true }))
                                }
                                onMouseLeave={() =>
                                  setPopoverOpen((prev) => ({ ...prev, [child.id]: false }))
                                } className="max-w-60 min-w-60 w-full bg-zinc-50 border border-zinc-200 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] !px-2 !py-4 !rounded-[12px] flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <ScanEye
                                      size={16}
                                      strokeWidth={1}
                                      className="text-zinc-950"
                                    />
                                    <p className="text-xs leading-[100%] font-medium text-black">
                                      Update Lens
                                    </p>
                                    <span
                                      className={`flex items-center gap-1 px-2 py-[5px] rounded-2xl text-center bg-amber-50 text-amber-500 text-[8px] font-medium leading-[100%] cursor-default`}
                                    >
                                      BETA
                                    </span>
                                  </div>
                                  <Info
                                    className="text-[#2A9D90] shrink-0"
                                    size={16}
                                    strokeWidth={1}
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-col gap-1 !border-l-5 border-[0.5px] !border-l-amber-100 border-zinc-200 !rounded-l-[4px] rounded-[6px] p-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <CodeXml
                                          size={16}
                                          strokeWidth={1}
                                          className="text-zinc-950 shrink-0"
                                        />
                                        <p className="text-[10px] leading-[100%] font-semibold text-black">
                                          Code Changes
                                        </p>
                                      </div>
                                      <span
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-center bg-amber-50 text-amber-600 text-[8px] font-bold leading-[100%] cursor-default h-3.5`}
                                      >
                                        MED RISK
                                      </span>
                                    </div>
                                    <span className="text-[8px] leading-tight font-normal text-black">
                                      260 PHP lines added, 122 removed. 185 CSS
                                      lines added, 236 removed. No changes to JS
                                      files.
                                    </span>
                                    <Popover className="flex">
                                      <PopoverTrigger className="flex justify-end">
                                        <Button className="self-end !bg-transparent text-emerald-900 text-[10px] leading-[100%] font-medium !py-2 !px-2 gap-2 h-6 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer">
                                          <ListFilter
                                            size={12}
                                            strokeWidth={1}
                                            className="text-emerald-900 shrink-0"
                                          />
                                          View Difference
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="max-w-[360px] w-full min-w-[360px] flex flex-col p-4 gap-4 border-zinc-200 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] border rounded-[12px]">
                                        <div className="flex items-center gap-2">
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M6 12.6663C6 13.7709 5.10457 14.6663 4 14.6663C2.89543 14.6663 2 13.7709 2 12.6663C2 11.5618 2.89543 10.6663 4 10.6663C5.10457 10.6663 6 11.5618 6 12.6663ZM6 12.6663H11.6667C12.2855 12.6663 12.879 12.4205 13.3166 11.9829C13.7542 11.5453 14 10.9518 14 10.333C14 9.71417 13.7542 9.12068 13.3166 8.68309C12.879 8.24551 12.2855 7.99967 11.6667 7.99967H4.33333C3.71449 7.99967 3.121 7.75384 2.68342 7.31626C2.24583 6.87867 2 6.28518 2 5.66634C2 5.0475 2.24583 4.45401 2.68342 4.01643C3.121 3.57884 3.71449 3.33301 4.33333 3.33301H10M10 3.33301C10 4.43758 10.8954 5.33301 12 5.33301C13.1046 5.33301 14 4.43758 14 3.33301C14 2.22844 13.1046 1.33301 12 1.33301C10.8954 1.33301 10 2.22844 10 3.33301Z"
                                              stroke="#09090B"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>

                                          <p className="text-xs leading-[100%] font-medium text-black">
                                            Change Log
                                          </p>
                                        </div>
                                        <div className="flex flex-col gap-6">
                                          <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-4">
                                              <img
                                                src={ManageWidgetPluginIcon}
                                                alt="Manage Widget Plugin Icon"
                                                className="size-6 shrink-0"
                                              />
                                              <div className="flex items-center w-full justify-between">
                                                <div className="flex flex-col gap-1">
                                                  <span className="text-sm leading-[100%] font-medium text-[#09090B]">
                                                    {item.name}
                                                  </span>
                                                  <span className="text-xs leading-[100%] font-normal text-zinc-600">
                                                    {child.version}
                                                  </span>
                                                </div>
                                                <span
                                                  className={`flex items-center gap-1 px-2 py-1 border border-emerald-700 rounded-2xl text-center bg-emerald-50 text-emerald-700 text-xs font-normal leading-[100%] cursor-default h-6`}
                                                >
                                                  <ChevronsUp
                                                    size={12}
                                                    strokeWidth={0.8}
                                                    className="text-emerald-700 shrink-0"
                                                  />
                                                  {child.newVersion}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                              <div className="flex flex-col items-center gap-0.5 bg-[#0478570D] py-1 px-2 rounded-[8px]">
                                                <span className="text-base leading-6 font-bold text-emerald-900">
                                                  June 06
                                                </span>
                                                <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                                                  Last Updated
                                                </p>
                                              </div>
                                              <div
                                                className={`flex flex-col items-center gap-0.5 ${autoUpdate
                                                  ? "bg-[#0478570D]"
                                                  : "bg-amber-50"
                                                  } py-1 px-2 rounded-[8px]`}
                                              >
                                                <span
                                                  className={`text-base leading-6 font-bold ${autoUpdate
                                                    ? "text-emerald-900"
                                                    : "text-[#F4A462]"
                                                    }`}
                                                >
                                                  {autoUpdate ? "On" : "Off"}
                                                </span>
                                                <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                                                  Auto-Updates
                                                </p>
                                              </div>
                                              {autoUpdate && (
                                                <div className="flex flex-col items-center gap-0.5 bg-[#0478570D] py-1 px-2 rounded-[8px]">
                                                  <span className="text-base leading-6 font-bold text-emerald-900">
                                                    10 hrs
                                                  </span>
                                                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                                                    Update In
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex flex-col overflow-y-scroll scrollbar-hide h-full max-h-[303px] gap-0">
                                            <div className="flex gap-0 items-stretch">
                                              <div className="flex flex-col items-center gap-1 h-full min-w-8 max-w-8 w-full">
                                                <div className="flex h-4 items-end">
                                                  <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 12 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <rect
                                                      width="12"
                                                      height="12"
                                                      rx="6"
                                                      fill="#ECFDF5"
                                                    />
                                                    <rect
                                                      x="2"
                                                      y="2"
                                                      width="8"
                                                      height="8"
                                                      rx="4"
                                                      fill="#047857"
                                                    />
                                                  </svg>
                                                </div>
                                                <div className="flex flex-col grow items-center w-[1px] bg-zinc-200 h-[101px]"></div>
                                              </div>
                                              <div className="flex flex-col w-ful grow gap-4">
                                                <div className="flex flex-col gap-1">
                                                  <div className="flex items-center justify-between pb-1 border-b border-dashed border-zinc-200">
                                                    <div className="flex items-center gap-0 5">
                                                      <ChevronUp
                                                        size={12}
                                                        strokeWidth={1}
                                                        className="text-emerald-700 shrink-0"
                                                      />
                                                      <span className="text-base leading-[100%] font-semibold text-emerald-700">
                                                        5.4.1
                                                      </span>
                                                    </div>
                                                    <span className="flex bg-zinc-100 py-1 px-2 rounded-2xl min-h-4 text-xs leading-[100%] font-normal text-zinc-700">
                                                      15 July 2025
                                                    </span>
                                                  </div>
                                                  <span className="text-xs leading-tight font-normal text-[#18181B]">
                                                    Minor Update
                                                  </span>
                                                </div>
                                                <div className="flex flex-col pb-4">
                                                  <p className="text-xs leading-tight font-light text-zinc-600">
                                                    <span>
                                                      Improved: Increased expected
                                                      API response timeout from 4
                                                      seconds to 30 seconds to
                                                      better handle delayed
                                                      responses.
                                                    </span>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="flex gap-0 items-stretch">
                                              <div className="flex flex-col items-center gap-1 h-full min-w-8 max-w-8 w-full">
                                                <div className="flex h-4 items-end">
                                                  <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 12 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <rect
                                                      width="12"
                                                      height="12"
                                                      rx="6"
                                                      fill="#ECFDF5"
                                                    />
                                                    <rect
                                                      x="2"
                                                      y="2"
                                                      width="8"
                                                      height="8"
                                                      rx="4"
                                                      fill="#047857"
                                                    />
                                                  </svg>
                                                </div>
                                                <div className="flex flex-col grow items-center w-[1px] bg-zinc-200 h-[162px]"></div>
                                              </div>
                                              <div className="flex flex-col w-ful grow gap-4">
                                                <div className="flex flex-col gap-1">
                                                  <div className="flex items-center justify-between pb-1 border-b border-dashed border-zinc-200">
                                                    <div className="flex items-center gap-0 5">
                                                      <ChevronsUp
                                                        size={12}
                                                        strokeWidth={1}
                                                        className="text-emerald-700 shrink-0"
                                                      />
                                                      <span className="text-base leading-[100%] font-semibold text-emerald-700">
                                                        5.4
                                                      </span>
                                                    </div>
                                                    <span className="flex bg-zinc-100 py-1 px-2 rounded-2xl min-h-4 text-xs leading-[100%] font-normal text-zinc-700">
                                                      15 July 2025
                                                    </span>
                                                  </div>
                                                  <span className="text-xs leading-tight font-normal text-[#18181B]">
                                                    Major Update
                                                  </span>
                                                </div>
                                                <div className="flex flex-col gap-4 pb-4">
                                                  <p className="text-xs leading-tight font-light text-zinc-600">
                                                    <span>
                                                      Fix: Resolved a critical
                                                      Cross-Site Request Forgery
                                                      (CSRF) vulnerability by
                                                      implementing nonce
                                                      validation.
                                                    </span>
                                                  </p>
                                                  <p className="text-xs leading-tight font-light text-zinc-600">
                                                    <span>
                                                      Fix: Patched a Broken Access
                                                      Control (BAC) vulnerability
                                                      to ensure users cannot
                                                      perform actions outside of
                                                      their assigned capabilities.
                                                    </span>
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  <div className="flex flex-col gap-1 !border-l-5 border-[0.5px] !border-l-emerald-100 border-zinc-200 !rounded-l-[4px] rounded-[6px] p-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <ArrowDown01
                                          size={16}
                                          strokeWidth={1}
                                          className="text-zinc-950 shrink-0"
                                        />
                                        <p className="text-[10px] leading-[100%] font-semibold text-black">
                                          Version Gap
                                        </p>
                                      </div>
                                      <span
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-center bg-emerald-50 text-emerald-600 text-[8px] font-bold leading-[100%] cursor-default h-3.5`}
                                      >
                                        MED RISK
                                      </span>
                                    </div>
                                    <span className="text-[8px] leading-tight font-normal text-black">
                                      Update from 5.3.3 to 5.3.5 with 2 version
                                      hops.
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-1 !border-l-5 border-[0.5px] !border-l-amber-100 border-zinc-200 !rounded-l-[4px] rounded-[6px] p-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Dna
                                          size={16}
                                          strokeWidth={1}
                                          className="text-zinc-950 shrink-0"
                                        />
                                        <p className="text-[10px] leading-[100%] font-semibold text-black">
                                          Adoption
                                        </p>
                                      </div>
                                      <span
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-center bg-amber-50 text-amber-600 text-[8px] font-bold leading-[100%] cursor-default h-3.5`}
                                      >
                                        MED RISK
                                      </span>
                                    </div>
                                    <span className="text-[8px] leading-tight font-normal text-black">
                                      Steady adoption, 30% to 50% of sites have
                                      updated..
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-1 !border-l-5 border-[0.5px] !border-l-emerald-100 border-zinc-200 !rounded-l-[4px] rounded-[6px] p-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <ChartArea
                                          size={16}
                                          strokeWidth={1}
                                          className="text-zinc-950 shrink-0"
                                        />
                                        <p className="text-[10px] leading-[100%] font-semibold text-black">
                                          Maturity
                                        </p>
                                      </div>
                                      <span
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-center bg-emerald-50 text-emerald-600 text-[8px] font-bold leading-[100%] cursor-default h-3.5`}
                                      >
                                        MED RISK
                                      </span>
                                    </div>
                                    <span className="text-[8px] leading-tight font-normal text-black">
                                      Well-established update, 27 days since
                                      release.
                                    </span>
                                  </div>
                                  <div className="flex flex-col gap-1 !border-l-5 border-[0.5px] !border-l-emerald-100 border-zinc-200 !rounded-l-[4px] rounded-[6px] p-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <UserRoundCheck
                                          size={16}
                                          strokeWidth={1}
                                          className="text-zinc-950 shrink-0"
                                        />
                                        <p className="text-[10px] leading-[100%] font-semibold text-black">
                                          Popularity
                                        </p>
                                      </div>
                                      <span
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-center bg-emerald-50 text-emerald-600 text-[8px] font-bold leading-[100%] cursor-default h-3.5`}
                                      >
                                        MED RISK
                                      </span>
                                    </div>
                                    <span className="text-[8px] leading-tight font-normal text-black">
                                      Highly popular plugin with more than 50000
                                      active installs.
                                    </span>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          ) : child.phpVersion ? (
                            <span className="flex items-center gap-2">
                              {child.phpIcon}
                              <span className="text-xs text-zinc-600 leading-normal font-normal">
                                {child.phpVersion}
                              </span>
                            </span>
                          ) : null}
                        </div>
                        <div className="flex items-center">
                          <CustomTooltip content={child.updateType + " Update"} delayDuration={0} arrowHeight={10}>

                            <span
                              className={`flex items-center gap-1 px-2 py-1 rounded-2xl text-center bg-zinc-100 text-[#09090B] text-xs font-normal leading-[100%] cursor-default`}
                            >
                              {child.updateType === "Major" ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 5.5L6 3L3.5 5.5M8.5 9L6 6.5L3.5 9" stroke="#047857" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                                :
                                <ChevronUp
                                  size={12}
                                  strokeWidth={1}
                                  className="text-[#09090B] shrink-0"
                                />}
                              {child.newVersion}
                            </span>
                          </CustomTooltip>

                        </div>
                        <div className="flex max-w-5 w-full min-w-5 items-center justify-center">

                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.66699 13V3C2.66699 2.55797 2.84259 2.13405 3.15515 1.82149C3.46771 1.50893 3.89163 1.33333 4.33366 1.33333H13.3337V14.6667H4.33366C3.89163 14.6667 3.46771 14.4911 3.15515 14.1785C2.84259 13.866 2.66699 13.442 2.66699 13ZM2.66699 13C2.66699 12.558 2.84259 12.134 3.15515 11.8215C3.46771 11.5089 3.89163 11.3333 4.33366 11.3333H13.3337M8.00033 8.66667V4.66667M8.00033 4.66667L6.00033 6.66667M8.00033 4.66667L10.0003 6.66667" stroke="#71717A" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>

                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  }

  // Dummy inactiveTable for when nothing is selected
  function inactiveTable() {
    return (
      <div className="flex flex-col items-center justify-center grow p-4 gap-4 text-center">
        <div className="h-32 w-[199px] object-fill overflow-hidden flex items-center justify-center">
          <img
            src={ManageWidgetInactive}
            alt="Manage Widget"
            className="w-full object-cover h-32"
          />
        </div>
        <div className="flex flex-col items-center gap-[11px] text-center text-[#71717A]">
          <p className="text-base leading-[100%] font-semibold">
            All Set for Now!
          </p>
          <p className="text-xs leading-tight font-normal">
            Your site is up-to-date. <br />
            Plugins, Themes, and WordPress core are all running the latest
            versions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-updates min-w-[648px] w-full max-w-[648px] max-h-[560px] h-full min-h-[560px] flex flex-col bg-white p-6 gap-8 border border-[#E4E4E7] shadow-[0_1px_2px_0_#0000000D] rounded-2xl justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={24}
            strokeWidth={1.5}
            className="text-[#18181B] shrink-0"
          />
          <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
            Manage Updates
          </p>
          <span
            className={`inline-block px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium leading-4 cursor-default`}
          >
            {selected ? filteredCount : 0} Updates
          </span>
        </div>
        <div className="relative w-full min-w-[180px] max-w-[180px] min-h-8 flex items-center">
          <span className="absolute left-3 text-zinc-950">
            <Search
              size={16}
              strokeWidth={1}
              className="text-zinc-950 shrink-0"
            />
          </span>
          <Input
            className="w-full pl-[34px] pr-[38px] min-h-8 border !border-zinc-200 relative text-xs font-normal leading-[15px] text-zinc-500 h-full ring-0 outline-0 focus-visible:ring-0"
            placeholder="Search"
          />
          <Button
            type="button"
            className="!bg-transparent cursor-pointer text-black !text-sm !leading-[100%] !font-medium !p-2 gap-2 h-6 !rounded-[6px] min-h-8 absolute right-3"
            aria-label="Clear search"
          >
            <X size={20} strokeWidth={1} className="text-[#18181B] shrink-0" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6 grow">
        <div className="flex items-center justify-between gap-4">
          <Checkbox
            className="border border-emerald-900 rounded-[2px] data-[state=checked]:bg-emerald-900"
            checked={allCheckboxState.checked}
            onCheckedChange={handleAllCheck}
          />
          <div className="flex items-center max-w-[568px] w-full gap-2">
            <ManageCategoryPopover currentCategory={selected} setCategory={setSelected} total={allCount} />
            {/* <Select value={selected || 'all'} onValueChange={setSelected}>
              <SelectTrigger className="shadow-none border items-center text-emerald-700 text-xs !leading-[100%] font-normal border-emerald-700 rounded-3xl py-2 px-4 cursor-pointer bg-white shadow-[0_1px_2px_0_#0000000D] [&>svg]:!text-emerald-700 [&>svg]:!opacity-100 !min-w-[99px] w-full max-w-[99px] !ring-0 !h-[31px] gap-2 justify-center">
                <SelectValue>
                  {selected.length === 0 || selected === "all"
                    ? `All (${allCount})`
                    : selected === "plugins"
                      ? "Plugins"
                      : selected === "themes"
                        ? "Themes"
                        : selected === "wp core"
                          ? "WP Core"
                          : ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="!max-w-[99px] w-[99px] !min-w-[99px] m-[-1px]  !bg-white !rounded-[6px]">
                <SelectItem
                  value="all"
                  className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:fill-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:rounded-[2px]"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="plugins"
                  className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:rounded-[2px]"
                >
                  Plugins
                </SelectItem>
                <SelectItem
                  value="themes"
                  className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:rounded-[2px]"
                >
                  Themes
                </SelectItem>
                <SelectItem
                  value="wp core"
                  className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:rounded-[2px]"
                >
                  WP Core
                </SelectItem>
              </SelectContent>
            </Select> */}
            <div className="flex h-[31px] w-[1px] bg-[#E4E4E7]"></div>
            <div className="flex items-center justify-between max-w-[452px] w-full gap-2">
              <Select>
                <SelectTrigger className="shadow-none border !text-[#18181B] !text-xs !leading-normal  !font-normal !border-zinc-200 rounded-3xl cursor-pointer !py-2 !px-3 !gap-2 !bg-white shadow-none [&>svg]:!text-[#18181B] [&>svg]:!opacity-100 !ring-0 !h-[31px] gap-2 justify-center">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent className="!min-w-fit  !bg-white !rounded-[6px]">
                  <SelectItem
                    value="Severity"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Severity
                  </SelectItem>
                  <SelectItem
                    value="Severity2"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Severity
                  </SelectItem>
                  <SelectItem
                    value="Severity3"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Severity
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="shadow-none border !text-[#18181B] !text-xs !leading-normal !font-normal !border-zinc-200 rounded-3xl cursor-pointer !py-2 !px-3 !gap-2 !bg-white shadow-none [&>svg]:!text-[#18181B] [&>svg]:!opacity-100 !ring-0 !h-[31px] gap-2 justify-center">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="!min-w-fit  !bg-white !rounded-[6px]">
                  <SelectItem
                    value="Status"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Status
                  </SelectItem>
                  <SelectItem
                    value="Status2"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Status
                  </SelectItem>
                  <SelectItem
                    value="Status3"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Status
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="shadow-none border !text-[#18181B] !text-xs !leading-normal !font-normal !border-zinc-200 rounded-3xl cursor-pointer !py-2 !px-3 !gap-2 !bg-white shadow-none [&>svg]:!text-[#18181B] [&>svg]:!opacity-100 !ring-0 !h-[31px] gap-2 justify-center">
                  <SelectValue placeholder="Update Risk" />
                </SelectTrigger>
                <SelectContent className="!min-w-fit !bg-white !rounded-[6px]">
                  <SelectItem
                    value="Update Risk"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Update Risk
                  </SelectItem>
                  <SelectItem
                    value="Update Risk2"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Update Risk
                  </SelectItem>
                  <SelectItem
                    value="Update Risk3"
                    className="!py-1.5 !px-2 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Update Risk
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="shadow-none border !text-[#18181B] !text-xs !leading-normal !font-normal !border-zinc-200 rounded-3xl cursor-pointer !py-2 !px-3 !gap-2 !bg-white shadow-none [&>svg]:!text-[#18181B] [&>svg]:!opacity-100 !ring-0 !h-[31px] gap-2 justify-center">
                  <SelectValue placeholder="Lock Status" />
                </SelectTrigger>
                <SelectContent className="!min-w-fit !bg-white !rounded-[6px]">
                  <SelectItem
                    value="Lock Status"
                    className="!py-1.5 !px-2 gap-1 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Lock Status
                  </SelectItem>
                  <SelectItem
                    value="Lock Status2"
                    className="!py-1.5 !px-2 gap-1 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Lock Status
                  </SelectItem>
                  <SelectItem
                    value="Lock Status3"
                    className="!py-1.5 !px-2 gap-1 flex cursor-pointer !justify-between !text-sm !leading-[100%] !font-normal !text-black [&_svg]:data-[state=checked]:text-emerald-600 data-[state=checked]:bg-zinc-100 [&_svg]:data-[state=checked]:size-4 rounded-[2px] data-[state=checked]:rounded-[2px] bg-white hover:!rounded-[2px]"
                  >
                    Lock Status
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col gap-2 max-h-[327.4px] h-full ${selected ? "overflow-y-scroll scrollbar-hide" : "grow"
            }`}
        >
          {selected ? activeTable(filteredData) : inactiveTable()}
        </div>
      </div>
      <div className="flex items-center w-full justify-end gap-4">
        <Button
          className="!bg-transparent text-emerald-900 text-sm leading-[100%] font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px] shadow-none cursor-pointer"
          onClick={() => setChecked({})}
        >
          <RotateCw
            size={16}
            strokeWidth={1}
            className="text-emerald-900 shrink-0"
          />
          Refresh
        </Button>
        <Button
          className={`${anyChecked && selected
            ? "!bg-emerald-900 cursor-pointer"
            : "!bg-emerald-900/50 cursor-not-allowed"
            } text-white text-sm leading-[100%] font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D]`}
        >
          <BookUp size={16} strokeWidth={1} className="text-white shrink-0" />
          Update
        </Button>
      </div>
    </div>
  );
};

export default DashboardMainManageWidget;
