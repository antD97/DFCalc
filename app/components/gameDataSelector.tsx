'use client'

import { P } from "@/app/components/ui/paragraph";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { Box } from "@/app/components/ui/layout/box";
import { twMerge } from "tailwind-merge";
import { H } from "@/app/components/ui/header";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { A } from "@/app/components/ui/anchor";
import { Button } from "@/app/components/ui/button";
import { IoIosInformationCircle } from "react-icons/io";
import { CircularProgress, Tooltip } from "@mui/material";
import { LoadedGameData, useGameData } from "@/app/components/gameDataContext";
import { validateGameData } from "@/app/gameData/gameData";
import { LI, OL } from "./ui/list";

const latestHavocWarfareURL = '/data/havoc-warfare-2024.08.26.json';
const latestTacticalTurmoilURL = 'WIP';

const GameDataSelector: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { gameData, setGameData, gameDataUrl, setGameDataUrl } = useGameData();

  const loadUrlInput = useRef<HTMLInputElement>(null);

  const { gameDataVersion, gameDataDescription, gameDataLastUpdated, gameDataCredits } = gameData === "error" ? {
    gameDataVersion: "error",
    gameDataDescription: "error",
    gameDataLastUpdated: "error",
    gameDataCredits: "error"
  } : gameData === null ? {
    gameDataVersion: "",
    gameDataDescription: "",
    gameDataLastUpdated: "",
    gameDataCredits: ""
  } : {
    gameDataVersion: gameData.version,
    gameDataDescription: gameData.description,
    gameDataLastUpdated: gameData.lastUpdated,
    gameDataCredits: gameData.credits
  };

  if (gameData === "error") {

  }

  useEffect(() => {
    loadGameData(latestHavocWarfareURL, setIsLoading, setGameDataUrl, setGameData);
  }, []);

  return (
    <Box className={twMerge('flex flex-col self-center mb-6 w-full', className)} maxWidth="small">

      <div className="relative flex justify-center items-center text-2xl pb-4">
        <H level="3" className="text-2xl">Game Data</H>
        <Tooltip
          title={
            <div className="text-sm">
              <P>
                In order for the calculator to perform any calculations, it first needs data. This is where you can
                select what data the calculator uses.There are a couple of reasons why the game data has to be
                selected manually.
              </P>

              <OL>
                <LI>
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
            </div>
          }
          placement="bottom-end"
          className="absolute right-0"
        >
          <button><IoIosInformationCircle /></button>
        </Tooltip>
      </div>

      <div className="flex items-center justify-center">
        {
          isLoading ? (
            <CircularProgress className="absolute text-white z-10" />
          ) : null
        }
        <div className={`w-full ${isLoading ? 'opacity-25' : ''}`}>
          <fieldset disabled={isLoading}>

            <div className="flex pb-4">
              <Label>Load from URL</Label>
              <Input
                ref={loadUrlInput}
                placeholder="https://dfcalc.antd.xyz/data/havoc-warfare-2024.08.26.json"
                className="grow"
              />
              <Button
                className="ml-4"
                onClick={() => {
                  loadGameData(loadUrlInput.current!!.value, setIsLoading, setGameDataUrl, setGameData);
                }}
              >
                Load
              </Button>
            </div>

            <div className="flex flex-col items-center gap-y-2 pb-4">
              <Button
                variant='primary'
                onClick={() => {
                  loadGameData(latestHavocWarfareURL, setIsLoading, setGameDataUrl, setGameData);
                }}
              >
                Load Latest Havoc Warfare Data from DFCalc
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  loadGameData(latestTacticalTurmoilURL, setIsLoading, setGameDataUrl, setGameData);
                }}
              >
                Load Latest Tactical Turmoil Data from DFCalc
              </Button>
            </div>

            <H level="3" className="text-2xl pb-4 text-center">Current Game Data</H>

            <div className="flex">
              <div className="flex flex-col">
                <Label className="grow">URL</Label>
                <Label className="grow">Version</Label>
                <Label className="grow">Description</Label>
                <Label className="grow">Last Updated</Label>
                <Label className="grow">Credits</Label>
              </div>
              <div className="flex flex-col grow">
                <Input value={gameDataUrl ? gameDataUrl : ""} disabled={true} className="text-white/50 w-auto" />
                <Input value={gameDataVersion} disabled={true} className="text-white/50 w-auto" />
                <Input value={gameDataDescription} disabled={true} className="text-white/50 w-auto" />
                <Input value={gameDataLastUpdated} disabled={true} className="text-white/50 w-auto" />
                <Input value={gameDataCredits} disabled={true} className="text-white/50 w-auto" />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </Box>
  );
}

async function loadGameData(
  url: string,
  setIsLoading: (isLoading: boolean) => void,
  setGameDataUrl: (gameDataUrl: string) => void,
  setGameData: (gameData: LoadedGameData) => void
) {
  setIsLoading(true);
  try {
    const response = await fetch(url);
    if (!response.ok) { throw new Error(); }
    setGameData(await validateGameData(await response.json()));
  } catch (error: any) {
    setGameData('error');
  }
  setGameDataUrl(url);
  setIsLoading(false);
}

export default GameDataSelector;
