import React, { useState } from "react";
import CustomTooltip from "../CustomTooltip";
import {
  AlertOctagon,
  AlertTriangle,
  ArrowUpWideNarrow,
  Bot,
  Flame,
  Plus,
  RefreshCcw,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  ShieldHalf,
  Stars,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SecurityInactive from "@/assets/dashboard-main-global/dashboard-main-security-inactive.gif";
import FirewallInactive from "@/assets/dashboard-main-global/dashboard-main-firewall-inactive.gif";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import DashboardMainSecurityFirewallCircle from "./DashboardMainSecurityFirewallCircle";
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

const generateSecurityData = (startDateISO, numDays = 7) => {
  const data = [];
  const startDate = new Date(startDateISO);

  let baseClean = Math.floor(Math.random() * 5) + 5; // 5-9

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Add some randomness, but keep numbers near each other
    let clean = baseClean + Math.floor(Math.random() * 3) - 1; // baseClean ±1
    clean = Math.max(3, clean); // Minimum 3

    // Add vulnerable (1-2, 30% chance)
    let vulnerable =
      Math.random() < 0.3 ? Math.floor(Math.random() * 2) + 1 : 0;
    if (vulnerable > clean) vulnerable = clean;
    clean -= vulnerable;

    // Add failed (1, 20% chance)
    let failed = Math.random() < 0.2 ? 1 : 0;
    if (failed > clean) failed = clean;
    clean -= failed;

    data.push({
      date: currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      clean,
      vulnerable,
      failed,
    });
  }

  return data;
};

const getStatusDot = (status) => {
  if (status === "success") {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="align-middle"
      >
        <g opacity="0.2">
          <path
            d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
            fill="#047857"
          />
        </g>
      </svg>
    );
  }
  if (status === "vulnerable") {
    return (
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
            fill="#E8C468"
          />
        </g>
      </svg>
    );
  }
  // critical/failed
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="align-middle"
    >
      <g opacity="0.2">
        <path
          d="M6 1.5C9.6 1.5 10.5 2.4 10.5 6C10.5 9.6 9.6 10.5 6 10.5C2.4 10.5 1.5 9.6 1.5 6C1.5 2.4 2.4 1.5 6 1.5Z"
          fill="#DC2626"
        />
      </g>
    </svg>
  );
};

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
    const status =
      idx < dayData.clean
        ? "success"
        : idx < dayData.clean + dayData.vulnerable
          ? "vulnerable"
          : "failed";
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

const SecurityStatusBars = ({ data = [] }) => {
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
    const critical = failed;
    const total = clean + vulnerable + critical;
    const barWidth = (370 - (data.length - 1) * 4) / data.length;
    const maxBarHeight = 56;
    const height = (total / maxTries) * maxBarHeight;

    // Segment heights
    // const vulnerableHeight = (vulnerable / total) * height;
    // const criticalHeight = (critical / total) * height;

    const failedPercent = (failed / total) * 100;
    const vulnerablePercent = ((failed + vulnerable) / total) * 100;

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

    const tooltipText = `${dayData.date}
${clean ? `${clean} Clean` : ""}
${vulnerable ? `${vulnerable} Vulnerable` : ""}
${failed ? `${failed} Failed` : ""}`;

    return (
      <Popover
        open={openPopover === index}
        key={index}

        onOpenChange={(open) => setOpenPopover(open ? index : false)}
      >
        <PopoverTrigger asChild>

          <div
            className={`relative rounded-[2px] overflow-hidden transition-opacity duration-200 opacity-20 hover:opacity-100 ${openPopover === index ? "opacity-100" : "opacity-20"
              }`}
            style={{
              width: `${barWidth}px`,
              height: `${height}px`,
              background: gradient,
              marginLeft: index === 0 ? 0 : "4px",
              borderRadius: "2px",
              cursor: "pointer",
            }}
            onClick={() => setOpenPopover(index)}

          // Optionally, handle click here if you want the whole bar clickable
          >
            <CustomTooltip content={tooltipText} arrowPosition="left" arrowOffset={-12} asChild>
              {/* The tooltip wraps the bar, but asChild lets it pass the ref */}
              <span style={{ display: "block", width: "100%", height: "100%" }} />
            </CustomTooltip>

          </div>

        </PopoverTrigger>
        {/* Popover trigger overlay (unchanged) */}
        {/* <CustomTooltip
          content={`${dayData.date}
${clean ? `${clean} Clean` : ""}
${vulnerable ? `${vulnerable} Vulnerable` : ""}
${critical ? `${critical} Critical` : ""}`}
          arrowPosition="left"
          arrowOffset={1}
        >
          <div
            className="absolute inset-0 cursor-pointer transition-opacity duration-200 opacity-20 hover:opacity-100"
            style={{
              background: "transparent",
              borderRadius: "2px",
              zIndex: 2,
              pointerEvents: "auto",
            }}
            onClick={() => setOpenPopover(index)}
          />
        </CustomTooltip> */}

        <PopoverContent className="w-[360px] p-4 flex flex-col gap-4 shadow-[0px_10px_10px_-5px_#0000000A,0px_20px_25px_-5px_#0000001A] border border-zinc-200 rounded-2xl">
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={16}
              strokeWidth={1}
              className="text-zinc-950 shrink-0"
            />
            <p className="text-xs leading-tight font-medium text-black">
              Security Details - <span>{toShortDate(dayData.date)}</span>
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-2">
              <Label
                htmlFor="total"
                className="py-1 px-2 bg-emerald-50 cursor-pointer border border-transparent rounded-[8px] text-emerald-600 has-[[aria-checked=true]]:border-emerald-300 has-[[aria-checked=true]]:bg-emerald-50 has-[[aria-checked=true]]:text-emerald-600 flex flex-col gap-0.5 items-center text-center"
              >
                <Checkbox
                  id="total"
                  checked={filter === "total"}
                  onCheckedChange={() => setFilter("total")}
                  className="hidden"
                />
                <div className="flex flex-col gap-0.5 items-center text-center">
                  <p className="text-lg leading-6 font-bold text-emerald-600">
                    <span>
                      {dayData.clean +
                        dayData.failed +
                        (dayData.vulnerable || 0)}
                    </span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    Clean
                  </p>
                </div>
              </Label>
              <Label
                htmlFor="Vulnerable"
                className="py-1 px-2 bg-yellow-50 cursor-pointer border border-transparent rounded-[8px] has-[[aria-checked=true]]:border-yellow-300 has-[[aria-checked=true]]:bg-yellow-50 flex flex-col gap-0.5 items-center text-center"
              >
                <Checkbox
                  id="Vulnerable"
                  checked={filter === "vulnerable"}
                  onCheckedChange={() => setFilter("vulnerable")}
                  className="hidden"
                />
                <div className="flex flex-col gap-0.5 items-center text-center">
                  <p className="text-lg leading-6 font-bold text-yellow-600">
                    <span>{dayData.vulnerable}</span>
                  </p>
                  <p className="text-xs leading-[100%] font-normal text-[#71717A]">
                    Vulnerable
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
                    Critical
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
                    : allItems.filter((item) => item.status === filter);

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
    );
  };

  return (
    <div className="flex items-end" style={{ width: "100%", gap: "4px" }}>
      {data.map((dayData, index) => renderBar(dayData, index))}
    </div>
  );
};

function getTimeAgo(timeString) {
  // Accepts "20:59" or similar
  if (!timeString) return "";
  const [hour, min] = timeString.split(":").map(Number);
  const now = new Date();
  const itemDate = new Date(now);
  itemDate.setHours(hour);
  itemDate.setMinutes(min);
  itemDate.setSeconds(0);

  let diff = Math.floor((now - itemDate) / 1000); // in seconds
  if (diff < 0) diff += 24 * 3600; // handle times from earlier today

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  return `${Math.floor(diff / 3600)} hours ago`;
}

const generateBlockedData = (startDateISO, numDays = 7) => {
  const data = [];
  const startDate = new Date(startDateISO);

  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Generate random blocked count
    const blockedCount = Math.floor(Math.random() * 50) + 1; // 1-50 blocked items

    data.push({
      date: currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      blockedCount,
    });
  }

  return data;
};

const BlockedChart = ({ data = [] }) => {
  if (!data.length) return null;

  // Find the maximum blocked count across all days for scaling
  const maxBlocked = Math.max(...data.map((day) => day.blockedCount), 1); // Avoid division by zero

  const color = "#2A9D90";
  const totalWidth = 120;
  const gap = 4;
  const barWidth = (totalWidth - (data.length - 1) * gap) / data.length;

  const renderBar = (dayData, index) => {
    const { blockedCount } = dayData;
    const height = (blockedCount / maxBlocked) * 48; // Scale to max height of 48px

    const tooltipText = `${dayData.date}
${blockedCount} Attacks Blocked`;

    return (
      <CustomTooltip
        content={tooltipText}
        key={index}
        arrowPosition="left"
        arrowOffset={1}
      >
        <div
          className="cursor-pointer transition-opacity duration-200 opacity-20 hover:opacity-100"
          style={{
            width: `${barWidth}px`,
            height: `${height}px`,
            background: color,
            borderRadius: "2px",
          }}
        />
      </CustomTooltip>
    );
  };

  return (
    <div
      className="flex items-end"
      style={{ width: `${totalWidth}px`, gap: `${gap}px` }}
    >
      {data.map((dayData, index) => renderBar(dayData, index))}
    </div>
  );
};

function parseNumber(str) {
  if (!str) return 0;
  // Remove commas and spaces
  let s = str.replace(/,/g, "").replace(/\s/g, "");
  // Handle K (thousands)
  if (s.toUpperCase().endsWith("K")) {
    return parseFloat(s) * 1000;
  }
  return parseFloat(s);
}

const DashboardMainSecurityFirewallWidget = () => {
  // Possible states: "inactive", "active", "off", "hacked"
  const [status, setStatus] = useState("inactive");
  const [backupData] = useState(() => generateSecurityData(new Date().toISOString()));

  const statusDisplay = {
    inactive: {
      color: "text-emerald-600",
      main: "Secure",
      sub: "every site",
      subColor: "text-emerald-800",
      end: "effortlessly.",
      endColor: "text-emerald-950",
      description:
        "Enable advanced security and firewall across all your websites with real-time monitoring, malware scans, bot blocking, and more.",
      btnText: "Protect More Sites",
      btnIcon: (
        <ShieldHalf
          size={16}
          strokeWidth={1.5}
          className="text-white shrink-0"
        />
      ),
    },
    active: {
      color: "text-emerald-600",
      main: "Secure",
      sub: "every site",
      subColor: "text-emerald-800",
      end: "Effortlessly.",
      endColor: "text-emerald-950",
      description:
        "Enable advanced security and firewall across all your websites with real-time monitoring, malware scans, bot blocking, and more.",
      btnText: "Protect More Sites",
      btnIcon: (
        <ShieldHalf
          size={16}
          strokeWidth={1.5}
          className="text-white shrink-0"
        />
      ),
    },
    off: {
      color: "text-emerald-600",
      main: "Secure",
      sub: "every site",
      subColor: "text-emerald-800",
      end: "effortlessly.",
      endColor: "text-emerald-950",
      description:
        "Enable advanced security and firewall across all your websites with real-time monitoring, malware scans, bot blocking, and more.",
      btnText: "Protect More Sites",
      btnIcon: (
        <ShieldHalf
          size={16}
          strokeWidth={1.5}
          className="text-white shrink-0"
        />
      ),
    },
    hacked: {
      color: "text-emerald-600",
      main: "Some sites",
      sub: "need your",
      subColor: "text-emerald-800",
      end: "Attention.",
      endColor: "text-emerald-950",
      description:
        "Issues found on multiple sites. Review and take action to keep your network secure.",
      btnText: "Fix Issues",
      btnIcon: (
        <ShieldAlert
          size={16}
          strokeWidth={1.5}
          className="text-white shrink-0"
        />
      ),
    },
  };

  const securityInfo = {
    inactive: {
      securityTag: "Inactive",
      securityTagBg: "bg-amber-50",
      securityTagBorder: "border-amber-200",
      securityTagColor: "text-amber-600",
    },
    off: {
      securityTag: "34 Active Sites",
      securityTagBg: "bg-emerald-50",
      securityTagBorder: "border-emerald-200",
      securityTagColor: "text-emerald-700",
    },
    active: {
      securityTag: "Active",
      securityTagBg: "bg-emerald-50",
      securityTagBorder: "border-emerald-200",
      securityTagColor: "text-emerald-700",
      securitySitesSecureBg: "bg-sky-50",
      securitySitesSecureIcon: (
        <Stars size={24} strokeWidth={1} className="text-sky-700 shrink-0" />
      ),
      securitySitesSecureText: (
        <p className="text-xs leading-tight font-medium text-sky-700 max-w-[204px]">
          <span className="font-semibold">5 site</span> slots left to secure.
        </p>
      ),
      securitySitesSecureBtnIcon: (
        <Plus size={16} strokeWidth={1} className="text-emerald-900 shrink-0" />
      ),
      securitySitesSecureBtnText: "Add Sites",
      score: "94%",
      scoreColor: "text-emerald-700",
      scoreTag: "Excellent",
      securityScoreIcon: (
        <TrendingUp
          size={16}
          strokeWidth={1}
          className="text-emerald-600 shrink-0"
        />
      ),
      securityScoreTrend: "+3%",
    },
    hacked: {
      securityTag: "15 Vulnerable Sites",
      securityTagBg: "bg-amber-50",
      securityTagBorder: "border-amber-200",
      securityTagColor: "text-amber-600",
      securityHackedTab: "2",
      securityHackedTagBg: "bg-[#FEF2F2]",
      securityHackedTagColor: "text-[#DC2626]",
      securityHackedTagBorder: "border-rose-200",
      securitySitesSecureBg: "bg-zinc-50",
      securitySitesSecureIcon: (
        <AlertTriangle
          size={24}
          strokeWidth={1}
          className="text-amber-600 shrink-0"
        />
      ),
      securitySitesSecureText: (
        <p className="text-xs leading-tight font-medium text-amber-600 max-w-[204px]">
          Immediate action required to prevent security breaches.
        </p>
      ),
      securitySitesSecureBtnIcon: (
        <ShieldCheck
          size={16}
          strokeWidth={1}
          className="text-emerald-900 shrink-0"
        />
      ),
      securitySitesSecureBtnText: "Secure Now",
      score: "56%",
      scoreColor: "text-[#DC2626]",
      scoreTag: "At Risk",
      securityScoreIcon: (
        <TrendingDown
          size={16}
          strokeWidth={1}
          className="text-[#DC2626] shrink-0"
        />
      ),
      securityScoreTrend: "-25%",
    },
  };

  const firewallInfo = {
    inactive: {
      firewallTag: "Inactive",
      firewallTagBg: "bg-amber-50",
      firewallTagBorder: "border-amber-200",
      firewallTagColor: "text-amber-600",
    },
    off: {
      firewallTag: "32 Active Sites",
      firewallTagBg: "bg-emerald-50",
      firewallTagBorder: "border-emerald-200",
      firewallTagColor: "text-emerald-700",
    },
    active: {
      firewallTag: "32 Sites Monitored",
      firewallTagBg: "bg-emerald-50",
      firewallTagBorder: "border-emerald-200",
      firewallTagColor: "text-emerald-700",
      firewallAttacksBlocked: "15,650",
      firewallAttacksBlockedColor: "text-emerald-700",
      firewallBlockedTrendIcon: (
        <TrendingUp
          size={16}
          strokeWidth={1}
          className="text-emerald-600 shrink-0"
        />
      ),
      firewallBlockedTrend: "+12%",
      firewallTotalRequests: "36.5 K",
      firewallRequestsBlocked: "15.65 K",
      firewallRequestsBlockedColor: "text-emerald-700",
      firewallServerLoadReduced: "92%",
      firewallServerLoadReducedColor: "text-[#71717A]",
      firewallProgressbg: "bg-zinc-100 [&>div]:!bg-emerald-950",
      firewallRuleHits: "47",
      firewallTotals: "40",
      firewallBotProtection: "25",
      firewall2FAEnable: "28",
      firewallFirewallOff: "8",
      firewallAlertText: (
        <p className="text-xs leading-tight font-medium text-zinc-600">
          <span className="font-semibold text-zinc-800">
            Firewall is off on 20% of sites
          </span>{" "}
          leading them vulnerable to threats and suspicious traffic.
        </p>
      ),
      firewallAlertBtnText: "Enable Firewall",
      firewall2FAText: (
        <p className="text-xs leading-tight font-medium text-sky-700">
          <span className="font-semibold">
            67% of the sites have 2FA enabled.
          </span>{" "}
          <br />
          Turn it on for the remaining sites to strengthen overall login
          security
        </p>
      ),
    },
    hacked: {
      firewallTag: "Under Heavy Attack",
      firewallTagBg: "bg-[#FEF2F2]",
      firewallTagBorder: "border-red-200",
      firewallTagColor: "text-[#DC2626]",
      firewallAttacksBlocked: "1245",
      firewallAttacksBlockedColor: "text-emerald-700",
      firewallBlockedTrendIcon: (
        <TrendingDown
          size={16}
          strokeWidth={1}
          className="text-[#DC2626] shrink-0"
        />
      ),
      firewallBlockedTrend: "-28%",
      firewallTotalRequests: "36.5 K",
      firewallRequestsBlocked: "1245",
      firewallRequestsBlockedColor: "text-[#DC2626]",
      firewallServerLoadReduced: "52%",
      firewallServerLoadReducedColor: "text-amber-600",
      firewallProgressbg: "bg-zinc-100 [&>div]:!bg-amber-600",
      firewallRuleHits: "47",
      firewallTotals: "40",
      firewallBotProtection: "25",
      firewall2FAEnable: "15",
      firewallFirewallOff: "15",
      firewallAlertText: (
        <p className="text-xs leading-tight font-medium text-zinc-600">
          <span className="font-semibold text-amber-600">
            15 sites have firewall disabled during active attack.
          </span>{" "}
          Enable immediately!
        </p>
      ),
      firewallAlertBtnText: "Enable All",
      firewall2FAText: (
        <p className="text-xs leading-tight font-medium text-sky-700">
          <span className="font-semibold">
            Only 37% of sites have 2FA enabled during attack.
          </span>{" "}
          <br />
          Attackers are targeting login pages. Secure them now.
        </p>
      ),
    },
  };

  firewallInfo.active.firewallProgress = (
    (parseNumber(firewallInfo.active.firewallRequestsBlocked) /
      parseNumber(firewallInfo.active.firewallTotalRequests)) *
    100
  ).toFixed(0);

  firewallInfo.hacked.firewallProgress = (
    (parseNumber(firewallInfo.hacked.firewallRequestsBlocked) /
      parseNumber(firewallInfo.hacked.firewallTotalRequests)) *
    100
  ).toFixed(0);

  const {
    color,
    main,
    sub,
    subColor,
    end,
    endColor,
    description,
    btnText,
    btnIcon,
  } = statusDisplay[status];

  const {
    securityTagBg,
    securityTagBorder,
    securityTagColor,
    securityHackedTab,
    securityHackedTagBg,
    securityHackedTagColor,
    securityHackedTagBorder,
    securitySitesSecureBg,
    securitySitesSecureIcon,
    securitySitesSecureText,
    securitySitesSecureBtnIcon,
    securitySitesSecureBtnText,
    score,
    scoreColor,
    scoreTag,
    securityScoreIcon,
    securityScoreTrend,
  } = securityInfo[status];

  const {
    firewallTag,
    firewallTagBg,
    firewallTagBorder,
    firewallTagColor,
    firewallAttacksBlocked,
    firewallAttacksBlockedColor,
    firewallBlockedTrendIcon,
    firewallBlockedTrend,
    firewallTotalRequests,
    firewallRequestsBlocked,
    firewallRequestsBlockedColor,
    firewallServerLoadReduced,
    firewallServerLoadReducedColor,
    firewallProgress,
    firewallProgressbg,
    firewallRuleHits,
    firewallTotals,
    firewallBotProtection,
    firewall2FAEnable,
    firewallFirewallOff,
    firewallAlertText,
    firewallAlertBtnText,
    firewall2FAText,
  } = firewallInfo[status];

  const totalClean = backupData.reduce((sum, day) => sum + day.clean, 0);
  const totalVulnerable = backupData.reduce(
    (sum, day) => sum + day.vulnerable,
    0
  );
  const totalCritical = backupData.reduce((sum, day) => sum + day.failed, 0);

  const allVulnerableAndCriticalItems = backupData.flatMap((dayData) =>
    generateBackupStatusList(dayData, sites)
      .filter(
        (item) =>
          item.status === "vulnerable" ||
          item.status === "failed" ||
          item.status === "critical"
      )
      .map((item) => ({
        ...item,
        date: dayData.date,
      }))
  );

  const fireWallEvents = [
    // Hacked ones
    {
      id: 1,
      type: "Brute Force Attack",
      status: "hacked",
      active: 245,
      blocked: 12,
      time: "Now",
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
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
      bgActiveColor: "bg-red-50",
      activeColor: "text-[#DC2626]",
    },
    {
      id: 2,
      type: "DDoS Attack",
      status: "hacked",
      active: 219,
      blocked: 89,
      time: "5 mins ago",
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
              fill="#F59E0B"
            />
          </g>
        </svg>
      ),
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
      bgActiveColor: "bg-yellow-50",
      activeColor: "text-yellow-700",
    },
    {
      id: 3,
      type: "SQL Injection",
      status: "hacked",
      active: 1456,
      blocked: 122,
      time: "Last hour",
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
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
      bgActiveColor: "bg-amber-50",
      activeColor: "text-amber-600",
    },
    {
      id: 4,
      type: "Malware Upload",
      status: "hacked",
      active: 74,
      blocked: 15,
      time: "2 hours ago",
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
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
      bgActiveColor: "bg-red-50",
      activeColor: "text-[#DC2626]",
    },
    {
      id: 5,
      type: "XSS Attempt",
      status: "hacked",
      active: 52,
      blocked: 8,
      time: "Today",
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
              fill="#F59E0B"
            />
          </g>
        </svg>
      ),
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
      bgActiveColor: "bg-yellow-50",
      activeColor: "text-yellow-700",
    },

    // Active ones
    {
      id: 6,
      type: "Brute Force Attack",
      status: "active",
      blocked: 45,
      time: "Last hour",
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
              fill="#047857"
            />
          </g>
        </svg>
      ),
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
    },
    {
      id: 7,
      type: "Phishing Attempt",
      status: "active",
      blocked: 30,
      time: "Last 24 hours",
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
              fill="#047857"
            />
          </g>
        </svg>
      ),
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
    },
    {
      id: 8,
      type: "SQL Injection",
      status: "active",
      blocked: 12,
      time: "Last week",
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
              fill="#047857"
            />
          </g>
        </svg>
      ),
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
    },
    {
      id: 9,
      type: "XSS Attempt",
      status: "active",
      blocked: 15,
      time: "Last week",
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
              fill="#047857"
            />
          </g>
        </svg>
      ),
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
    },
    {
      id: 10,
      type: "Malware Upload",
      status: "active",
      blocked: 27,
      time: "2 weeks ago",
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
              fill="#047857"
            />
          </g>
        </svg>
      ),
      bgColor: "bg-zinc-50",
      color: "text-zinc-600",
    },
  ];

  function securityActiveState() {
    return (
      <>
        <div className="flex flex-col gap-8 grow">
          <div className="flex flex-col gap-6">
            <div className="flex py-1 justify-between">
              <div className="flex flex-col w-fit py-1 px-2 gap-0.5">
                <span className="text-base leading-6 font-bold text-[#09090B]">
                  {totalClean}
                </span>
                <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                  Clean Sites
                </p>
              </div>
              <div className="flex flex-col w-fit py-1 px-2 gap-0.5">
                <span className="text-base leading-6 font-bold text-amber-500">
                  {totalVulnerable}
                </span>
                <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                  Vulnerable Sites
                </p>
              </div>
              <div className="flex flex-col w-fit py-1 px-2 gap-0.5">
                <span className="text-base leading-6 font-bold text-[#DC2626]">
                  {totalCritical}
                </span>
                <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                  Critical Sites
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* Grap */}
              <div className="flex w-full h-14 pb-1 border-b border-dashed border-[#E4E4E7]">
                <SecurityStatusBars data={backupData} />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs leading-4 font-normal text-[#71717A]">
                  Last 7 days
                </p>
                <div className="flex items-center w-fit gap-6">
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
                      Clean
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
                          fill="#E8C468"
                        />
                      </g>
                    </svg>
                    <p className="text-xs leading-tight font-normal text-[#09090B]">
                      Vulnerable
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
                      Critical
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex ${status === "hacked" ? "items-start" : "items-center"
              } gap-2.5 py-2 px-4 rounded-[8px] ${securitySitesSecureBg}`}
          >
            {securitySitesSecureIcon}
            <div className="flex items-center justify-between grow">
              {securitySitesSecureText}
              <Button
                className={`!bg-white text-emerald-900 cursor-pointer items-center w-fit text-sm leading-[100%] font-medium !py-2 !px-2 gap-1 h-8 border border-zinc-200 rounded-[6px] shadow-[0_1px_2px_0_#0000000D]`}
              >
                <>
                  {securitySitesSecureBtnIcon}
                  {securitySitesSecureBtnText}
                </>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between pb-[7.01px] border-dashed border-b border-[#E4E4E7]">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span
                  className={`${scoreColor} text-2xl leading-[100%] font-medium`}
                >
                  {score}
                </span>
                <p className="text-2xl leading-[100%] font-medium text-#09090B">
                  Health Score
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-2xl text-center ${securityTagBg} ${securityTagColor} text-xs font-medium h-6`}
                >
                  {scoreTag}
                </span>
              </div>
              <div className="flex items-center gap-[3px]">
                {securityScoreIcon}
                <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                  <span className="font-medium text-[#09090B]">
                    {securityScoreTrend}
                  </span>{" "}
                  from last 7 days
                </p>
              </div>
            </div>
            <DashboardMainSecurityFirewallCircle
              status={status}
              score={score}
            />
          </div>
          <div className="flex flex-col max-h-[121px] relative">
            <p className="sticky top-0 text-sm leading-[17px] font-semibold text-[#09090B] pb-4">
              Recent Issues
            </p>
            <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
              {allVulnerableAndCriticalItems.length === 0 ? (
                <span className="text-xs text-zinc-500">
                  No recent issues detected.
                </span>
              ) : (
                allVulnerableAndCriticalItems.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <div className="flex w-fit pt-0.5">{item.icon}</div>
                      <div className="flex flex-col gap-[7px]">
                        <span className="font-medium text-sm leading-[100%] text-zinc-800">
                          {item.url}
                        </span>
                        <span className="text-xs leading-tight font-normal text-zinc-500">
                          {item.status === "vulnerable"
                            ? "Vulnerable"
                            : "Critical"}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs leading-tight font-normal text-zinc-500">
                      {getTimeAgo(item.time)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  function securityInactiveState() {
    return (
      <>
        <div className="flex flex-col justify-center items-center grow text-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="h-[104px] w-[91px] object-fill overflow-hidden flex items-center justify-center">
              <img
                src={SecurityInactive}
                alt="Security Inactive"
                className="w-full object-cover h-[104px]"
              />
            </div>
            <p className="text-2xl leading-[100%] font-bold text-[#E4E4E7]">
              No scans run.
            </p>
            <div className="flex flex-col items-center gap-[7px] text-[#71717A]">
              <p className="text-sm leading-[100%] font-semibold">
                Scan you website for all threats.
              </p>
              <p className="text-xs leading-tight font-normal">
                {status === "inactive"
                  ? "Activate Security & Firewall to start blocking threats."
                  : "Run your first scan to start detecting threats and stay a step ahead."}
              </p>
            </div>
          </div>
          {status === "inactive" && <div className="flex items-center w-full py-2 px-4 gap-2.5 bg-sky-50 rounded-[8px]">
            <Stars
              size={24}
              strokeWidth={1}
              className="text-sky-700 shrink-0"
            />
            <p className="text-xs leading-tight font-medium text-sky-700">
              10 site slots left to secure.
            </p>
          </div>}
          {status === "inactive" ? (
            <Button
              className={`!bg-emerald-900 text-white cursor-pointer items-center w-fit text-sm leading-[100%] font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px]`}
              onClick={() => setStatus("off")}
            >
              <>
                <Settings2 />
                Enable on all Sites
              </>
            </Button>
          ) : (
            <Button
              className={`!bg-emerald-900 text-white cursor-pointer items-center w-fit text-sm leading-[100%] font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px]`}
              onClick={() => setStatus("active")}
            >
              <>
                <RefreshCcw />
                Scan now
              </>
            </Button>
          )}
        </div>
      </>
    );
  }

  function firewallActiveState() {
    return (
      <>
        {status === "hacked" && (
          <div className="flex items-start gap-4">
            <AlertOctagon
              size={24}
              strokeWidth={1}
              className="text-[#DC2626] shrink-0"
            />
            <div className="flex flex-col gap-1">
              <p className="text-xs leading-tight font-semibold text-[#DC2626]">
                High Volume Attack in Progress.
              </p>
              <p className="text-xs leading-tight font-medium text-zinc-600">
                Your websites are experiencing coordinated attacks. Firewall is
                actively blocking threats but some sites remain vulnerable.
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center border-b border-dashed border-[#E4E4E7] pb-[5px]">
          <div className="flex flex-col gap-1">
            <p className="text-2xl leading-tight font-medium text-[#09090B]">
              <span className={`${firewallAttacksBlockedColor}`}>
                {firewallAttacksBlocked}
              </span>{" "}
              attacks blocked.
            </p>
            <div className="flex items-center gap-[3px]">
              {firewallBlockedTrendIcon}
              <p className="text-sm leading-[100%] font-normal text-[#71717A]">
                <span className="font-medium text-[#09090B]">
                  {firewallBlockedTrend}
                </span>{" "}
                from last 7 days
              </p>
            </div>
          </div>
          <BlockedChart data={generateBlockedData(new Date().toISOString())} />
        </div>
        <div className="flex grow justify-between flex-col gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between py-1">
              <div className="flex flex-col py-1 px-2 gap-0.5 w-[105px]">
                <span className="text-base leading-6 font-bold text-[#09090B]">
                  {firewallTotalRequests}
                </span>
                <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                  Total Requests
                </p>
              </div>
              <div className="flex flex-col py-1 px-2 gap-0.5 w-[118px]">
                <span
                  className={`text-base leading-6 font-bold ${firewallRequestsBlockedColor}`}
                >
                  {firewallRequestsBlocked}
                </span>
                <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                  Requests Blocked
                </p>
              </div>
              <div className="flex flex-col py-1 px-2 gap-0.5 w-[144px]">
                <span
                  className={`text-base leading-6 font-bold ${firewallServerLoadReducedColor}`}
                >
                  {firewallServerLoadReduced}
                </span>
                <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                  Server Load Reduced
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[7px]">
              <div className="flex items-center justify-between">
                <p className="text-sm leading-[100%] font-normal text-[#09090B]">
                  Average Block Rate
                </p>
                <span className="text-sm leading-[100%] font-medium text-[#71717A]">
                  {firewallProgress}%
                </span>
              </div>
              <Progress
                value={Number(firewallProgress)}
                className={`${firewallProgressbg}`}
              />
            </div>
            <div
              className={`flex flex-col ${status === "hacked" ? "gap-6" : "gap-8"
                } ${status === "active" && "pt-2"}`}
            >
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-start p-2 gap-2 bg-zinc-50 border border-[#E4E4E7] rounded-[8px]">
                  <ArrowUpWideNarrow
                    size={16}
                    strokeWidth={1}
                    className="text-[#71717A] shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 text-[#71717A]">
                    <span className="text leading-[100%] font-medium">
                      {firewallRuleHits}
                    </span>
                    <p className="text-sm leading-[100%] font-normal">
                      Rule Hits
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-2 gap-2 bg-zinc-50 border border-[#E4E4E7] rounded-[8px]">
                  <Bot
                    size={16}
                    strokeWidth={1}
                    className="text-[#71717A] shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 text-[#71717A]">
                    <span className=" leading-[100%] font-medium">
                      {firewallBotProtection}/{firewallTotals}
                    </span>
                    <p className="text-sm leading-[100%] font-normal">
                      Bot Protection
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-2 gap-2 bg-zinc-50 border border-[#E4E4E7] rounded-[8px]">
                  <Bot
                    size={16}
                    strokeWidth={1}
                    className="text-[#71717A] shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 text-[#71717A]">
                    <span className=" leading-[100%] font-medium">
                      {firewall2FAEnable}/{firewallTotals}
                    </span>
                    <p className="text-sm leading-[100%] font-normal">
                      2FA Enabled
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-2 gap-2 bg-amber-50 border border-amber-200 rounded-[8px]">
                  <AlertTriangle
                    size={16}
                    strokeWidth={1}
                    className="text-amber-600 shrink-0"
                  />
                  <div className="flex flex-col gap-1.5 text-amber-600">
                    <span className=" leading-[100%] font-medium">
                      {firewallFirewallOff}
                    </span>
                    <p className="text-sm leading-[100%] font-normal">
                      Firewall Off
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-zinc-50 py-2 px-4">
                <AlertTriangle
                  size={24}
                  strokeWidth={1}
                  className="text-amber-600 shrink-0"
                />
                <div
                  className={`${status === "hacked" ? "max-w-[419px]" : "max-w-[389px]"
                    } w-full`}
                >
                  {firewallAlertText}
                </div>
                <Button
                  className={`!bg-white text-emerald-900 cursor-pointer items-center w-fit text-xs leading-[100%] font-medium !py-2 !px-2 gap-1 h-8 rounded-[6px] border border-zinc-200 shadow-[0_1px_2px_0_#0000000D]`}
                >
                  <>
                    <Settings2
                      size={16}
                      strokeWidth={1}
                      className="text-emerald-900 shrink-0"
                    />
                    {firewallAlertBtnText}
                  </>
                </Button>
              </div>
              <div className="flex items-center gap-4 py-2 px-4 bg-sky-50">
                <Stars
                  size={24}
                  strokeWidth={1}
                  className="text-sky-700 shrink-0"
                />
                <div className="max-w-[412px] w-full">{firewall2FAText}</div>
                <Button
                  className={`!bg-white text-emerald-900 cursor-pointer items-center w-fit text-sm leading-[100%] font-medium !py-2 !px-2 gap-1 h-8 rounded-[6px] border border-zinc-200 shadow-[0_1px_2px_0_#0000000D]`}
                >
                  <>
                    <Settings2
                      size={16}
                      strokeWidth={1}
                      className="text-emerald-900 shrink-0"
                    />
                    Enable 2FA
                  </>
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col relative ${status === "hacked" ? "max-h-[222px]" : "max-h-[261px]"
              }`}
          >
            <p className="text-sm leading-[17px] font-semibold text-[#09090B] pb-4 sticky top-0">
              Recent Blocks
            </p>
            <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
              {fireWallEvents
                .filter((event) => event.status === status) // ✅ only show hacked or active
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-start gap-4"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex pt-0.5">{event.icon}</div>
                      <div className="flex flex-col gap-[7px] max-w-[510px] w-full">
                        <span className="font-medium text-sm leading-[100%] text-[#27272A]">
                          {event.type}
                        </span>
                        <div className="flex items-center gap-2">
                          {event.status === "hacked" && (
                            <span
                              className={`${event.bgActiveColor} ${event.activeColor} px-2 py-1 rounded-2xl text-xs leading-tight h-6`}
                            >
                              {event.active} Active
                            </span>
                          )}
                          <span
                            className={`${event.bgColor} ${event.color} px-2 py-1 rounded-2xl text-xs leading-tight h-6`}
                          >
                            {event.blocked} Blocked
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Right side - time */}
                    <span className="text-[#71717A] text-xs leading-tight font-normal">
                      {event.time}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  function firewallInactiveState() {
    return (
      <>
        <div className="flex flex-col justify-center grow items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-[13px]">
            <div className="h-[105px] w-[105px] object-fill overflow-hidden flex items-center justify-center">
              <img
                src={FirewallInactive}
                alt="Firewall Inactive"
                className="w-[full] object-cover h-[105px]"
              />
            </div>
            <p className="text-2xl leading-[100%] font-bold text-[#E4E4E7]">
              No events yet.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-[7px] text-[#71717A]">
              <p className="text-sm leading-[100%] font-semibold">
                Your firewall is active, but no requests have been analyzed yet.
              </p>
              <p className="text-xs leading-tight font-normal">
                Traffic insights and threat blocks will show up once data starts
                flowing.
              </p>
            </div>
            {status === "inactive" && (
              <Button
                className={`!bg-emerald-900 text-white cursor-pointer items-center w-fit text-sm leading-[100%] font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px]`}
                onClick={() => setStatus("off")}
              >
                <>
                  <Settings2 />
                  Enable Protection on All Sites
                </>
              </Button>
            )}
          </div>
          {status === "inactive" && (
            <div className="flex flex-col items-center bg-zinc-50 rounded-[12px] p-4 w-fit">
              <ul className="grid grid-cols-2 w-[369px] gap-y-4 [&>li]:relative [&>li]:pl-[18px] [&>li]:before:absolute [&>li]:before:top-1/2 [&>li]:before:left-[0px] [&>li]:before:h-[8px] [&>li]:before:w-[8px] [&>li]:before:-translate-y-1/2 [&>li]:before:rounded-full [&>li]:before:bg-zinc-300 [&>li]:before:content-['']  bg-zinc-50 rounded-[12px] text-xs font-normal leading-tight text-[#71717A] text-left">
                <li>Activate Bot Shield</li>
                <li>Login Lockdown</li>
                <li>Instant Threat Block</li>
                <li>Real-Time Bot Defense</li>
                <li>Secure Your Site</li>
                <li>Auto-Block Malicious Traffic</li>
                <li>24/7 Firewall On</li>
                <li>One-Click Protection</li>
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="firewall w-fit firewall overflow-hidden min-h-[896px] h-full max-h-[896px] border border-[#E4E4E7] rounded-2xl shadow-[0px_1px_2px_0px_#0000000D] flex gap-0">
      {/* Left Sections */}
      <div className="min-h-[896px] max-h-[896px] flex flex-col gap-10 !min-w-[447.5px] w-full max-w-[447.5px] py-6 h-full bg-[linear-gradient(156.97deg,_#ECFDF5_0.37%,_#FFFFFF_38.47%)] shadow-[0px_1px_2px_0px_#0000000D]">
        <div className="flex flex-col pt-4 pr-8 pb-2 pl-6 gap-4">
          <p
            className={`flex flex-col max-w-[210px] w-full text-base leading-[100%] font-bold ${color}`}
          >
            {main}
            <span className={`text-2xl ${subColor}`}>{sub}</span>{" "}
            <span className={`text-4xl ${endColor}`}>{end}</span>
          </p>
          <p className="text-xs leading-tight font-normal text-[#09090B]">
            {description}
          </p>
          <Button
            className={`!bg-emerald-900 text-white cursor-pointer items-center w-fit text-sm leading-4 font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px]`}
            onClick={() => setStatus("active")}
          >
            <>
              {btnIcon}
              {btnText}
            </>
          </Button>
        </div>
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
        <div className="flex flex-col gap-8 grow pl-6 pr-8">
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={24}
              strokeWidth={2}
              className="text-zinc-950 shrink-0"
            />
            <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
              Security
            </p>
            {(status === "active" || status === "off") &&

              <span
                className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border ${securityTagBg} ${securityTagColor} ${securityTagBorder} text-xs font-medium cursor-default leading-tight`}
              >
                {totalClean + totalCritical + totalVulnerable} Active Sites
              </span>}
            {
              status === "inactive" && (
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border ${securityTagBg} ${securityTagColor} ${securityTagBorder} text-xs font-medium cursor-default leading-tight`}
                >
                  Inactive
                </span>
              )
            }
            {status === "hacked" && (
              <><span
                className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border ${securityTagBg} ${securityTagColor} ${securityTagBorder} text-xs font-medium cursor-default leading-tight`}
              >
                {totalVulnerable} Vulnerable Sites
              </span>
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border ${securityHackedTagBorder} ${securityHackedTagBg} ${securityHackedTagColor} text-xs font-medium cursor-default leading-tight`}
                >
                  {securityHackedTab} Hacked
                </span>
              </>
            )}
          </div>
          {status === "inactive" || status === "off"
            ? securityInactiveState()
            : securityActiveState()}
        </div>
      </div>

      {/* Right Sections */}
      <div className="min-h-[896px] max-h-[896px] flex flex-col !min-w-[654.5px] w-full max-w-[654.5px] py-6 pr-6 pl-8 border-l border-[#E4E4E7] h-full bg-white shadow-[0px_1px_2px_0px_#0000000D]">
        <div
          className={`flex flex-col pt-4 ${status === "hacked" ? "gap-8" : "gap-10"
            } grow`}
        >
          <div className="flex items-center gap-2">
            <Flame
              size={24}
              strokeWidth={2}
              className="text-zinc-950 shrink-0"
            />
            <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
              Firewall
            </p>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-[6px] text-center border ${firewallTagBg} ${firewallTagColor} ${firewallTagBorder} text-xs font-medium cursor-default leading-4`}
            >
              {firewallTag}
            </span>
          </div>
          {status === "inactive" || status === "off"
            ? firewallInactiveState()
            : firewallActiveState()}
        </div>
      </div>
    </div >
  );
};

export default DashboardMainSecurityFirewallWidget;
