'use client'

import { FC, useState } from "react";
import { Box } from "@/app/components/ui/layout/box";
import { Label } from "@/app/components/ui/label";
import { H } from "@/app/components/ui/header";
import { AnimatePresence, motion } from "framer-motion";
import DistanceSlider from "./distanceSlider";
import { useDebouncedCallback } from "use-debounce";
import { CompareToolDataProvider, useCompareToolData } from "./compareToolContext";
import CompareToolResults from "./compareToolResults";
import { Input } from "./ui/input";

const CompareTool: FC = () => {
  const { compareAllArgs, setCompareAllArgs } = useCompareToolData();
  const {
    targetHp,
    distance,
    headWeight,
    thoraxWeight,
    stomachWeight,
    armsWeight,
    upperLegsWeight,
    lowerLegsWeight
  } = compareAllArgs;

  const weightsTotal = headWeight + thoraxWeight + stomachWeight + armsWeight + upperLegsWeight + lowerLegsWeight;

  return (
    <div className="w-full flex flex-col items-center gap-8 lg: lg:grid lg:grid-rows-[min-content_auto] lg:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] lg:items-stretch">

      <Box maxWidth="none" className="max-w-screen-sm rounded-none order-2 sm:rounded-lg lg:order-none lg:row-span-2 lg:max-w-none">
        <H level="3" className="text-2xl">Restrictions</H>
      </Box>

      <Box maxWidth="none" className="max-w-screen-sm rounded-none order-1 flex flex-col sm:rounded-lg lg:order-none lg:max-w-none">
        <H level="3" className="text-2xl mb-4">Settings</H>

        <div className="flex flex-col items-center sm:flex-row ">
          <div className="grow flex basis-0">
            <Label className="w-36 sm:w-auto sm:pr-4">Target Health</Label>
            <Input type="number" className="w-12 text-center" value={targetHp} />
          </div>

          <div className="grow flex basis-0">
            <Label className="w-36 sm:w-auto sm:pr-4">Distance (meters)</Label>
            <Input type="number" className="w-12 text-center" value={distance} />
          </div>
        </div>

        <H level="4" className="text-lg my-4">Hit Distribution</H>

        <div className="flex flex-col items-center sm:flex-row">
          <div className="grow">
            <HitDistributionInput label="Head" value={headWeight} weightsTotal={weightsTotal} />
            <HitDistributionInput label="Thorax" value={thoraxWeight} weightsTotal={weightsTotal} />
            <HitDistributionInput label="Stomach" value={stomachWeight} weightsTotal={weightsTotal} />
          </div>
          <div className="grow">
            <HitDistributionInput label="Arms" value={armsWeight} weightsTotal={weightsTotal} />
            <HitDistributionInput label="Upper Legs" value={upperLegsWeight} weightsTotal={weightsTotal} />
            <HitDistributionInput label="Lower Legs" value={lowerLegsWeight} weightsTotal={weightsTotal} />
          </div>
        </div>
      </Box>


      <Box maxWidth="none" className="max-w-screen-sm rounded-none order-3 flex flex-col p-0 sm:rounded-lg lg:max-w-none lg:order-none">
        <CompareToolResults />
      </Box>
    </div>
  );
}

const HitDistributionInput: FC<{ label: string, value: number, weightsTotal: number }> = ({ label, value, weightsTotal }) => {
  return (
    <div className="flex">
      <Label className="w-28">{label}</Label>
      <div className="relative">
        <Input type="number" value={value} className="w-24 text-start" />
        <span className="absolute right-0 text-white/50 pointer-events-none">{`${((value / weightsTotal) * 100).toFixed(1)}%`}</span>
      </div>
    </div>
  );
};

export default CompareTool;
