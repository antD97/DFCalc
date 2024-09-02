'use client'

import CompareTool from "@/app/components/compareTool/compareTool";
import { CompareToolDataProvider } from "@/app/components/compareTool/compareToolContext";
import { useGameData } from "@/app/components/gameDataContext";
import InspectTool from "@/app/components/inspectTool";
import { Box } from "@/app/components/ui/box";
import { H } from "@/app/components/ui/header";
import { P } from "@/app/components/ui/paragraph";
import { ButtonHTMLAttributes, FC, useState } from "react";

type ToolStates = 'compare' | 'inspect';

const ToolSwitcher: FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolStates>('compare');
  const { gameDataState } = useGameData();

  return (
    <>
      {
        gameDataState.state === 'loaded' ? (
          <>
            <div className="max-w-screen-sm w-full flex justify-around text-2xl pb-4 lg:max-w-none">
              <ToolButton isSelected={currentTool === 'compare'} onClick={() => { setCurrentTool('compare') }}>
                Compare All
              </ToolButton>
              <ToolButton isSelected={currentTool === 'inspect'} onClick={() => { setCurrentTool('inspect') }}>
                Inspect One
              </ToolButton>
            </div>
            {currentTool === 'compare' && <CompareToolDataProvider><CompareTool /></CompareToolDataProvider>}
            {currentTool === 'inspect' && <InspectTool />}
          </>
        ) : (
          <Box maxWidth="small" className="flex flex-col h-96 items-center justify-center">
            <H level="3" className="text-2xl">No game data loaded...</H>
            <P>
              Load game data above to use the calculator.
            </P>
          </Box>
        )
      }
    </>
  );
};

const ToolButton: FC<ButtonHTMLAttributes<HTMLButtonElement> & { isSelected: boolean }> = ({ isSelected, ...props }) => (
  <button
    className={`px-4 py-2 border rounded-lg ${isSelected ? 'text-amber-500 border border-amber-500' : 'text-white border-transparent hover:border-white'}`}
    {...props}
  />
);

export default ToolSwitcher;
