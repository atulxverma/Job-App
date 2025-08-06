//@ts-nocheck
import { RadioGroup } from "@radix-ui/themes";
import { div } from "framer-motion/client";
import FilterSideBar from "@/app/components/filter-side-bar";
import { useState } from "react";

export default function Layout({children}) {
  return (
    <div className="flex items-start">
      <FilterSideBar/>
      {children}
    </div>
  );
}
