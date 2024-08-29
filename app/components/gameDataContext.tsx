'use client';

import { createContext, FC, HTMLAttributes, ReactNode, useContext, useState } from "react";
import { GameData } from "@/app/gameData/gameData";

export type LoadedGameData = GameData | "error" | null;

type GameDataContextType = {
  gameData: LoadedGameData;
  setGameData: (gameData: GameData | "error" | null) => void;
  gameDataUrl: string | null;
  setGameDataUrl: (gameDataUrl: string | null) => void;
}

const GameDataContext = createContext<GameDataContextType | undefined>(undefined);

export const GameDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gameData, setGameData] = useState<LoadedGameData>(null);
  const [gameDataUrl, setGameDataUrl] = useState<string | null>(null);
  return (
    <GameDataContext.Provider value={{ gameData, setGameData, gameDataUrl, setGameDataUrl }}>
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
