import React, { useState } from "react";
import {
  CalendarPlus,
  EllipsisVertical,
  List,
  Merge,
  Pause,
  Play,
  Plus,
  Trash2,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StagingClear from "@/assets/dashboard-main-global/dashboard-main-staging-empty.gif";

const FILTERS = ["All", "Active", "Suspended", "Expiring"];

function formatDate(dateText) {
  return new Date(dateText).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const DashboardMainStagingWidget = () => {
  const [selected, setSelected] = useState(["All"]);
  const [allStages, setAllStages] = useState([
    {
      id: 1,
      url: "https://wordpress-dummmy13245.com",
      status: "Active",
      create: "Jun 20, 2025",
      expire: "Jul 25, 2025",
      tagExpire: "3",
      php: "8.1",
    },
    {
      id: 2,
      url: "https://wordpress-112291-5610726.cloudwaysapps.com",
      status: "Suspended",
      create: "Jun 18, 2025",
      expire: "Jul 18, 2025",
      tagExpire: "25",
      php: "8.0",
    },
    {
      id: 3,
      url: "Stage 3",
      status: "Active",
      create: "Jun 22, 2025",
      expire: "Jul 27, 2025",
      tagExpire: "5",
      php: "8.1",
    },
    {
      id: 4,
      url: "https://wordpress-112291-5610726.cloudwaysapps.com",
      status: "Active",
      create: "Jun 18, 2025",
      expire: "Jul 18, 2025",
      tagExpire: "8",
      php: "8.0",
    },
    {
      id: 5,
      url: "https://wordpress-112291-5610726.cloudwaysapps.com",
      status: "Active",
      create: "Jun 18, 2025",
      expire: "Jul 18, 2025",
      tagExpire: "2",
      php: "8.0",
    },
    {
      id: 6,
      url: "https://wordpress-112291-5610726.cloudwaysapps.com",
      status: "Suspended",
      create: "Jun 18, 2025",
      expire: "Jul 18, 2025",
      tagExpire: "13",
      php: "8.0",
    },
  ]);

  function handleChange(filter) {
    if (filter === "All") {
      setSelected(["All"]);
    } else {
      setSelected((prev) => {
        const newSelected = prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev.filter((f) => f !== "All"), filter];
        return newSelected.length === 0 ? ["All"] : newSelected;
      });
    }
  }

  // Add this function to toggle status
  function handleToggleStatus(id) {
    setAllStages((prev) =>
      prev.map((stage) =>
        stage.id === id
          ? {
            ...stage,
            status: stage.status === "Suspended" ? "Active" : "Suspended",
          }
          : stage
      )
    );
  }

  function handleDeleteStage(id) {
    setAllStages((prev) => prev.filter((stage) => stage.id !== id));
  }

  function getFilteredStages() {
    // If "All" is selected, show all
    if (selected.includes("All")) return allStages;

    // Build filter logic
    return allStages.filter((stage) => {
      const checks = [];
      if (selected.includes("Active")) checks.push(stage.status === "Active");
      if (selected.includes("Suspended"))
        checks.push(stage.status === "Suspended");
      if (selected.includes("Expiring"))
        checks.push(Number(stage.tagExpire) <= 7);
      return checks.some(Boolean);
    });
  }

  function getFilterBadge() {
    // Hierarchy: Active > Suspended > Expiring Soon
    if (selected.includes("All") || selected.includes("Active")) {
      const count = allStages.filter((s) => s.status === "Active").length;
      return {
        label: `${count} Active`,
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
    }
    if (selected.includes("Suspended")) {
      const count = allStages.filter((s) => s.status === "Suspended").length;
      return {
        label: `${count} Suspended`,
        className: "border-amber-200 bg-amber-50 text-amber-600",
      };
    }
    if (selected.includes("Expiring")) {
      const count = allStages.filter((s) => Number(s.tagExpire) <= 7).length;
      return {
        label: `${count} Expiring Soon`,
        className: "border-amber-200 bg-amber-50 text-amber-600",
      };
    }
    // fallback
    return {
      label: "0 Active",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  function activeStaging() {
    return (
      <div className="flex flex-col grow gap-6">
        <div className="flex items-center gap-2">
          {FILTERS.map((filter) => (
            <Label
              key={filter}
              htmlFor={filter}
              className="w-fit px-4 py-2 cursor-pointer border h-8 border-zinc-200 text-xs leading-normal font-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
            >
              <Checkbox
                id={filter}
                checked={selected.includes(filter)}
                onCheckedChange={() => handleChange(filter)}
                className="hidden"
              />
              <span>
                {filter === "Expiring" ? "Expiring in 7 Days" : filter}
              </span>
            </Label>
          ))}
        </div>
        <div className="flex flex-col gap-6 max-h-[391px] overflow-y-scroll scrollbar-hide">
          {getFilteredStages().map((stage) => (
            <div
              key={stage.id}
              className="flex flex-col  justify-between border border-zinc-100 rounded-[10px]"
            >
              <div className=" flex align-start justify-between w-full py-4 px-2">
                <div className="flex flex-col gap-2.5 px-1">
                  <div className="relative flex items-center group">
                    <a
                      href={'#'} //Fill with stage.url

                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-emerald-900 align-middle leading-tight max-w-[270px] truncate transition-colors pr-6"
                    >
                      {stage.url}
                    </a>
                    <button
                      type="button"
                      className="absolute right-0 top-1/2 cursor-pointer  -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigator.clipboard.writeText(stage.url);
                      }}
                      tabIndex={-1}
                      aria-label="Copy URL"
                    >
                      {/* Dummy SVG: 2x2 black border box */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1 rounded-2xl text-center border ${stage.tagExpire > 7
                        ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                        : "border-yellow-500 bg-yellow-50 text-yellow-500"
                        } text-xs leading-normal cursor-default h-6 w-fit`}
                    >
                      {stage.tagExpire} days left
                    </span>
                    {stage.status === "Suspended" && (
                      <span
                        className={`inline-flex items-center justify-center px-2 py-1 rounded-2xl text-center border border-yellow-500 bg-yellow-50 text-yellow-500 text-xs font-normal leading-normal cursor-default h-6 w-fit`}
                      >
                        {stage.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-start py-1 gap-2">
                  <Button className="!bg-transparent text-zinc-500 shadow-none text-[10px] leading-[100%] font-medium flex items-center justify-center !py-0 !px-0 gap-2 min-h-5 h-full max-h-5 max-w-5 min-w-5 w-full rounded-[6px] cursor-pointer">
                    <Merge
                      size={16}
                      strokeWidth={1.5}
                      className="text-zinc-500 shrink-0"
                    />
                  </Button>
                  <Button className="!bg-transparent text-zinc-500 text-[10px] leading-[100%] font-medium flex items-center justify-center !py-0 !px-0 gap-2 min-h-5 shadow-none h-full max-h-5 max-w-5 min-w-5 w-full rounded-[6px] cursor-pointer">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1C11.857 1 15 4.143 15 8C15 11.857 11.857 15 8 15C4.143 15 1 11.857 1 8C1 4.143 4.143 1 8 1ZM6.22168 14.0342C6.78868 14.2022 7.384 14.293 8 14.293C8.735 14.293 9.43494 14.1667 10.0859 13.9287C10.072 13.9077 10.0579 13.8726 10.0439 13.8447L8.1123 8.5459L6.22168 14.0342ZM2.25293 5.43848C1.90305 6.22237 1.70703 7.09016 1.70703 8C1.70703 10.492 3.1559 12.6411 5.25586 13.6631L2.25293 5.43848ZM13.5234 4.9834C13.5514 5.17927 13.5654 5.39615 13.5654 5.62695C13.5654 6.26393 13.4458 6.98489 13.0889 7.88086L11.1641 13.4395C12.5813 12.6151 13.6209 11.2697 14.0615 9.69043C14.5021 8.11128 14.3091 6.42231 13.5234 4.9834ZM8 1.70703C5.80207 1.70703 3.87034 2.83408 2.73633 4.54199C2.88304 4.54897 3.02278 4.54883 3.1416 4.54883C3.7996 4.54883 4.82227 4.47168 4.82227 4.47168C5.16492 4.45098 5.19992 4.94805 4.86426 4.99023C4.86426 4.99023 4.52058 5.0319 4.14258 5.0459L6.43164 11.8711L7.81055 7.74121L6.83105 5.05273C6.49505 5.03173 6.17285 4.99023 6.17285 4.99023C5.83 4.96911 5.87205 4.45085 6.20801 4.46484C6.20801 4.46484 7.25119 4.54199 7.86719 4.54199C8.5212 4.54198 9.5346 4.46577 9.54688 4.46484C9.88988 4.44384 9.92487 4.9414 9.58887 4.9834C9.57999 4.98448 9.24111 5.02517 8.86816 5.0459L11.1357 11.8223L11.7656 9.72168C12.0316 8.84678 12.2422 8.22353 12.2422 7.68457C12.2421 6.90781 11.9616 6.36914 11.7236 5.94922C11.4086 5.43122 11.1084 4.98968 11.1084 4.47168C11.1086 3.8908 11.5492 3.35156 12.165 3.35156C12.193 3.35157 12.221 3.35938 12.249 3.35938C11.129 2.33037 9.638 1.70703 8 1.70703Z" fill="#71717A" />
                      <path d="M8 1C11.857 1 15 4.143 15 8C15 11.857 11.857 15 8 15C4.143 15 1 11.857 1 8C1 4.143 4.143 1 8 1ZM6.22168 14.0342C6.78868 14.2022 7.384 14.293 8 14.293C8.735 14.293 9.43494 14.1667 10.0859 13.9287C10.072 13.9077 10.0579 13.8726 10.0439 13.8447L8.1123 8.5459L6.22168 14.0342ZM2.25293 5.43848C1.90305 6.22237 1.70703 7.09016 1.70703 8C1.70703 10.492 3.1559 12.6411 5.25586 13.6631L2.25293 5.43848ZM13.5234 4.9834C13.5514 5.17927 13.5654 5.39615 13.5654 5.62695C13.5654 6.26393 13.4458 6.98489 13.0889 7.88086L11.1641 13.4395C12.5813 12.6151 13.6209 11.2697 14.0615 9.69043C14.5021 8.11128 14.3091 6.42231 13.5234 4.9834ZM8 1.70703C5.80207 1.70703 3.87034 2.83408 2.73633 4.54199C2.88304 4.54897 3.02278 4.54883 3.1416 4.54883C3.7996 4.54883 4.82227 4.47168 4.82227 4.47168C5.16492 4.45098 5.19992 4.94805 4.86426 4.99023C4.86426 4.99023 4.52058 5.0319 4.14258 5.0459L6.43164 11.8711L7.81055 7.74121L6.83105 5.05273C6.49505 5.03173 6.17285 4.99023 6.17285 4.99023C5.83 4.96911 5.87205 4.45085 6.20801 4.46484C6.20801 4.46484 7.25119 4.54199 7.86719 4.54199C8.5212 4.54198 9.5346 4.46577 9.54688 4.46484C9.88988 4.44384 9.92487 4.9414 9.58887 4.9834C9.57999 4.98448 9.24111 5.02517 8.86816 5.0459L11.1357 11.8223L11.7656 9.72168C12.0316 8.84678 12.2422 8.22353 12.2422 7.68457C12.2421 6.90781 11.9616 6.36914 11.7236 5.94922C11.4086 5.43122 11.1084 4.98968 11.1084 4.47168C11.1086 3.8908 11.5492 3.35156 12.165 3.35156C12.193 3.35157 12.221 3.35938 12.249 3.35938C11.129 2.33037 9.638 1.70703 8 1.70703Z" stroke="#71717A" />
                    </svg>

                  </Button>
                  <Popover>
                    <PopoverTrigger>
                      <div className="!bg-transparent text-zinc-500 text-[10px] leading-[100%] font-medium flex items-center justify-center !py-0 !px-0 gap-2 min-h-5 h-full max-h-5 max-w-5 min-w-5 w-full rounded-[6px] cursor-pointer">
                        <EllipsisVertical
                          size={16}
                          strokeWidth={1.5}
                          className="text-zinc-500 shrink-0"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white rounded-[8px] shadow-[0px_2px_4px_-1px_#0000000F,0px_4px_6px_-1px_#0000001A] py-2 px-0 gap-0 flex flex-col max-w-[146px] min-w-[146px] w-full">
                      <div className="flex items-center gap-2 py-2 px-4">
                        <List
                          size={16}
                          strokeWidth={1}
                          className="text-zinc-950 shrink-0"
                        />
                        <p className="text-xs leading-[100%] font-normal text-zinc-950">
                          View Details
                        </p>
                      </div>
                      <div className="flex items-center gap-2 py-2 px-4">
                        <CalendarPlus
                          size={16}
                          strokeWidth={1}
                          className="text-zinc-950 shrink-0"
                        />
                        <p className="text-xs leading-[100%] font-normal text-zinc-950">
                          Extend Staging
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-2 py-2 pl-4 pr-3 cursor-pointer"
                        onClick={() => handleToggleStatus(stage.id)}
                      >
                        {stage.status === "Suspended" ? (
                          <Play
                            size={16}
                            strokeWidth={1}
                            className="text-zinc-950 shrink-0"
                          />
                        ) : (
                          <Pause
                            size={16}
                            strokeWidth={1}
                            className="text-zinc-950 shrink-0"
                          />
                        )}
                        {stage.status === "Suspended" ? (
                          <p className="text-xs leading-[100%] font-normal text-zinc-950">
                            Resume Staging
                          </p>
                        ) : (
                          <p className="text-xs leading-[100%] font-normal text-zinc-950">
                            Pause Staging
                          </p>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-2 py-2 px-4"
                        onClick={() => handleDeleteStage(stage.id)}
                      >
                        <Trash2
                          size={16}
                          strokeWidth={1}
                          className="text-zinc-950 shrink-0"
                        />
                        <p className="text-xs leading-[100%] font-normal text-zinc-950">
                          Delete Staging
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2 px-4 py-2 bg-zinc-50 rounded-b-[10px]">
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_9476_19020)">
                        <path d="M6 4V7L8 8M11 7C11 9.76142 8.76142 12 6 12C3.23858 12 1 9.76142 1 7C1 4.23858 3.23858 2 6 2C8.76142 2 11 4.23858 11 7Z" stroke="#71717A" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_9476_19020">
                          <rect width="12" height="12" fill="white" transform="translate(0 1)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-xs font-normal text-zinc-700">
                      Created: <time dateTime={stage.create}>{formatDate(stage.create)}</time>
                    </span>

                  </div>
                  <div className="flex gap-1 items-center">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 5.5V7.5L7 8.5M2.5 2.5L1 4M11 4L9.5 2.5M3.19 10.35L2 11.5M8.81995 10.335L9.99995 11.5M10 7.5C10 9.70914 8.20914 11.5 6 11.5C3.79086 11.5 2 9.70914 2 7.5C2 5.29086 3.79086 3.5 6 3.5C8.20914 3.5 10 5.29086 10 7.5Z" stroke="#71717A" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className="text-xs font-normal text-zinc-700">
                      Expires: <time dateTime={stage.expire}>{formatDate(stage.expire)}</time>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4.25C2.63574 4.25 0 5.67773 0 7.5C0 9.32225 2.63574 10.75 6 10.75C9.36425 10.75 12 9.32225 12 7.5C12 5.67773 9.36425 4.25 6 4.25ZM5.37695 5.25H6.03225L5.8242 6.25H6.4092C6.78025 6.25 7.0293 6.30176 7.1709 6.43164C7.30955 6.55955 7.35155 6.76955 7.2959 7.05565L7.03615 8.25H6.3701L6.6094 7.1455C6.63865 6.99415 6.62695 6.88865 6.57615 6.833C6.5254 6.77735 6.41405 6.75 6.24705 6.75H5.72265L5.40625 8.25H4.75L5.37695 5.25ZM2.5 6.25H3.83301C4.46875 6.25 4.85352 6.6758 4.70312 7.3115C4.52832 8.0498 4.05957 8.25 3.19824 8.25H2.78613L2.65528 9H1.99317L2.5 6.25ZM7.75 6.25H9.083C9.71875 6.25 10.1035 6.6758 9.9531 7.3115C9.7783 8.0498 9.30955 8.25 8.44825 8.25H8.03615L7.90525 9H7.24315L7.75 6.25ZM3.06738 6.75L2.87891 7.75H3.30664C3.67676 7.75 4.02051 7.708 4.07812 7.15625C4.09961 6.9424 4.01074 6.75 3.58301 6.75H3.06738ZM8.3174 6.75L8.1289 7.75H8.55665C8.92675 7.75 9.2705 7.708 9.3281 7.15625C9.3496 6.9424 9.26075 6.75 8.833 6.75H8.3174Z" fill="#71717A" />
                    </svg>
                    <span className="text-xs font-normal text-zinc-700">
                      PHP Version: <span className="leading-none">{stage.php}</span>
                    </span>
                  </div>
                  <button className="bg-transparent py-1 px-2 border-none underline text-emerald-900 text-xs font-medium cursor-pointer">
                    See Credentials
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function emptyStaging() {
    return (
      <>
        <div className="flex flex-col items-center justify-center grow h-full py-4 px-6 gap-6 text-center">
          <div className="h-[77px] w-[148px] object-fill overflow-hidden flex items-center justify-center">
            <img
              src={StagingClear}
              alt="Staging Clear"
              className="w-full object-cover h-[77px]"
            />
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-[11px] ">
              <p className="text-sm leading-[100%] font-semibold text-zinc-500">
                Let’s build your testing ground.
              </p>
              <p className="text-xs leading-tight font-normal text-[#71717A]">
                Safely try updates, experiment with new features, and preview
                changes - all without putting your live site at risk.
              </p>
            </div>
            <Button className="gap-2 flex items-center !bg-emerald-900 text-white text-sm leading-[100%] font-medium !py-4 !px-2 gap-2 h-8 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer">
              <Plus size={16} strokeWidth={1} className="text-white shrink-0" />
              Create Staging Site
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="staging flex flex-col max-w-[464px] w-full min-w-[440px] min-h-[560px] h-full max-h-[560px] bg-white border border-b-0 border-[#E4E4E7] gap-8 shadow-[0_1px_2px_0_#0000000D] rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Workflow
            size={24}
            strokeWidth={2}
            className="text-[#18181B] shrink-0"
          />
          <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
            Staging
          </p>
          <span
            className={`inline-block px-2.5 py-0.5 rounded-[6px] text-center border text-xs font-medium leading-4 cursor-default h-5 ${getFilterBadge().className
              }`}
          >
            {getFilterBadge().label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button className="self-end !bg-transparent border border-zinc-200 text-emerald-900 text-[10px]  font-medium !py-2 !px-2 gap-2 leading-none rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer text-sm h-auto">
            <Plus
              size={16}
              strokeWidth={1.5}
              className="text-emerald-900 shrink-0"
            />
            <span className="leading-none">Add Staging</span>
          </Button>
        </div>
      </div>
      {getFilteredStages().length === 0 ? emptyStaging() : activeStaging()}
    </div>
  );
};

export default DashboardMainStagingWidget;
