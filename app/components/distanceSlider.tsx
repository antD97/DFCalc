'use client';

import { FC, useState } from "react";
import { Input } from "./ui/input";
import Slider from "@mui/material/Slider";
import { NumberInput } from "./ui/numberInput";

const DistanceSlider: FC<{ onChange: (distance: number) => void }> = ({ onChange }) => {
  const [distanceStr, setDistanceStr] = useState<string>('100');
  const [isDistanceStrValid, setIsDistanceStrValid] = useState<boolean>(true);
  const [distance, setDistance] = useState<number>(100);

  return (
    <>
      <NumberInput
        value={distanceStr}
        placeholder="0"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const ds = /\S/.test(event.target.value) ? event.target.value.replace(/^0+/, '') : '';
          setDistanceStr(ds);

          const valueAsNumber = Number(ds);
          if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
            setDistance(valueAsNumber);
            setIsDistanceStrValid(true);
          } else {
            setDistance(0);
            setIsDistanceStrValid(false);
          }
        }}
        className={`w-12 h-auto mr-4 text-center ${isDistanceStrValid ? '' : 'text-red-500 focus:text-red-500 border-red-500 focus:border-red-500'}`}
      />
      <div className="flex grow">
        <Slider
          aria-label="Distance (meters)"
          value={distance}
          onChange={(event: Event, newValue: number | number[]) => {
            setDistance(newValue as number);
            setDistanceStr(String(newValue as number));
          }}
          max={200}
        />
      </div>
    </>
  );
};

export default DistanceSlider;
