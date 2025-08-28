import React from "react";
import ReportImg from "@/assets/dashboard-main-global/Dashboard-report-data-img.png";
import ReportEmpty from "@/assets/dashboard-main-global/dashboard-main-reports-empty.gif";
import {
  AlarmClock,
  Blocks,
  EllipsisVertical,
  Eye,
  FileChartLine,
  MailCheck,
  MailOpen,
  Pause,
  Pen,
  Play,
  Plus,
  Send,
  Timer,
  TimerReset,
  Trash2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DashboardMainReportWidget = () => {
  const [selectedType, setSelectedType] = React.useState("All");
  const [pausedReports, setPausedReports] = React.useState({});

  const reportDataRaw = [
    {
      id: 1,
      imageUrl: ReportImg,
      url: "https://reports-3001.alphaagency.com",
      title: "Marketing Report",
      user: {
        name: "Alice Johnson",
        email: "alice@alphaagency.com",
      },
      frequency: "Monthly",
      lastSent: "July 10, 2025",
      nextSend: "Aug 10, 2025",
      status: "Sent",
      statusIcon: (
        <Send size={12} strokeWidth={1} className="text-Emerald-700 shrink-0" />
      ),
      statusColor: "text-Emerald-700",
    },
    {
      id: 2,
      imageUrl: ReportImg,
      url: "https://reports-3002.designhub.org",
      title: "UI/UX Design Report",
      user: { name: "Brian Smith", email: "brian@designhub.org" },
      lastSent: "July 18, 2025",
      status: "Delivered",
      statusIcon: (
        <MailCheck
          size={12}
          strokeWidth={1}
          className="text-Emerald-700 shrink-0"
        />
      ),
      statusColor: "text-Emerald-700",
    },
    {
      id: 3,
      imageUrl: ReportImg,
      url: "https://reports-3003.bizmetrics.io",
      title: "SEO Performance Report",
      user: { name: "Carla White", email: "carla@bizmetrics.io" },
      frequency: "Monthly",
      lastSent: "July 15, 2025",
      nextSend: "Aug 15, 2025",
      status: "Opened",
      statusIcon: (
        <MailOpen size={12} strokeWidth={1} className="text-sky-600 shrink-0" />
      ),
      statusColor: "text-sky-600",
    },
    {
      id: 4,
      imageUrl: ReportImg,
      url: "https://reports-3004.creativeworks.net",
      title: "Content Strategy Report",
      user: { name: "David Lee", email: "david@creativeworks.net" },
      lastSent: "July 16, 2025",
      status: "Due",
      statusIcon: (
        <AlarmClock
          size={12}
          strokeWidth={1}
          className="text-amber-500 shrink-0"
        />
      ),
      statusColor: "text-amber-500",
    },
    {
      id: 5,
      imageUrl: ReportImg,
      url: "https://reports-3005.techventures.io",
      title: "Technology Trends Report",
      user: { name: "Ella Brown", email: "ella@techventures.io" },
      frequency: "Monthly",
      lastSent: "July 08, 2025",
      nextSend: "Aug 08, 2025",
      status: "Paused",
      statusIcon: (
        <Pause size={12} strokeWidth={1} className="text-[#DC2626] shrink-0" />
      ),
      statusColor: "text-[#DC2626]",
    },
    {
      id: 6,
      imageUrl: ReportImg,
      url: "https://reports-3006.greenbiz.com",
      title: "Sustainability Report",
      user: { name: "Frank Harris", email: "frank@greenbiz.com" },
      lastSent: "July 17, 2025",
      status: "Delivered",
      statusIcon: (
        <MailCheck
          size={12}
          strokeWidth={1}
          className="text-Emerald-700 shrink-0"
        />
      ),
      statusColor: "text-Emerald-700",
    },
    {
      id: 7,
      imageUrl: ReportImg,
      url: "https://reports-3007.fintrackers.org",
      title: "Financial Audit Report",
      user: { name: "Grace Wilson", email: "grace@fintrackers.org" },
      frequency: "Monthly",
      lastSent: "July 12, 2025",
      nextSend: "Aug 12, 2025",
      status: "Sent",
      statusIcon: (
        <Send size={12} strokeWidth={1} className="text-Emerald-700 shrink-0" />
      ),
      statusColor: "text-Emerald-700",
    },
    {
      id: 8,
      imageUrl: ReportImg,
      url: "https://reports-3008.healthdata.io",
      title: "Healthcare Analytics Report",
      user: { name: "Henry Adams", email: "henry@healthdata.io" },
      lastSent: "July 14, 2025",
      status: "Opened",
      statusIcon: (
        <MailOpen size={12} strokeWidth={1} className="text-sky-600 shrink-0" />
      ),
      statusColor: "text-sky-600",
    },
  ];

  const [reportData, setReportData] = React.useState(
    reportDataRaw.map((report) => ({
      ...report,
      type: report.nextSend ? "Scheduled" : "One-Time",
    }))
  );

  const filteredReports =
    selectedType === "All"
      ? reportData
      : reportData.filter((report) => report.type === selectedType);

  const dataInfo = () => {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-5 gap-[14px]">
          <div className="flex flex-col px-1 py-1 justify-center items-center gap-[2px] bg-zinc-50 rounded-[8px] ">
            <span className="text-base font-bold leading-6 text-[#71717A] shadow-[0px_1px_2px_0px #0000000D]">
              41
            </span>
            <span className="text-zinc-600 text-xs font-normal leading-[100%]">
              Sent
            </span>
          </div>

          <div className="flex flex-col px-1 py-1 justify-center items-center gap-[2px] bg-sky-50 rounded-[8px] ">
            <span className="text-base font-bold leading-6 text-sky-600 shadow-[0px_1px_2px_0px #0000000D]">
              28
            </span>
            <span className="text-zinc-600 text-xs font-normal leading-[100%]">
              Opened
            </span>
          </div>

          <div className="flex flex-col px-1 py-1 justify-center items-center gap-[2px] bg-red-50 rounded-[8px] ">
            <span className="text-base font-bold leading-6 text-[#DC2626] shadow-[0px_1px_2px_0px #0000000D]">
              13
            </span>
            <span className="text-zinc-600 text-xs font-normal leading-[100%]">
              Failed
            </span>
          </div>

          <div className="flex flex-col px-1 py-1 justify-center items-center gap-[2px] bg-amber-50 rounded-[8px] ">
            <span className="text-base font-bold leading-6 text-amber-500 shadow-[0px_1px_2px_0px #0000000D]">
              5
            </span>
            <span className="text-zinc-600 text-xs font-normal leading-[100%]">
              Uploading
            </span>
          </div>

          <div className="flex flex-col px-1 py-1 justify-center items-center gap-[2px] bg-red-50 rounded-[8px] ">
            <span className="text-base font-bold leading-6 text-[#DC2626] shadow-[0px_1px_2px_0px #0000000D]">
              7
            </span>
            <span className="text-zinc-600 text-xs font-normal leading-[100%]">
              Paused
            </span>
          </div>
        </div>
        {/* main box of cards */}
        <div className="flex flex-col gap-6 max-h-[321px] min-h-[321px] overflow-y-scroll scrollbar-hide">
          {filteredReports.map((report, index) => (
            // main box
            <div
              key={index}
              className="border flex flex-col gap-0.5 border-zinc-100 rounded-[10px]"
            >
              {/* upper box */}
              <div className="flex items-start gap-6 p-4">
                <div className="flex items-center gap-4 max-w-[364px] w-full">
                  <div className="flex max-w-[33.9px] h-[55px]">
                    <img
                      className="w-full object-cover rounded-[4px] h-[55px]"
                      src={report.imageUrl}
                      alt={report.title}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-normal leading-tight text-emerald-900">
                      {report.url}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium leading-tight text-[#18181B]">
                        {report.title}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-normal leading-tight text-[#71717A]">
                          {report.user.name}
                        </span>
                        {/* border line div */}
                        <div className="w-[1px] min-h-[12px] max-h-[12px] bg-[#E4E4E7]"></div>
                        <span className="text-xs font-normal leading-[100%] text-[#71717A]">
                          {report.user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-1">
                  <div className="flex items-center justify-center cursor-pointer w-5 h-5 p-0.5">
                    <Pen
                      size={16}
                      strokeWidth={1.5}
                      className="text-zinc-500 shrink-0"
                    />
                  </div>
                  <div className="flex items-center justify-center cursor-pointer w-5 h-5 p-0.5">
                    <Eye
                      size={16}
                      strokeWidth={1.5}
                      className="text-zinc-500 shrink-0"
                    />
                  </div>
                  <Popover>
                    <PopoverTrigger>
                      <div className="flex items-center cursor-pointer justify-center w-5 h-5 p-0.5">
                        <EllipsisVertical
                          size={16}
                          strokeWidth={1.5}
                          className="text-zinc-500 shrink-0"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[168px] w-full min-w-[168px] flex flex-col py-2 gap-0 shadow-[0px_2px_4px_-1px_#0000000F,0px_4px_6px_-1px_#0000001A] rounded-[12px] px-0">
                      <div
                        className="flex items-center gap-2 py-2 pl-4 pr-3 cursor-pointer"
                        onClick={() => handleTogglePause(report.id)}
                      >
                        {pausedReports[report.id] ? (
                          <>
                            <Pause
                              size={16}
                              strokeWidth={1}
                              className="text-zinc-950 shrink-0"
                            />
                            <span className="text-xs leading-tight font-normal text-zinc-950">
                              Pause Scheduling
                            </span>
                          </>
                        ) : (
                          <>
                            <Play
                              size={16}
                              strokeWidth={1}
                              className="text-zinc-950 shrink-0"
                            />
                            <span className="text-xs leading-tight font-normal text-zinc-950">
                              Resume Scheduling
                            </span>
                          </>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-2 py-2 px-4 cursor-pointer"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <Trash2
                          size={16}
                          strokeWidth={1}
                          className="text-zinc-950 shrink-0"
                        />
                        <span className="text-xs leading-tight font-normal text-zinc-950">
                          Delete Report
                        </span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {/* lower div */}
              <div className="flex items-center px-4 py-2.5 bg-zinc-50 justify-between">
                {report.frequency && (
                  <div className="flex items-center gap-1">
                    <Timer
                      size={12}
                      strokeWidth={1}
                      className="text-[#71717A] shrink-0"
                    />
                    <span className="text-xs font-normal leading-[100%] text-zinc-700">
                      {report.frequency}
                    </span>
                  </div>
                )}
                {report.lastSent && (
                  <div className="flex items-center gap-1">
                    <Timer
                      size={12}
                      strokeWidth={1}
                      className="text-[#71717A] shrink-0"
                    />
                    <span className="text-xs font-normal leading-[100%] text-zinc-700">
                      {report.lastSent}
                    </span>
                  </div>
                )}
                {report.nextSend && (
                  <div className="flex items-center gap-1">
                    <Timer
                      size={12}
                      strokeWidth={1}
                      className="text-[#71717A] shrink-0"
                    />
                    <span className="text-xs font-normal leading-[100%] text-zinc-700">
                      {report.nextSend}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {report.statusIcon}
                  <span
                    className={`${report.statusColor} text-xs leading-tight font-normal`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  function renderEmptyState() {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-2 grow text-center">
          <div className="h-36 w-[193px] object-fill overflow-hidden flex items-center justify-center">
            <img
              src={ReportEmpty}
              alt="Report Empty"
              className="w-full object-cover h-36"
            />
          </div>
          {selectedType === "One-Time"
            ? renderOneTimeEmptyState()
            : selectedType === "Scheduled"
            ? renderScheduledEmptyState()
            : renderAllEmptyState()}
        </div>
      </>
    );
  }

  function renderAllEmptyState() {
    return (
      <>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-[11px] text-[#71717A]">
            <p className="text-sm leading-[100%] font-semibold">
              No Reports Yet!
            </p>
            <p className="text-xs leading-tight font-normal">
              Create your first report to get started with data insights.
            </p>
          </div>
          <Button className="!bg-transparent underline text-emerald-900 text-xs leading-[100%] font-medium !py-2 !px-2 gap-2 h-6 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer">
            Create Your First Report
          </Button>
        </div>
      </>
    );
  }

  function renderOneTimeEmptyState() {
    return (
      <>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-[11px] text-[#71717A]">
            <p className="text-sm leading-[100%] font-semibold">
              Generate instant insights.
            </p>
            <p className="text-xs leading-tight font-normal">
              Create one-time reports for immediate analysis and sharing.
            </p>
          </div>
          <Button className="!bg-transparent underline text-emerald-900 text-xs leading-[100%] font-medium !py-2 !px-2 gap-2 h-6 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer">
            Generate a One-Time Report
          </Button>
        </div>
      </>
    );
  }

  function renderScheduledEmptyState() {
    return (
      <>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col items-center gap-[11px] text-[#71717A]">
            <p className="text-sm leading-[100%] font-semibold">
              Send reports on autopilot.
            </p>
            <p className="text-xs leading-tight font-normal">
              Choose a frequency, select a client, and hit go!
            </p>
          </div>
          <Button className="!bg-transparent underline text-emerald-900 text-xs leading-[100%] font-medium !py-2 !px-2 gap-2 h-6 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer">
            Start with a Report Template
          </Button>
        </div>
      </>
    );
  }

  const handleTogglePause = (id) => {
    setPausedReports((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteReport = (id) => {
    setReportData((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <div className="bg-white reports flex flex-col gap-6 max-h-[560px] min-h-[560px] h-full max-w-[544px] min-w-[544px] w-full shadow-[0px_1px_2px_0px_#0000000D] border border-b-0 border-[#E4E4E7] px-6 py-6 rounded-2xl">
      <div className="flex flex-col gap-8">
        {/* First header div */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileChartLine
              size={16}
              strokeWidth={1.5}
              className="text-[#18181B]"
            />
            <p className="text-[#09090B] text-lg leading-[100%] font-semibold">
              Reports{" "}
            </p>
            <span className="inline-block px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium cursor-default leading-[1.15]">
              {reportData.filter((r) => r.nextSend).length} Scheduled
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button className="self-end !bg-transparent text-emerald-900 h-auto text-[14px] leading-[100%] font-medium !py-2 !px-2 gap-2  rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer border border-zinc-200">
              <TimerReset
                size={16}
                strokeWidth={1}
                className="text-emerald-900 text-sm leading-[100%]"
              />
              Schedule
            </Button>

            <Button className="self-end !bg-transparent text-emerald-900 text-[10px] leading-[100%] font-medium !py-2 !px-2 gap-2 rounded-[6px] shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer border border-zinc-200">
              <Blocks
                size={12}
                strokeWidth={1.5}
                className="text-emerald-900"
              />
            </Button>
          </div>
        </div>
        {/* Second Buttons div */}
        <div className="flex items-center gap-2">
          <Label
            htmlFor="all"
            className="w-fit px-4 py-2 cursor-pointer border h-8 border-zinc-200 text-xs leading-normalfont-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
          >
            <Checkbox
              id="all"
              checked={selectedType === "All"}
              onCheckedChange={() => setSelectedType("All")}
              className="hidden"
            />
            <span>All</span>
          </Label>
          <Label
            htmlFor="one-time"
            className="w-fit px-4 py-2 cursor-pointer border h-8 border-zinc-200 text-xs leading-normalfont-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
          >
            <Checkbox
              id="one-time"
              checked={selectedType === "One-Time"}
              onCheckedChange={() => setSelectedType("One-Time")}
              className="hidden"
            />
            <span>One-Time</span>
          </Label>

          <Label
            htmlFor="scheduled"
            className="w-fit px-4 py-2 cursor-pointer border h-8 border-zinc-200 text-xs leading-normalfont-medium rounded-3xl text-[#18181B] cursor-pointer has-[[aria-checked=true]]:border-emerald-900 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-900"
          >
            <Checkbox
              id="scheduled"
              checked={selectedType === "Scheduled"}
              onCheckedChange={() => setSelectedType("Scheduled")}
              className="hidden"
            />
            <span>Scheduled</span>
          </Label>

          <Button className="self-end !bg-transparent text-emerald-900 text-xs leading-[100%] font-medium !py-2 !px-4 gap-2 h-6 rounded-3xl h-8 shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer border border-dashed border-zinc-200">
            <Plus size={9.33} strokeWidth={1.33} className="text-emerald-900" />
            New Report
          </Button>
        </div>
      </div>
      {filteredReports.length === 0 ? renderEmptyState() : dataInfo()}
    </div>
  );
};

export default DashboardMainReportWidget;
