import {
  ArrowUpRight,
  Locate,
  Notebook,
  RefreshCcw,
  ShieldCheck,
  Timer,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AuditLogsClear from "@/assets/dashboard-main-global/dashboard-main-audit-logs-empty.gif";

const getResponsiveClass = (width) => {
  if (width > 1980) {
    return "min-w-[464px] w-full max-w-[464px] max-h-[824px] h-full min-h-[824px]";
  }
  if (width > 1440) {
    return "min-w-[464px] w-full max-w-[464px] max-h-[824px] h-full min-h-[824px]";
  }
  return "min-w-[544px] w-full max-w-[544px] max-h-[560px] h-full min-h-[560px]";
};

const getAlertResponsiveClass = (width) => {
  if (width > 1980) {
    return "max-h-[639px] min-h-[639px] h-full";
  }
  if (width > 1440) {
    return "max-h-[639px] min-h-[639px] h-full";
  }
  return "max-h-[375px] min-h-[375px] h-full";
};

const DashboardMainAuditLog = () => {
  const [isAuditLogsEmpty, setIsAuditLogsEmpty] = useState(true);
  const [, setResponsiveClass] = useState(
    getResponsiveClass(window.innerWidth)
  );

  const [, setAlertResponsiveClass] = useState(
    getAlertResponsiveClass(window.innerWidth)
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setResponsiveClass(getResponsiveClass(window.innerWidth));
      setAlertResponsiveClass(getAlertResponsiveClass(window.innerWidth));
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Security Scan Completed",
      site: "http://readydoll.s4-taskwp.com",
      status: "Clean",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "WPRemote",
      ip: "180.151.119.15",
      time: "2m ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 2,
      title: "Backup Completed Successfully",
      site: "http://usingsamplesthename.com",
      status: "Clean",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "System",
      ip: "180.151.119.15",
      time: "15m ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 3,
      title: "WordPress Core Updated",
      site: "http://usingsamplesthename.com",
      status: "Clean",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "John Doe",
      ip: "180.151.119.15",
      time: "30m ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 4,
      title: "Plugin Update",
      site: "http://usingsamplesthename.com",
      status: "Failed",
      statusBg: "bg-red-50",
      statuscolor: "text-[#DC2626]",
      by: "John Doe",
      ip: "180.151.119.15",
      time: "1m ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 5,
      title: "New Admin User",
      site: "http://usingsamplesthename.com",
      status: "Access granted",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "Michael P",
      ip: "180.151.119.15",
      time: "4hr ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 6,
      title: "Airlift Enabled",
      site: "http://usingsamplesthename.com",
      status: "Clean",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "John Doe",
      ip: "180.151.119.15",
      time: "6hr ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 7,
      title: "Staging Created",
      site: "http://usingsamplesthename.com",
      status: "Successful",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "Jack D",
      ip: "180.151.119.15",
      time: "12hr ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 8,
      title: "Test Restore Initiated",
      site: "http://usingsamplesthename.com",
      status: "Clean",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "Jack D",
      ip: "180.151.119.15",
      time: "12hr ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 9,
      title: "Auto-Installed Plugin on Site",
      site: "http://usingsamplesthename.com",
      status: "Clean",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "System",
      ip: "180.151.119.15",
      time: "24hr ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
    {
      id: 10,
      title: "BV Plugin Auto-Update Toggled",
      site: "http://usingsamplesthename.com",
      status: "Clean",
      statusBg: "bg-emerald-50",
      statuscolor: "text-emerald-700",
      by: "WPRemote",
      ip: "180.151.119.15",
      time: "24hr ago",
      dotIcon: (
        <svg
          width="8"
          height="9"
          viewBox="0 0 8 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z"
            fill="#22C55E"
          />
        </svg>
      ),
      Icon: (
        <div className="flex items-center justify-center min-w-[26px] w-full max-w-[26px] min-h-[26px] h-full max-h-[26px]">
          <ShieldCheck
            size={24}
            strokeWidth={1}
            className="text-zinc-950 shrink-0"
          />
        </div>
      ),
    },
  ];

  function emptyAuditLogsTop() {
    return (
      <>
        <div className="flex flex-col w-full items-end gap-6">
          <p className="flex flex-col gap-[5px] text-4xl leading-[100%] font-bold text-emerald-950 text-right">
            <span className="flex flex-col gap-2 text-2xl leading-[100%] font-bold text-emerald-800">
              <span className="text-base leading-[100%] font-bold text-emerald-700">
                Stay ahead
              </span>
              with real-time
            </span>
            Data & Insights!
          </p>
          <p className="text-right text-xs leading-tight font-normal text-[#09090B]">
            Monitor all site activities & changes from one powerful dashboard
          </p>
        </div>
      </>
    );
  }

  function allAuditLogs() {
    return (
      <>
        <div
          className={`flex flex-col gap-6 max-h-[711px] min-h-[375px] h-full overflow-y-scroll scrollbar-hide`}
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col gap-0 border border-zinc-100 rounded-[10px]"
            >
              <div className="flex items-start justify-between gap-4 py-4 px-2">
                <div className="flex items-start gap-4">
                  {notification.Icon}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 1.5C6.4 1.5 7 2.1 7 4.5C7 6.9 6.4 7.5 4 7.5C1.6 7.5 1 6.9 1 4.5C1 2.1 1.6 1.5 4 1.5Z" fill="#22C55E" />
                      </svg>

                      <span className="text-sm leading-[100%] font-medium text-[#18181B]">
                        {notification.title}
                      </span>
                    </div>
                    <span className="text-xs leading-tight font-normal text-[#71717A]">
                      {notification.site}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded-2xl text-center ${notification.statusBg} ${notification.statuscolor} text-xs font-medium cursor-default leading-[1.15]`}
                >
                  {notification.status}
                </span>
              </div>
              <div className="flex items-center py-2.5 px-4 justify-between">
                <div className="flex gap-1 justify-start text-left">
                  <User
                    size={12}
                    strokeWidth={1}
                    className="text-[#71717A] shrink-0"
                  />
                  <span className="text-xs leading-tight font-normal text-zinc-700">
                    {notification.by}
                  </span>
                </div>
                <div className="flex gap-1 justify-center text-center">
                  <Locate
                    size={12}
                    strokeWidth={1}
                    className="text-[#71717A] shrink-0"
                  />
                  <span className="text-xs leading-tight font-normal text-zinc-700">
                    {notification.ip}
                  </span>
                </div>
                <div className="flex gap-1 justify-end text-right">
                  <Timer
                    size={12}
                    strokeWidth={1}
                    className="text-[#71717A] shrink-0"
                  />
                  <span className="text-xs leading-tight font-normal text-zinc-700">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  function emptyAuditLogs() {
    return (
      <>
        <div className="flex flex-col items-center justify-center grow gap-4 text-center">
          <div className="h-32 w-[199px] object-fill overflow-hidden flex items-center justify-center">
            <img
              src={AuditLogsClear}
              alt="Audit Logs Clear"
              className="w-full object-cover h-32"
            />
          </div>
          <div className="flex flex-col gap-2 text-[#71717A]">
            <p className="text-sm leading-[100%] font-semibold">
              No Recent Activity
            </p>
            <p className="text-xs leading-tight font-normal">
              Key actions, updates, and changes will show up
              <br />
              here as they happen.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`max-w-[544px] w-full min-w-[464px] min-h-[560px] h-full max-h-[896px] activity-log flex flex-col pt-8 pb-6 px-6 ${isAuditLogsEmpty && windowWidth >= 1920
        ? "bg-[linear-gradient(192.43deg,_#ECFDF5_15.31%,_#FFFFFF_42.62%)]"
        : `bg-white`
        } rounded-2xl border border-[#E4E4E7] shadow-[0_1px_1px_0_#0000000D] gap-8`}
    >
      {isAuditLogsEmpty && windowWidth >= 1920 && emptyAuditLogsTop()}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Notebook
            size={24}
            strokeWidth={2}
            className="text-zinc-950 shrink-0"
          />
          <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
            Audit Logs
          </p>
          {!isAuditLogsEmpty && (
            <span className="nline-block px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium leading-4 cursor-default h-5">
              {notifications.length} New!
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="!border !bg-transparent !border-zinc-200 text-emerald-900 text-sm leading-[100%] font-medium !py-2 !px-4 gap-2 h-8 rounded-[6px] cursor-pointer shadow-[0px_1px_2px_0px_#0000000D]"
            onClick={() => setIsAuditLogsEmpty(false)}
          >
            <RefreshCcw
              size={16}
              strokeWidth={1.5}
              className="text-emerald-900 shrink-0"
            />
            Refresh
          </Button>
          <Button className="!bg-white text-emerald-900 !p-1 max-w-8 min-w-8 w-full h-8 rounded-[6px] border border-zinc-200 cursor-pointer shadow-[0px_1px_2px_0px_#0000000D]">
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="text-emerald-900 shrink-0"
            />
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between grow gap-8">
        {isAuditLogsEmpty ? emptyAuditLogs() : allAuditLogs()}
        <div className="flex items-center gap-2 py-2 h-8">
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
          <p className="text-xs leading-tight font-normal text-[#09090B]">
            Last Updated: <span className="font-semibold">2 minutes ago</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainAuditLog;
