'use client'

import { useGameData } from "@/app/components/gameDataContext";
import CurrentGameData from "@/app/components/gameDataSelector/currentGameData";
import GameDataTooltip from "@/app/components/gameDataSelector/gameDataTooltip";
import { Box } from "@/app/components/ui/box";
import { Button } from "@/app/components/ui/button";
import { H } from "@/app/components/ui/header";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { P } from "@/app/components/ui/paragraph";
import gameDataListSchema from "@/app/gameData/gameDataListSchema";
import { CircularProgress } from "@mui/material";
import { FC, HTMLAttributes, useEffect, useRef } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const GameDataSelector: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const { gameDataState, loadGameData, setGameDataLoadingState, setGameDataErrorState } = useGameData();
  const loadUrlInput = useRef<HTMLInputElement>(null);

  const loadLatestGameData = async (gameMode: 'Havoc Warfare' | 'Tactical Turmoil') => {
    setGameDataLoadingState();
    const latestGameDataUrlResult = await getLatestGameDataURL(gameMode);
    if (latestGameDataUrlResult.result === 'success') { loadGameData(latestGameDataUrlResult.url); }
    else { setGameDataErrorState(latestGameDataUrlResult.message) }
  };

  // initial game data load
  useEffect(() => { loadLatestGameData('Havoc Warfare'); }, []);

  return (
    <Box className={twMerge('flex flex-col self-center mb-6 w-full', className)} maxWidth="small">

      <div className="relative flex justify-center items-center text-2xl pb-4">
        <H level="3" className="text-2xl">Game Data</H>
        <GameDataTooltip className="absolute right-0">
          <button className="absolute right-0"><IoIosInformationCircle /></button>
        </GameDataTooltip>
      </div>

      <div className="flex items-center justify-center">

        {gameDataState.state === 'loading' && <CircularProgress className="absolute text-white z-10" />}

        <div className={`w-full ${gameDataState.state === 'loading' && 'opacity-25'}`}>
          <fieldset disabled={gameDataState.state === 'loading'}>

            <div className="flex pb-4">
              <Label>Load from URL</Label>
              <Input
                ref={loadUrlInput}
                placeholder="https://dfcalc.antd.xyz/data/havoc-warfare-2024.08.26.json"
                className="grow"
              />
              <Button className="ml-4" onClick={() => { loadGameData(loadUrlInput.current!!.value); }}>Load</Button>
            </div>

            <div className="flex flex-col items-center gap-y-2 pb-4">
              <Button variant='primary' onClick={() => { loadLatestGameData('Havoc Warfare') }} >
                <span className="inline-block">Load Latest Havoc Warfare</span>
                <span className="inline-block">Data from DFCalc</span>
              </Button>
              <Button variant='primary' onClick={() => { loadLatestGameData('Tactical Turmoil') }} >
                <span className="inline-block">Load Latest Tactical Turmoil</span>
                <span className="inline-block">Data from DFCalc</span>
              </Button>
            </div>

            {gameDataState.state === 'loaded' && (
              <CurrentGameData gameDataUrl={gameDataState.url} gameData={gameDataState.gameData} />
            )}
            {gameDataState.state === 'error' && <P className="text-red-500">Error: {gameDataState.message}</P>}
          </fieldset>
        </div>
      </div>
    </Box>
  );
}

async function getLatestGameDataURL(gameMode: 'Havoc Warfare' | 'Tactical Turmoil'):
  Promise<{ result: 'success', url: string } | { result: 'error', message: string }> {

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

export default GameDataSelector;
