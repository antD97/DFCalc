'use client';

import ResultsTable from "@/app/components/compareTool/resultsTable/resultsTable";
import Settings from "@/app/components/compareTool/settings/settings";
import { Box } from "@/app/components/ui/box";
import { H } from "@/app/components/ui/header";
import { FC } from "react";

const CompareTool: FC = () => (
  <div className="w-full flex flex-col items-center gap-8 lg: lg:grid lg:grid-rows-[min-content_auto] lg:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] lg:items-stretch">
    <Box
      maxWidth="none"
      className="max-w-screen-sm rounded-none order-2 sm:rounded-lg lg:order-none lg:row-span-2 lg:max-w-none"
    >
      <H level="3" className="text-2xl">Restrictions</H>
    </Box>
    <Box
      maxWidth="none"
      className="max-w-screen-sm rounded-none order-1 flex flex-col sm:rounded-lg lg:order-none lg:max-w-none"
    >
      <Settings />
    </Box>
    <Box
      maxWidth="none"
      className="max-w-screen-sm rounded-none order-3 flex flex-col p-0 sm:rounded-lg lg:max-w-none lg:order-none"
    >
      <ResultsTable />
    </Box>
  </div>
);

export default CompareTool;
