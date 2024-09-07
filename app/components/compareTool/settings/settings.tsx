import { CompareToolAction, useCompareToolData } from "@/app/components/compareTool/compareToolContext";
import { H } from "@/app/components/ui/header";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ChangeEventHandler, Dispatch, FC, InputHTMLAttributes } from "react";

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
            onChange={numberInputEventHandler(dispatch, 'setTargetHp', 1, 1000)}
          />
        </div>

        <div className="grow flex basis-0">
          <Label className="w-36 sm:w-auto sm:pr-4">Distance (meters)</Label>
          <Input
            type="number"
            className="w-12 text-center"
            value={String(distance)}
            onChange={numberInputEventHandler(dispatch, 'setDistance', 1, 5000)}
          />
        </div>
      </div>

      <H level="4" className="text-lg my-4">Hit Distribution</H>

      <div className="flex flex-col items-center sm:flex-row">
        <div className="grow">
          <HitDistributionInput
            label="Head"
            value={headWeight}
            onChange={numberInputEventHandler(dispatch, 'setHeadWeight', 0, 100, [thoraxWeight, stomachWeight, armsWeight, upperLegsWeight, lowerLegsWeight])}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Thorax"
            value={thoraxWeight}
            onChange={numberInputEventHandler(dispatch, 'setThoraxWeight', 0, 100, [headWeight, stomachWeight, armsWeight, upperLegsWeight, lowerLegsWeight])}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Stomach"
            value={stomachWeight}
            onChange={numberInputEventHandler(dispatch, 'setStomachWeight', 0, 100, [headWeight, thoraxWeight, armsWeight, upperLegsWeight, lowerLegsWeight])}
            weightsTotal={weightsTotal}
          />
        </div>
        <div className="grow">
          <HitDistributionInput
            label="Arms"
            value={armsWeight}
            onChange={numberInputEventHandler(dispatch, 'setArmsWeight', 0, 100, [headWeight, thoraxWeight, stomachWeight, upperLegsWeight, lowerLegsWeight])}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Upper Legs"
            value={upperLegsWeight}
            onChange={numberInputEventHandler(dispatch, 'setUpperLegsWeight', 0, 100, [headWeight, thoraxWeight, stomachWeight, armsWeight, lowerLegsWeight])}
            weightsTotal={weightsTotal}
          />
          <HitDistributionInput
            label="Lower Legs"
            value={lowerLegsWeight}
            onChange={numberInputEventHandler(dispatch, 'setLowerLegsWeight', 0, 100, [headWeight, thoraxWeight, stomachWeight, armsWeight, upperLegsWeight])}
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
        <Input type="number" value={String(value)} onChange={onChange} className="w-24 text-start" />
        <span className="absolute right-0 text-white/50 pointer-events-none">
          {`${((value / weightsTotal) * 100).toFixed(1)}%`}
        </span>
      </div>
    </div>
  );
};

function numberInputEventHandler(
  dispatch: Dispatch<CompareToolAction>,
  actionType:
    'setTargetHp'
    | 'setDistance'
    | 'setHeadWeight'
    | 'setThoraxWeight'
    | 'setArmsWeight'
    | 'setStomachWeight'
    | 'setUpperLegsWeight'
    | 'setLowerLegsWeight',
  min: number,
  max: number,
  cannotBeZero?: number[]
): ChangeEventHandler<HTMLInputElement> {

  return (e) => {
    const inputValue = e.target.value;
    if (inputValue !== null) {
      var number = Number(inputValue);

      // not all hit distribution values can be zero
      if (number === 0 && cannotBeZero && cannotBeZero.every(v => v === 0)) { return; }

      if (number > max) number = max;
      if (number < min) number = min;
      dispatch({ type: actionType, value: number });
    }
  };
}

export default Settings;
