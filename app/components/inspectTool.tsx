'use client'

import { P } from "@/app/components/ui/paragraph";
import { Box } from "@/app/components/ui/layout/box";
import { FC } from "react";
import { H } from "./ui/header";

const InspectTool: FC = () => {
  return (
    <div className="flex w-full gap-8">
      <Box className="basis-1/4 grow flex flex-col gap-8">
        <H level="3" className="text-2xl">Filters</H>
      </Box>
      <Box className="basis-3/4 grow flex flex-col gap-8">
        <H level="3" className="text-2xl">Inspect</H>
      </Box>
    </div>
  );
}

export default InspectTool;
