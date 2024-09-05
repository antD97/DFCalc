import { H } from "@/app/components/ui/header";
import { UL } from "@/app/components/ui/list";
import { LI } from "@/app/components/ui/listItem";
import { P } from "@/app/components/ui/paragraph";
import { Tooltip } from "@/app/components/ui/tooltip";
import { GunResultData } from "@/app/util/v1/compareAllV1";
import { FC } from "react";
import { IoIosConstruct } from "react-icons/io";

const GunNameTooltip: FC<{
  gunResultData: GunResultData,
  children: React.ReactElement<unknown, any>;
}> = ({
  gunResultData,
  children
}) => {
    return (
      <Tooltip
        placement="left"
        arrow
        title={
          <>
            <P className="pb-0">Details</P>
            <UL>
              <LI>Base Damage: {gunResultData.damage}</LI>
              {gunResultData.type === 'Shotgun' && (<LI>Num Bullets: {gunResultData.numBullets}</LI>)}
              <LI>Classes: {gunResultData.characterClass.length === 4 ? 'All' : gunResultData.characterClass.join(', ')}</LI>
            </UL>

            <P className="pb-0">Base Range Multipliers</P>
            <UL>
              {[{ from: 0, multiplier: 1 }, ...gunResultData.damageFalloffMultipliers].map((dfm, i, allDfm) => {
                const isLast = i === allDfm.length - 1;
                const start = dfm.from.toFixed(1);
                const end = isLast ? null : allDfm[i + 1].from.toFixed(1);
                const multiplier = allDfm[i].multiplier;
                return <LI>{start}{end ? `→${end}` : '+'} meters: x{multiplier}</LI>;
              })}
            </UL>

            {
              (gunResultData.barrel || gunResultData.muzzle) && (<>
                <P className="pb-0">Attachments <IoIosConstruct className="inline text-amber-500" /></P>
                <UL>
                  {gunResultData.barrel && <LI>{gunResultData.barrel.name}</LI>}
                  {gunResultData.muzzle && <LI>{gunResultData.muzzle.name}</LI>}
                </UL>

                <P className="pb-0">Range Multipliers With Attachments <IoIosConstruct className="inline text-amber-500" /></P>
                <UL>
                  {[{ from: 0, multiplier: 1 }, ...gunResultData.withAttachmentsDamageFalloffMultipliers].map((dfm, i, allDfm) => {
                    const isLast = i === allDfm.length - 1;
                    const start = dfm.from.toFixed(1);
                    const end = isLast ? null : allDfm[i + 1].from.toFixed(1);
                    const multiplier = allDfm[i].multiplier;
                    return <LI>{start}{end ? `→${end}` : '+'} meters: x{multiplier}</LI>;
                  })}
                </UL>
              </>)
            }
          </>
        }
      >
        {children}
      </Tooltip>
    );
  };

export default GunNameTooltip;
