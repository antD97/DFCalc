import { H } from "@/app/components/ui/header";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { GameData } from "@/app/gameData/gameData";
import { FC } from "react";

const CurrentGameData: FC<{ gameDataUrl: string; gameData: GameData }> = ({ gameDataUrl, gameData }) => {
  return (
    <>
      <H level="3" className="text-2xl pb-4">Current Game Data</H>

      <div className="flex">
        <div className="flex flex-col">
          <Label className="grow">URL</Label>
          <Label className="grow">Version</Label>
          <Label className="grow">Description</Label>
          <Label className="grow">Last Updated</Label>
          <Label className="grow">Credits</Label>
        </div>
        <div className="grow flex flex-col">
          <Input value={gameDataUrl} disabled={true} />
          <Input value={gameData.version} disabled={true} />
          <Input value={gameData.description} disabled={true} />
          <Input value={gameData.lastUpdated} disabled={true} />
          <Input value={gameData.credits} disabled={true} />
        </div>
      </div>
    </>
  )
};

export default CurrentGameData;
