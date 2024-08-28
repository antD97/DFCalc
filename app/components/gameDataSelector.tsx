'use client'

import { P } from "@/app/components/ui/paragraph";
import { FC, HTMLAttributes } from "react";
import { Box } from "@/app/components/ui/layout/box";
import { twMerge } from "tailwind-merge";
import { H } from "@/app/components/ui/header";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { A } from "@/app/components/ui/anchor";

const GameDataSelector: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {

  return (
    <div
      className={twMerge('flex flex-col', className)}
      {...props}
    >
      <Box className="flex flex-col w-auto self-center mb-6">
        <H level="2" className="text-2xl pb-4 text-center">Game Data</H>

        <P className="w-0 min-w-full">
          In order for the calculator to perform any calculations, it first needs data. This is where you can select what
          data the calculator uses.
        </P>

        <P className="w-0 min-w-full">
          There are a couple of reasons why the game data has to be selected manually.
        </P>

        <ol className="w-0 min-w-full list-decimal ml-4 flex flex-col gap-y-4 pb-4">
          <li>
            The damage mechanics used in the Havoc Warfare and Tactical Turmoil are different. To account for this,
            different game data can be used by the calculator to properly reflect each game-mode separately.
          </li>
          <li>
            With future updates and balance patches, the guns in the game are likely to change. By having the game data
            being selected manually anyone is able to modify and update the data to properly match the latest version.
          </li>
        </ol>

        <P className="w-0 min-w-full">
          I provide game data that you can use as options below so that you don't have to make it yourself. Please note
          the date on the game data you load to ensure it corresponds to your current game version. If you'd like to
          help keep up-to-date game data readily available, check out the <A href="contribute">contribute</A> page!
        </P>

        <H level="3" className="text-xl pb-4 text-center">Load Game Data</H>

        <div className="pb-4">
          <Label>Game Data URL</Label>
          <Input placeholder="https://dfcalc.antd.xyz/data/havoc-warfare-2024.08.26.json" className="w-96" />
          <button className="ml-4">Load</button>
        </div>

        <div className="flex flex-col items-center gap-y-2 pb-4">
          <button>Load Latest Havoc Warfare Data from DFCalc</button>
          <button>Load Latest Tactical Turmoil Data from DFCalc</button>
        </div>

        <H level="3" className="text-xl pb-4 text-center">Current Game Data</H>

        <div className="flex">
          <div className="flex flex-col">
            <Label>URL</Label>
            <Label>Description</Label>
            <Label>Last Updated</Label>
            <Label>Credits</Label>
          </div>
          <div className="flex flex-col grow">
            <Input value="https://dfcalc.antd.xyz/data/havoc-warfare-2024.08.26.json" disabled={true} className="text-white/50 w-auto" />
            <Input value="Havoc Warfare Alpha" disabled={true} className="text-white/50 w-auto" />
            <Input value="August 26, 2024" disabled={true} className="text-white/50 w-auto" />
            <Input value="antD" disabled={true} className="text-white/50 w-auto" />
          </div>
        </div>

      </Box>
    </div>
  );
}

export default GameDataSelector;
