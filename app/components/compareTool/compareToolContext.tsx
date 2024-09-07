'use client';

import AttachmentRestriction from "@/app/types/attachmentRestriction";
import CharacterClass from "@/app/types/characterClass";
import GunType from "@/app/types/gunType";
import { ChangeEvent, ChangeEventHandler, createContext, FC, ReactNode, useContext, useReducer } from "react";

export type CompareToolArgs = {
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

export type CompareToolAction =
  { type: 'setTargetHp', value: number }
  | { type: 'setDistance', value: number }
  | { type: 'setHeadWeight', value: number }
  | { type: 'setThoraxWeight', value: number }
  | { type: 'setArmsWeight', value: number }
  | { type: 'setStomachWeight', value: number }
  | { type: 'setUpperLegsWeight', value: number }
  | { type: 'setLowerLegsWeight', value: number }
  | { type: 'setCharacterClasses', value: CharacterClass[] }
  | { type: 'setGunTypes', value: GunType[] }
  | { type: 'setAttachmentRestrictions', value: AttachmentRestriction[] };

const defaultCompareToolData: CompareToolArgs = {
  targetHp: 100.0,
  distance: 50,
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

const reducer = (state: CompareToolArgs, action: CompareToolAction): CompareToolArgs => {
  switch (action.type) {
    case 'setTargetHp': return { ...state, targetHp: action.value };
    case 'setDistance': return { ...state, distance: action.value };
    case 'setHeadWeight': return { ...state, headWeight: action.value };
    case 'setThoraxWeight': return { ...state, thoraxWeight: action.value };
    case 'setArmsWeight': return { ...state, armsWeight: action.value };
    case 'setStomachWeight': return { ...state, stomachWeight: action.value };
    case 'setUpperLegsWeight': return { ...state, upperLegsWeight: action.value };
    case 'setLowerLegsWeight': return { ...state, lowerLegsWeight: action.value };
    case 'setCharacterClasses': return { ...state, characterClasses: action.value };
    case 'setGunTypes': return { ...state, gunTypes: action.value };
    case 'setAttachmentRestrictions': return { ...state, attachmentRestrictions: action.value };
  }
};

const CompareToolData = createContext<
  (CompareToolArgs & { dispatch: React.Dispatch<CompareToolAction> })
  | undefined
>(undefined);

export const CompareToolDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultCompareToolData);
  return (
    <CompareToolData.Provider value={{ ...state, dispatch }}>
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
