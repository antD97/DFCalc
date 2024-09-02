'use client';

import AttachmentRestriction from "@/app/types/attachmentRestriction";
import CharacterClass from "@/app/types/characterClass";
import GunType from "@/app/types/gunType";
import { createContext, FC, ReactNode, useContext, useState } from "react";

export type CompareAllArgs = {
  targetHp: number,
  distance: number,
  headWeight: number,
  thoraxWeight: number,
  armsWeight: number,
  stomachWeight: number,
  upperLegsWeight: number,
  lowerLegsWeight: number,
  characterClasses: CharacterClass[],
  gunTypes: GunType[],
  attachmentRestrictions: AttachmentRestriction[]
};

type CompareToolData = {
  compareAllArgs: CompareAllArgs,
  setCompareAllArgs: (compareAllArgs: CompareAllArgs) => void
}

const defaultCompareToolData: CompareAllArgs = {
  targetHp: 100.0,
  distance: 20,
  headWeight: 0.0,
  thoraxWeight: 1.0,
  armsWeight: 0.0,
  stomachWeight: 0.0,
  upperLegsWeight: 0.0,
  lowerLegsWeight: 0.0,
  characterClasses: ['Assault', 'Support', 'Engineer', 'Recon'],
  gunTypes: [
    'Assault Rifle',
    'Battle Rifle',
    'Light Machine Gun',
    'Marksman Rifle',
    'Pistol',
    'Shotgun',
    'Sniper Rifle',
    'Submachine Gun'
  ],
  attachmentRestrictions: []
};

const CompareToolData = createContext<CompareToolData | undefined>(undefined);

export const CompareToolDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [compareAllArgs, setCompareAllArgs] = useState<CompareAllArgs>(defaultCompareToolData);
  return (
    <CompareToolData.Provider value={{ compareAllArgs, setCompareAllArgs }}>
      {children}
    </CompareToolData.Provider>
  )
};

export const useCompareToolData = () => {
  const context = useContext(CompareToolData);
  if (context === undefined) {
    throw Error('useCompareToolData must be used within a CompareToolDataProvider');
  }
  return context;
}
