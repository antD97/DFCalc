'use client';

import Restrictions from "@/app/components/compareTool/restrictions/restrictions";
import ResultsTable from "@/app/components/compareTool/resultsTable/resultsTable";
import Settings from "@/app/components/compareTool/settings/settings";
import { Box } from "@/app/components/ui/box";
import { FC, useEffect, useRef, useState } from "react";

const CompareTool: FC = () => {

  const [restrictionsHeight, setRestrictionsHeight] = useState<number | null>(null);

  // adjust restrictions box height
  const fullHeightRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (fullHeightRef.current) {
      const o = new ResizeObserver(() => { setRestrictionsHeight(fullHeightRef.current?.offsetHeight ?? null); });
      o.observe(fullHeightRef.current);
    }
  }, []);

  return (
    <div className="w-full flex gap-8 *:basis-0 *:min-w-0">
      <Box
        maxWidth="none"
        className="grow hidden rounded-none lg:block lg:rounded-lg"
        style={{
          minHeight: `${restrictionsHeight}px`,
          height: `${restrictionsHeight}px`,
          maxHeight: `${restrictionsHeight}px`
        }}
      >
        <Restrictions />
      </Box>

      <div className="flex flex-col items-center relative grow-[2] h-fit">
        <div ref={fullHeightRef} className="absolute h-full"></div>

        <Box
          maxWidth="none"
          className="max-w-screen-sm mb-8 rounded-none sm:rounded-lg"
        >
          <Settings />
        </Box>

        <Box
          maxWidth="none"
          className="max-w-screen-sm mb-8 rounded-none lg:hidden sm:rounded-lg"
        >
          <Restrictions limitMaxHeight />
        </Box>

        <Box
          maxWidth="none"
          className="max-w-screen-sm p-0 rounded-none sm:rounded-lg"
        >
          <ResultsTable />
        </Box>
      </div>
    </div>
  );
};

export default CompareTool;
