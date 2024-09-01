'use client'

import { ButtonHTMLAttributes, FC, useState } from "react";
import CompareTool from "@/app/components/compareTool";
import InspectTool from "@/app/components/inspectTool";
import { twMerge } from "tailwind-merge";
import { CompareToolDataProvider } from "./compareToolContext";

const ToolSwitcher: FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolStates>('compare');

  return (
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
  );
};

type ToolStates = 'compare' | 'inspect';

interface ToolButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
}

const ToolButton: FC<ToolButtonProps> = ({ isSelected, className, children, ...props }) => {
  return (
    <button
      className={twMerge(`hover:underline ${isSelected ? 'text-amber-500' : 'text-white'}`, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToolSwitcher;
