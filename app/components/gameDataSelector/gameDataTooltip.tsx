import { A } from "@/app/components/ui/anchor";
import { OL } from "@/app/components/ui/list";
import { LI } from "@/app/components/ui/listItem";
import { P } from "@/app/components/ui/paragraph";
import { Tooltip } from "@/app/components/ui/tooltip";
import { FC } from "react";

const GameDataTooltip: FC<{
  className: string,
  children: React.ReactElement<unknown, any>;
}> = ({
  className,
  children
}) => {
    return (
      <Tooltip
        placement="bottom-end"
        arrow
        className={className}
        title={
          <>
            <P className="pb-2">
              In order for the calculator to perform any calculations, it first needs data. This is where you can
              select what data the calculator uses.There are a couple of reasons why the game data has to be
              selected manually.
            </P>
            <OL>
              <LI className="pb-2">
                The damage mechanics used in the Havoc Warfare and Tactical Turmoil are different. To account for
                this, different game data can be used by the calculator to properly reflect each game-mode
                separately.
              </LI>
              <LI>
                With future updates and balance patches, the damage of the weapons are likely to change. By having
                the game data being selected manually, anyone is able to modify and update the data to properly
                match the latest version.
              </LI>
            </OL>
            <P>
              I provide game data that you can use as options below so that you don't have to make it yourself.
              Please note the date on the game data you're using to ensure it corresponds to your current game
              version. If you'd like to help keep up-to-date game data readily available, check out
              the <A href="contribute">contribute</A> page.
            </P>
          </>
        }
      >
        {children}
      </Tooltip>
    );
  };

export default GameDataTooltip;
