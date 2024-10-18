'use client';

import { useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import NewAttachmentRestrictionsModal from "@/app/components/compareTool/restrictions/newAttachmentRestrictionModal";
import Restrictions from "@/app/components/compareTool/restrictions/restrictions";
import ResultsTable from "@/app/components/compareTool/resultsTable/resultsTable";
import Settings from "@/app/components/compareTool/settings/settings";
import { Box } from "@/app/components/ui/box";
import { H } from "@/app/components/ui/header";
import { FC, useEffect, useRef, useState } from "react";

const CompareTool: FC = () => {
  const { newAttachmentRestrictionsModalVisible } = useCompareToolData();

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
      {newAttachmentRestrictionsModalVisible && <NewAttachmentRestrictionsModal />}

      <div
        className="flex-col grow hidden rounded-none lg:flex lg:rounded-lg"
        style={{
          minHeight: `${restrictionsHeight}px`,
          height: `${restrictionsHeight}px`,
          maxHeight: `${restrictionsHeight}px`
        }}
      >
        <H level="3" className="text-2xl mb-4">Restrictions</H>
        <Box maxWidth="none" className="grow min-h-0 rounded-none lg:rounded-lg">
          <Restrictions />
        </Box>
      </div>

      <div className="flex flex-col items-stretch relative grow-[2] h-fit">
        <div ref={fullHeightRef} className="absolute h-full"></div>

        <div className="flex flex-col items-center">
          <H level="3" className="text-2xl mb-4">Settings</H>
          <Box
            maxWidth="none"
            className="max-w-screen-sm rounded-none sm:rounded-lg lg:max-w-none"
          >
            <Settings />
          </Box>
        </div>

        <div className="flex flex-col items-center lg:hidden">
          <H level="3" className="text-2xl my-4">Restrictions</H>
          <Box
            maxWidth="none"
            className="max-w-screen-sm rounded-none sm:rounded-lg"
          >
            <Restrictions limitMaxHeight />
          </Box>
        </div>

        <div className="flex flex-col items-center">
          <H level="3" className="text-2xl my-4">Results</H>
          <Box
            maxWidth="none"
            className="max-w-screen-sm p-0 rounded-lg lg:max-w-none"
          >
            <ResultsTable />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CompareTool;
