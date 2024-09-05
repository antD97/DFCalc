import { avgDamageColumn, Column, dpsColumn, stkColumn } from "@/app/components/compareTool/resultsTable/columns";
import GunNameTooltip from "@/app/components/compareTool/resultsTable/gunDetailsTooltip";
import GunType from "@/app/types/gunType";
import { GunResultData } from "@/app/util/v1/compareAllV1";
import { CSSProperties, FC } from "react";
import { IoIosConstruct } from "react-icons/io";

const GunDataCell: FC<{
  column: Column,
  gunName: string,
  gunResultData: GunResultData,
  style: CSSProperties
}> = ({
  column,
  gunName,
  gunResultData,
  style
}) => {

    // gun name cell
    if (column.long === 'Gun Name') {
      return (
        <td key={`${gunName}-${column.short}`} className="relative text-nowrap px-2" style={style}>

          <GunNameTooltip gunResultData={gunResultData}>
            <button className="hover:underline">
              {gunName}
              {(gunResultData.barrel || gunResultData.muzzle) && (<IoIosConstruct className="inline ml-2 text-amber-500" />)}
            </button>
          </GunNameTooltip>

          <div className="absolute right-2 top-0 text-white/25">{toShortGunType(gunResultData.type)}</div>
        </td>
      );
    }
    // other cells
    else {

      // non shotguns
      if (gunResultData.type !== 'Shotgun') {
        var content: string | number = gunResultData[column.gunDataPropertyName[0]];
        if (content === Number.POSITIVE_INFINITY) { content = '∞'; }
        const roundedCols: string[] = [avgDamageColumn.long, dpsColumn.long, stkColumn.long];
        if (roundedCols.includes(column.long) && typeof content === 'number') { content = content.toFixed(1); }
        return (
          <td key={`${gunName}-${column.short}`} className="text-end px-2" style={style}>
            {content}
          </td>
        );
      }

      // shotguns
      else {
        var content: string | number = gunResultData[column.gunDataPropertyName[0]];
        var minContent: string | number = gunResultData[column.gunDataPropertyName[1]];

        if (content === Number.POSITIVE_INFINITY) { content = '∞'; }
        if (minContent === Number.POSITIVE_INFINITY) { minContent = '∞'; }

        const roundedCols: string[] = [avgDamageColumn.long, dpsColumn.long, stkColumn.long];
        if (roundedCols.includes(column.long)) {
          if (typeof content === 'number') { content = content.toFixed(1); }
          if (typeof minContent === 'number') { minContent = minContent.toFixed(1); }
        }

        return (
          <td key={`${gunName}-${column.short}`} className="text-end px-2 text-nowrap" style={style}>
            {minContent !== content && <span className="opacity-25">{minContent} - </span>}{content}
          </td>
        );
      }
    }
  };

function toShortGunType(gunType: GunType): 'AR' | 'LMG' | 'MR' | 'P' | 'SG' | 'SR' | 'SMG' {
  switch (gunType) {
    case 'Assault Rifle': return 'AR';
    case 'Battle Rifle': return 'AR';
    case 'Light Machine Gun': return 'LMG';
    case 'Marksman Rifle': return 'MR';
    case 'Pistol': return 'P';
    case 'Shotgun': return 'SG';
    case 'Sniper Rifle': return 'SR';
    case 'Submachine Gun': return 'SMG';
  }
}

export default GunDataCell;
