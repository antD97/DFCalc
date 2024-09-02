'use client';

import { GameData, parseGameData } from "@/app/gameData/gameData";
import { createContext, FC, ReactNode, useContext, useState } from "react";

type GameDataState = { state: 'loaded', gameData: GameData, url: string }
  | { state: 'loading' | 'empty' }
  | { state: 'error', 'message': string, url?: string }

type GameDataContextType = {
  gameDataState: GameDataState,
  loadGameData: (url: string) => void,
  setGameDataLoadingState: () => void,
  setGameDataErrorState: (message: string, url?: string) => void
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export const GameDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gameDataState, setGameDataState] = useState<GameDataState>({ state: 'empty' });

  const loadGameData = async (url: string) => {

    setGameDataState({ state: 'loading' });

    try {
      const response = await fetch(url);
      if (!response.ok) { throw new Error('Failed to retrieve game data file'); }

      const parsedData = await parseGameData(await response.json());
      if (parsedData.result === 'error') { throw new Error(parsedData.message); }

      setGameDataState({ 'state': 'loaded', 'gameData': parsedData.gameData, url });
      
    } catch (error: any) {
      setGameDataState({
        'state': 'error',
        'message': error?.message ? error.message : 'Unknown error loading game data',
        url
      });
    }
  }

  const setGameDataLoadingState = () => setGameDataState({ state: 'loading' });

  const setGameDataErrorState = (message: string, url?: string) => {
    setGameDataState({ 'state': 'error', 'message': message, 'url': url });
  };

  return (
    <GameDataContext.Provider value={{ gameDataState, loadGameData, setGameDataLoadingState, setGameDataErrorState }}>
      {children}
    </GameDataContext.Provider>
  )
};

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (context === undefined) {
    throw Error('useGameData must be used within a GameDataProvider');
  }
  return context;
}
