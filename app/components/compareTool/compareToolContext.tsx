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

type CompareToolAction =
  { type: 'setTargetHp', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setDistance', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setHeadWeight', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setThoraxWeight', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setArmsWeight', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setStomachWeight', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setUpperLegsWeight', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setLowerLegsWeight', argType: 'numericalInputEvent', event: ChangeEvent<HTMLInputElement> }
  | { type: 'setCharacterClasses', argType: '', characterClasses: CharacterClass[] }
  | { type: 'setGunTypes', argType: '', gunTypes: GunType[] }
  | { type: 'setAttachmentRestrictions', argType: '', attachmentRestrictions: AttachmentRestriction[] };

const defaultCompareToolData: CompareToolArgs = {
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

const reducer = (state: CompareToolArgs, action: CompareToolAction): CompareToolArgs => {

  switch (action.argType) {

    case 'numericalInputEvent':
      const n = Number(action.event.target.value);
      if (action.event.target.value !== '' && n >= 0) {
        switch (action.type) {
          case 'setTargetHp': return { ...state, targetHp: n };
          case 'setDistance': return { ...state, distance: n };
          case 'setHeadWeight': return { ...state, headWeight: n };
          case 'setThoraxWeight': return { ...state, thoraxWeight: n };
          case 'setArmsWeight': return { ...state, armsWeight: n };
          case 'setStomachWeight': return { ...state, stomachWeight: n };
          case 'setUpperLegsWeight': return { ...state, upperLegsWeight: n };
          case 'setLowerLegsWeight': return { ...state, lowerLegsWeight: n };
        }
      } else {
        console.log(state)
        return state;
      }

    default:
      switch (action.type) {
        case 'setCharacterClasses': return { ...state, characterClasses: action.characterClasses };
        case 'setGunTypes': return { ...state, gunTypes: action.gunTypes };
        case 'setAttachmentRestrictions': return { ...state, attachmentRestrictions: action.attachmentRestrictions };
      }
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
