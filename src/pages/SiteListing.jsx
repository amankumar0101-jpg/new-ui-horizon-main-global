import FilterSidebar from "@/components/custom/FilterSidebar";
import SearchBar from "@/components/custom/SearchBar";
import SiteListingTable from "@/components/custom/SiteListingTable";
import { Button } from "@/components/ui/button";
import { AppWindow, Plus } from "lucide-react";
import React from "react";

const SiteListing = () => {
  return (
    <>
      <div className="py-[18px] pr-6 pl-4 border-t border-b border-zinc-200 flex items-center gap-6">
        <div className="flex items-center gap-10 max-w-full w-full">
          <div className="flex items-start gap-4 min-w-[206px]">
            <div className="min-w-8 max-w-8 w-full h-8 bg-zinc-100 flex items-center justify-center rounded-full">
              <AppWindow size={24} className="bg-zinc-200 rounded-full" />
            </div>
            <div className="flex flex-col gap-1 leading-6 text-xl font-semibold text-black">
              <h2>Manage Sites</h2>
              <p className="text-xs font-normal leading-[15px] text-emerald-600">
                Configure your listing here
              </p>
            </div>
          </div>
          <SearchBar />
        </div>
        <Button className="!px-4 !py-3 !rounded-[6px] w-[113px] !bg-emerald-900 !text-white !text-sm !font-medium !leading-[17px] h-10 flex items-center gap-2">
          <Plus /> Add Site
        </Button>
      </div>
      <div className="flex">
        <FilterSidebar />
        <SiteListingTable />
      </div>
    </>
  );
};

export default SiteListing;
