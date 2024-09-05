import { useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import { H } from "@/app/components/ui/header";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ChangeEvent, ChangeEventHandler, Dispatch, FC, InputHTMLAttributes } from "react";

const Settings: FC = () => {
  const {
    targetHp,
    distance,
    headWeight,
    thoraxWeight,
    stomachWeight,
    armsWeight,
    upperLegsWeight,
    lowerLegsWeight,
    dispatch
  } = useCompareToolData();

  const weightsTotal = headWeight + thoraxWeight + stomachWeight + armsWeight + upperLegsWeight + lowerLegsWeight;

  return (
    <>
      <H level="3" className="text-2xl mb-4">Settings</H>

      <div className="flex flex-col items-center sm:flex-row ">
        <div className="grow flex basis-0">
          <Label className="w-36 sm:w-auto sm:pr-4">Target Health</Label>
          <Input
            type="number"
            className="w-12 text-center"
            value={String(targetHp)}
            onChange={(e) => { dispatch({ type: 'setTargetHp', argType: 'numericalInputEvent', event: e }) }}
          />
        </div>

        <div className="grow flex basis-0">
          <Label className="w-36 sm:w-auto sm:pr-4">Distance (meters)</Label>
          <Input
            type="number"
            className="w-12 text-center"
            value={distance}
            onChange={(e) => { dispatch({ type: 'setDistance', argType: 'numericalInputEvent', event: e }) }}
          />
        </div>
      </div>

      <H level="4" className="text-lg my-4">Hit Distribution</H>

      <div className="flex flex-col items-center sm:flex-row">
        <div className="grow">
          <HitDistributionInput
            label="Head"
            value={headWeight}
            onChange={(e) => { dispatch({ type: 'setHeadWeight', argType: 'numericalInputEvent', event: e }) }}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Thorax"
            value={thoraxWeight}
            onChange={(e) => { dispatch({ type: 'setThoraxWeight', argType: 'numericalInputEvent', event: e }) }}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Stomach"
            value={stomachWeight}
            onChange={(e) => { dispatch({ type: 'setStomachWeight', argType: 'numericalInputEvent', event: e }) }}
            weightsTotal={weightsTotal}
          />
        </div>
        <div className="grow">
          <HitDistributionInput
            label="Arms"
            value={armsWeight}
            onChange={(e) => { dispatch({ type: 'setArmsWeight', argType: 'numericalInputEvent', event: e }) }}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Upper Legs"
            value={upperLegsWeight}
            onChange={(e) => { dispatch({ type: 'setUpperLegsWeight', argType: 'numericalInputEvent', event: e }) }}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Lower Legs"
            value={lowerLegsWeight}
            onChange={(e) => { dispatch({ type: 'setLowerLegsWeight', argType: 'numericalInputEvent', event: e }) }}
            weightsTotal={weightsTotal}
          />
        </div>
      </div>
    </>
  );
};

interface HitDistributionInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  value: number,
  onChange: ChangeEventHandler<HTMLInputElement>,
  weightsTotal: number
}

const HitDistributionInput: FC<HitDistributionInputProps> = ({ label, value, weightsTotal, onChange }) => {
  return (
    <div className="flex">
      <Label className="w-28">{label}</Label>
      <div className="relative">
        <Input type="number" value={value} onChange={onChange} className="w-24 text-start" />
        <span className="absolute right-0 text-white/50 pointer-events-none">
          {`${((value / weightsTotal) * 100).toFixed(1)}%`}
        </span>
      </div>
    </div>
  );
};

export default Settings;