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
import { useGameData } from "@/app/components/gameDataContext";
import { GameData, parseGameData } from "@/app/gameData/gameData";
import { LI, OL } from "@/app/components/ui/list";
import gameDataListSchema from "@/app/gameData/gameDataListSchema";

const GameDataSelector: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const [currentGameDataState, setCurrentGameDataState] = useState<{
    state: 'ok' | 'loading' | 'empty'
  } | {
    state: 'error', 'message': string
  }>({ state: 'empty' });

  const { gameData, setGameData, gameDataUrl, setGameDataUrl } = useGameData();

  const loadUrlInput = useRef<HTMLInputElement>(null);

  async function getLatestGameDataURL(gameMode: 'Havoc Warfare' | 'Tactical Turmoil'): Promise<{
    result: 'success',
    url: string
  } | {
    result: 'error',
    message: string
  }> {
    setCurrentGameDataState({ state: 'loading' });

    try {
      // retrieve game data list
      const response = await fetch('/data/list.json');
      if (!response.ok) { throw new Error('Failed to retrieve DFCalc game data list'); }

      // find newest game data file based on filename date suffix
      const filenames = gameDataListSchema.parse(await response.json())
        .filter(gameData => gameData.gameMode === gameMode)
        .map(gameData => gameData.filename)
        .sort((a, b) => {
          const dateA = a.substring(a.length - 15);
          const dateB = b.substring(a.length - 15);
          return dateA.localeCompare(dateB);
        });

      if (filenames.length === 0) { throw new Error(`No ${gameMode} game data found from DFCalc`); }

      return { result: 'success', url: `/data/${filenames[0]}` };

    } catch (error: any) {
      return {
        result: 'error',
        message: error?.message ? error.message : `Failed to retrieve latest ${gameMode} game data URL`
      };
    }
  }

  async function loadGameData(url: string) {
    setGameData(null);
    setCurrentGameDataState({ state: 'loading' });
    try {

      const response = await fetch(url);
      if (!response.ok) { throw new Error('Failed to retrieve game data file'); }

      const parsedData = await parseGameData(await response.json());
      if (parsedData.result === 'error') { throw new Error(parsedData.message); }

      setGameData(parsedData.gameData);
      setGameDataUrl(url);
      setCurrentGameDataState({ state: 'ok' });

    } catch (error: any) {
      setCurrentGameDataState({
        'state': 'error',
        'message': error?.message ? error.message : 'Unknown error loading game data'
      })
    }
  }

  useEffect(() => {
    getLatestGameDataURL('Havoc Warfare').then((result) => {
      if (result.result === 'success') { loadGameData(result.url); }
      else { setCurrentGameDataState({ state: 'error', message: result.message }); }
    });
  }, []);

  return (
    <Box className={twMerge('flex flex-col self-center mb-6 w-full', className)} maxWidth="small">

      <div className="relative flex justify-center items-center text-2xl pb-4">
        <H level="3" className="text-2xl">Game Data</H>
        <Tooltip
          placement="bottom-end"
          arrow
          title={
            <div className="text-sm font-normal">
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
          className="absolute right-0"
        >
          <button><IoIosInformationCircle /></button>
        </Tooltip>
      </div>

      <div className="flex items-center justify-center">
        {
          currentGameDataState.state === 'loading' && (
            <CircularProgress className="absolute text-white z-10" />
          )
        }
        <div className={`w-full ${currentGameDataState.state === 'loading' && 'opacity-25'}`}>
          <fieldset disabled={currentGameDataState.state === 'loading'}>

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
                  loadGameData(loadUrlInput.current!!.value);
                }}
              >
                Load
              </Button>
            </div>

            <div className="flex flex-col items-center gap-y-2 pb-4">
              <Button
                variant='primary'
                onClick={async () => {
                  const result = await getLatestGameDataURL('Havoc Warfare');
                  if (result.result === 'success') { loadGameData(result.url); }
                  else { setCurrentGameDataState({ state: 'error', message: result.message }); }
                }}
              >
                <span className="inline-block">Load Latest Havoc Warfare</span>
                <span className="inline-block">Data from DFCalc</span>
              </Button>
              <Button
                variant='primary'
                onClick={async () => {
                  const result = await getLatestGameDataURL('Tactical Turmoil');
                  if (result.result === 'success') { loadGameData(result.url); }
                  else { setCurrentGameDataState({ state: 'error', message: result.message }); }
                }}
              >
                 <span className="inline-block">Load Latest Tactical Turmoil</span>
                 <span className="inline-block">Data from DFCalc</span>
              </Button>
            </div>

            {
              currentGameDataState.state === 'ok' && (
                <CurrentGameData gameDataUrl={gameDataUrl!!} gameData={gameData!!} />
              )
            }
            {
              currentGameDataState.state === 'error' && (
                <P className="text-red-500">Error: {currentGameDataState.message}</P>
              )
            }
          </fieldset>
        </div>
      </div>
    </Box>
  );
}

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

export default GameDataSelector;
