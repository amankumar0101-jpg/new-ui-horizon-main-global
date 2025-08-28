import React from "react";
import {
  ArrowUpRight,
  BookUp2,
  BookUser,
  Crown,
  Settings2,
  ShieldEllipsis,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardMainAccountSummaryWidget = () => {
  const addons = [
    {
      id: 1,
      name: "Real time backups",
      icon: (
        <Timer size={12} strokeWidth={0.8} className="text-zinc-600 shrink-0" />
      ),
    },
    {
      id: 2,
      name: "Advanced Security",
      icon: (
        <ShieldEllipsis
          size={12}
          strokeWidth={0.8}
          className="text-zinc-600 shrink-0"
        />
      ),
    },
    {
      id: 3,
      name: "Airlift",
      icon: (
        <ShieldEllipsis
          size={12}
          strokeWidth={0.8}
          className="text-zinc-600 shrink-0"
        />
      ),
    },
    {
      id: 4,
      name: "Advanced Security",
      icon: (
        <ShieldEllipsis
          size={12}
          strokeWidth={0.8}
          className="text-zinc-600 shrink-0"
        />
      ),
    },
    {
      id: 5,
      name: "Addon 4",
      icon: (
        <ShieldEllipsis
          size={12}
          strokeWidth={0.8}
          className="text-zinc-600 shrink-0"
        />
      ),
    },
    {
      id: 6,
      name: "Addon 4",
      icon: (
        <ShieldEllipsis
          size={12}
          strokeWidth={0.8}
          className="text-zinc-600 shrink-0"
        />
      ),
    },
    {
      id: 7,
      name: "Addon 4",
      icon: (
        <ShieldEllipsis
          size={12}
          strokeWidth={0.8}
          className="text-zinc-600 shrink-0"
        />
      ),
    },
  ];

  // const [showUpdatePlan, setShowUpdatePlan] = React.useState(false);
  const [addOnCount, setAddOnCount] = React.useState(3);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1920) {
        setAddOnCount(3);
      } else {
        setAddOnCount(4);
      }
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="account-summary flex flex-col gap-8 max-w-[544px] w-full min-w-[440px] max-h-[560px] h-full min-h-[448px] shadow-[0_1px_2px_0_0000000D] bg-white p-6 border border-[#E4E4E7] rounded-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookUser
            size={24}
            strokeWidth={2}
            className="text-[#18181B] shrink-0"
          />
          <p className="text-lg leading-[100%] font-semibold text-[#09090B]">
            Account Summary
          </p>
          <span
            className={`flex items-center justify-center px-2.5 py-0.5 rounded-[6px] text-center border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium cursor-default leading-[1.15]`}
          >
            Total Plans: 3
          </span>
        </div>
        <div className="flex items-center gap-4 w-fit">
          {windowWidth < 1920 && (
            <Button className="!bg-white text-emerald-900 !p-1 max-w-8 min-w-8 w-full h-8 rounded-[6px] border border-zinc-200 shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer">
              <Settings2
                size={16}
                strokeWidth={1.5}
                className="text-emerald-900 !shrink-0"
              />
            </Button>
          )}
          <Button className="!bg-white text-emerald-900 !p-1 max-w-8 min-w-8 w-full h-8 rounded-[6px] border border-zinc-200 shadow-[0px_1px_2px_0px_#0000000D] cursor-pointer">
            <ArrowUpRight
              size={16}
              strokeWidth={1.5}
              className="text-emerald-900 shrink-0"
            />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-0 max-h-[448px] h-full min-h-[336px]">
        <div className="flex flex-col grow justify-between gap-6">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center py-[0.5px] gap-2">
              <Crown size={16} strokeWidth={1} className="text-zinc-950" />
              <p className="text-sm leading-[100%] font-semibold text-[#09090B]">
                Plan Distribution
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-start gap-2 p-2.5 py-[9px] border border-zinc-100 rounded-[8px]">
                <div className="flex min-w-[54px] w-full max-w-[54px]">
                  {/* Plus */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5789 4.80436C24.2736 3.9257 23.6189 2.66703 22.4642 2.66703H13.5096C13.2671 2.66526 13.0283 2.7259 12.816 2.84312C12.6037 2.96034 12.4252 3.1302 12.2976 3.33636L5.52157 14.611C4.9869 15.499 5.6589 16.607 6.73223 16.607H11.3042L6.99757 27.3604C6.3749 28.7204 8.05757 29.9644 9.18823 28.9804L26.6669 12.4417H17.5349L23.5789 4.80436Z"
                      fill="url(#paint0_linear_10284_22)"
                      fillOpacity="0.9"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10284_22"
                        x1="19.3337"
                        y1="2.66699"
                        x2="14.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#BFBFBF" />
                        <stop offset="0.5" stopColor="#F5F5F5" />
                        <stop offset="1" stopColor="#C8C8C8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex grow flex-col gap-1">
                  <span className="text-lg leading-7 font-bold text-[#09090B]">
                    Plus
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                      <span className="font-bold text-sm">10/</span>10 Sites
                    </p>
                    <p className="py-1 px-2 h-[23px] flex items-center justify-center rounded-2xl bg-zinc-50 text-xs leading-[100%] font-normal text-zinc-600">
                      / Yr.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2.5 py-[9px] border border-zinc-100 rounded-[8px]">
                <div className="flex min-w-[54px] w-full max-w-[54px]">
                  {/* Prime */}
                  <svg
                    width="40"
                    height="32"
                    viewBox="0 0 40 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5789 4.80436C24.2736 3.9257 23.6189 2.66703 22.4642 2.66703H13.5096C13.2671 2.66526 13.0283 2.7259 12.816 2.84312C12.6037 2.96034 12.4252 3.1302 12.2976 3.33636L5.52157 14.611C4.9869 15.499 5.6589 16.607 6.73223 16.607H11.3042L6.99757 27.3604C6.3749 28.7204 8.05757 29.9644 9.18823 28.9804L26.6669 12.4417H17.5349L23.5789 4.80436Z"
                      fill="url(#paint0_linear_10284_13764)"
                      fillOpacity="0.9"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31.5789 4.80436C32.2736 3.9257 31.6189 2.66703 30.4642 2.66703H21.5096C21.2671 2.66526 21.0283 2.7259 20.816 2.84312C20.6037 2.96034 20.4252 3.1302 20.2976 3.33636L13.5216 14.611C12.9869 15.499 13.6589 16.607 14.7322 16.607H19.3042L14.9976 27.3604C14.3749 28.7204 16.0576 29.9644 17.1882 28.9804L34.6669 12.4417H25.5349L31.5789 4.80436Z"
                      fill="url(#paint1_linear_10284_13764)"
                      fillOpacity="0.75"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10284_13764"
                        x1="19.3337"
                        y1="2.66699"
                        x2="14.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#BFBFBF" />
                        <stop offset="0.5" stopColor="#F5F5F5" />
                        <stop offset="1" stopColor="#C8C8C8" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_10284_13764"
                        x1="27.3337"
                        y1="2.66699"
                        x2="22.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#172153" />
                        <stop offset="0.644329" stopColor="#B5BFDC" />
                        <stop offset="1" stopColor="#070F26" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex grow flex-col gap-1">
                  <span className="text-lg leading-7 font-bold text-[#09090B]">
                    Prime
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                      <span className="font-bold text-sm">10/</span>12 Sites
                    </p>
                    <p className="py-1 px-2 h-[23px] flex items-center justify-center rounded-2xl bg-zinc-50 text-xs leading-[100%] font-normal text-zinc-600">
                      / Yr.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2.5 py-[9px] border border-zinc-100 rounded-[8px]">
                <div className="flex min-w-[54px] w-full max-w-[54px]">
                  {/* Pro */}
                  <svg
                    width="52"
                    height="32"
                    viewBox="0 0 52 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5789 4.80436C24.2736 3.9257 23.6189 2.66703 22.4642 2.66703H13.5096C13.2671 2.66526 13.0283 2.7259 12.816 2.84312C12.6037 2.96034 12.4252 3.1302 12.2976 3.33636L5.52157 14.611C4.9869 15.499 5.6589 16.607 6.73223 16.607H11.3042L6.99757 27.3604C6.3749 28.7204 8.05757 29.9644 9.18823 28.9804L26.6669 12.4417H17.5349L23.5789 4.80436Z"
                      fill="url(#paint0_linear_10284_13785)"
                      fillOpacity="0.9"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M33.5789 4.80436C34.2736 3.9257 33.6189 2.66703 32.4642 2.66703H23.5096C23.2671 2.66526 23.0283 2.7259 22.816 2.84312C22.6037 2.96034 22.4252 3.1302 22.2976 3.33636L15.5216 14.611C14.9869 15.499 15.6589 16.607 16.7322 16.607H21.3042L16.9976 27.3604C16.3749 28.7204 18.0576 29.9644 19.1882 28.9804L36.6669 12.4417H27.5349L33.5789 4.80436Z"
                      fill="url(#paint1_linear_10284_13785)"
                      fillOpacity="0.75"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M43.5789 4.80436C44.2736 3.9257 43.6189 2.66703 42.4642 2.66703H33.5096C33.2671 2.66526 33.0283 2.7259 32.816 2.84312C32.6037 2.96034 32.4252 3.1302 32.2976 3.33636L25.5216 14.611C24.9869 15.499 25.6589 16.607 26.7322 16.607H31.3042L26.9976 27.3604C26.3749 28.7204 28.0576 29.9644 29.1882 28.9804L46.6669 12.4417H37.5349L43.5789 4.80436Z"
                      fill="url(#paint2_linear_10284_13785)"
                      fillOpacity="0.75"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10284_13785"
                        x1="19.3337"
                        y1="2.66699"
                        x2="14.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#BFBFBF" />
                        <stop offset="0.5" stopColor="#F5F5F5" />
                        <stop offset="1" stopColor="#C8C8C8" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_10284_13785"
                        x1="29.3337"
                        y1="2.66699"
                        x2="24.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#172153" />
                        <stop offset="0.644329" stopColor="#B5BFDC" />
                        <stop offset="1" stopColor="#070F26" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_10284_13785"
                        x1="39.3337"
                        y1="2.66699"
                        x2="34.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FF8B67" />
                        <stop offset="0.644329" stopColor="#FFDACE" />
                        <stop offset="1" stopColor="#FF7B53" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex flex-col grow gap-1">
                  <span className="text-lg leading-7 font-bold text-[#09090B]">
                    Pro
                  </span>
                  <div className="flex items-center justify-between">
                    <p className="text-xs leading-[100%] font-normal text-[#09090B]">
                      <span className="font-bold text-sm">10/</span>15 Sites
                    </p>
                    <p className="py-1 px-2 h-[23px] flex items-center justify-center rounded-2xl bg-zinc-50 text-xs leading-[100%] font-normal text-zinc-600">
                      / Yr.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 p-2.5 py-[9px] border border-zinc-100 rounded-[8px]">
                <div className="flex min-w-[54px] w-full max-w-[54px]">
                  {/* Max */}
                  <svg
                    width="56"
                    height="32"
                    viewBox="0 0 56 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.5789 4.80436C24.2736 3.9257 23.6189 2.66703 22.4642 2.66703H13.5096C13.2671 2.66526 13.0283 2.7259 12.816 2.84312C12.6037 2.96034 12.4252 3.1302 12.2976 3.33636L5.52157 14.611C4.9869 15.499 5.6589 16.607 6.73223 16.607H11.3042L6.99757 27.3604C6.3749 28.7204 8.05757 29.9644 9.18823 28.9804L26.6669 12.4417H17.5349L23.5789 4.80436Z"
                      fill="url(#paint0_linear_10284_13810)"
                      fillOpacity="0.9"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31.5789 4.80436C32.2736 3.9257 31.6189 2.66703 30.4642 2.66703H21.5096C21.2671 2.66526 21.0283 2.7259 20.816 2.84312C20.6037 2.96034 20.4252 3.1302 20.2976 3.33636L13.5216 14.611C12.9869 15.499 13.6589 16.607 14.7322 16.607H19.3042L14.9976 27.3604C14.3749 28.7204 16.0576 29.9644 17.1882 28.9804L34.6669 12.4417H25.5349L31.5789 4.80436Z"
                      fill="url(#paint1_linear_10284_13810)"
                      fillOpacity="0.75"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M39.5789 4.80436C40.2736 3.9257 39.6189 2.66703 38.4642 2.66703H29.5096C29.2671 2.66526 29.0283 2.7259 28.816 2.84312C28.6037 2.96034 28.4252 3.1302 28.2976 3.33636L21.5216 14.611C20.9869 15.499 21.6589 16.607 22.7322 16.607H27.3042L22.9976 27.3604C22.3749 28.7204 24.0576 29.9644 25.1882 28.9804L42.6669 12.4417H33.5349L39.5789 4.80436Z"
                      fill="url(#paint2_linear_10284_13810)"
                      fillOpacity="0.75"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M47.5789 4.80436C48.2736 3.9257 47.6189 2.66703 46.4642 2.66703H37.5096C37.2671 2.66526 37.0283 2.7259 36.816 2.84312C36.6037 2.96034 36.4252 3.1302 36.2976 3.33636L29.5216 14.611C28.9869 15.499 29.6589 16.607 30.7322 16.607H35.3042L30.9976 27.3604C30.3749 28.7204 32.0576 29.9644 33.1882 28.9804L50.6669 12.4417H41.5349L47.5789 4.80436Z"
                      fill="url(#paint3_linear_10284_13810)"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10284_13810"
                        x1="19.3337"
                        y1="2.66699"
                        x2="14.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#BFBFBF" />
                        <stop offset="0.5" stopColor="#F5F5F5" />
                        <stop offset="1" stopColor="#C8C8C8" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_10284_13810"
                        x1="27.3337"
                        y1="2.66699"
                        x2="22.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#172153" />
                        <stop offset="0.644329" stopColor="#B5BFDC" />
                        <stop offset="1" stopColor="#070F26" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_10284_13810"
                        x1="35.3337"
                        y1="2.66699"
                        x2="30.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FF8B67" />
                        <stop offset="0.644329" stopColor="#FFDACE" />
                        <stop offset="1" stopColor="#FF7B53" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_10284_13810"
                        x1="43.3337"
                        y1="2.66699"
                        x2="38.0003"
                        y2="18.0003"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#ECB307" />
                        <stop offset="0.644329" stopColor="#FFECB3" />
                        <stop offset="1" stopColor="#ECB307" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex flex-col grow gap-1">
                  <span className="text-lg leading-7 font-bold text-[#09090B]">
                    Max
                  </span>
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-2xl text-center bg-emerald-50 text-emerald-700 text-xs font-normal  cursor-default h-[23px] w-fit`}
                  >
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10.25V2.75C2 2.41848 2.1317 2.10054 2.36612 1.86612C2.60054 1.6317 2.91848 1.5 3.25 1.5M2 10.25C2 10.5815 2.1317 10.8995 2.36612 11.1339C2.60054 11.3683 2.91848 11.5 3.25 11.5H10V1.5H9M2 10.25C2 9.91848 2.1317 9.60054 2.36612 9.36612C2.60054 9.1317 2.91848 9 3.25 9H10M6 7V4M6 4L4.5 5.5M6 4L7.5 5.5M4.5 3L6 1.5L7.5 3" stroke="#047857" strokeWidth="0.8" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span>Upgrade</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 4H8.5M8.5 4V9M8.5 4L3.5 9" stroke="#047857" strokeWidth="0.8" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2 border border-zinc-50 rounded-[8px] py-[7px] pl-2 pr-2.5">
                <p className="text-sm leading-[100%] font-semibold text-[#71717A]">
                  Add Ons :
                </p>
                <div className="flex items-center flex-wrap gap-2">
                  {addons.slice(0, addOnCount).map((addon) => (
                    <span
                      key={addon.id}
                      className="flex items-center justify-center truncate gap-1 px-2 py-1 rounded-2xl text-center bg-zinc-50 text-zinc-600 text-xs font-normal leading-tight cursor-default h-6"
                    >
                      {addon.icon}
                      {addon.name}
                    </span>
                  ))}
                  {addons.length > addOnCount && (
                    <span className="flex items-center px-2 py-1 rounded-2xl text-center bg-zinc-50 text-zinc-600 text-xs font-normal leading-4 cursor-default h-6">
                      +{addons.length - addOnCount}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_120px_1fr] gap-[18px]">
                <div className="flex flex-col p-2 gap-2">
                  <span className="text-lg leading-[100%] font-bold text-zinc-600">
                    50
                  </span>
                  <p className="text-xs leading-4 font-normal text-[#09090B]">
                    Total Site Capacity
                  </p>
                </div>
                <div className="flex flex-col p-2 gap-2">
                  <span className="text-lg leading-[100%] font-bold text-emerald-700">
                    42
                  </span>
                  <p className="text-xs leading-4 font-normal text-[#09090B]">
                    Sites In Use
                  </p>
                </div>
                <div className="flex flex-col p-2 gap-2">
                  <span className="text-lg leading-[100%] font-bold text-zinc-600">
                    84%
                  </span>
                  <p className="text-xs leading-4 font-normal text-[#09090B]">
                    Capacity Utilization
                  </p>
                </div>
              </div>
            </div>
          </div>
          {windowWidth >= 1920 && (
            <div className="flex justify-end items-center">
              <Button className="!w-fit !bg-zinc-100 cursor-pointer text-emerald-900 !text-sm !leading-[100%] !font-medium !py-2 !px-4 gap-2 h-8 !rounded-[6px] min-h-8 !shadow-[0px_1px_2px_0px_#0000000D]">
                <Settings2
                  size={16}
                  strokeWidth={1}
                  className="text-emerald-900 !shrink-0"
                />
                Update Plan
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardMainAccountSummaryWidget;
