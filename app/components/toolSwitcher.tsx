'use client'

import CompareTool from "@/app/components/compareTool/compareTool";
import { CompareToolDataProvider } from "@/app/components/compareTool/compareToolContext";
import { useGameData } from "@/app/components/gameDataContext";
import InspectTool from "@/app/components/inspectTool";
import { Box } from "@/app/components/ui/box";
import { Button } from "@/app/components/ui/button";
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
            <div className="max-w-screen-sm w-2/3 flex justify-around items-center text-2xl pb-8 gap-8 lg:max-w-none">
              <div className="grow border-b" />
              <ToolButton isSelected={currentTool === 'compare'} onClick={() => { setCurrentTool('compare') }}>
                Compare
              </ToolButton>
              <ToolButton isSelected={currentTool === 'inspect'} onClick={() => { setCurrentTool('inspect') }}>
                Scenario
              </ToolButton>
              <div className="grow border-b" />
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
  <Button
    variant={isSelected ? 'primary' : 'white'}
    className={`py-2 rounded-lg hover:bg-transparent ${isSelected ? 'hover:cursor-default' : 'border-transparent hover:border-white'}`}
    {...props}
  />
);

export default ToolSwitcher;
