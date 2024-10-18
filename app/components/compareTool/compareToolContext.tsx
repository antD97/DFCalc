'use client';

import AttachmentRestriction from "@/app/types/attachmentRestriction";
import CharacterClass from "@/app/types/characterClass";
import GunClass from "@/app/types/gunClass";
import { createContext, FC, ReactNode, useContext, useReducer } from "react";

export type CompareToolData = {
  targetHp: number,
  distance: number,
  headWeight: number,
  chestWeight: number,
  armsWeight: number,
  stomachWeight: number,
  upperLegsWeight: number,
  lowerLegsWeight: number,
  requiredCharacterClasses: CharacterClass[],
  requiredGunClasses: GunClass[],
  attachmentRestrictions: AttachmentRestriction[],
  newAttachmentRestrictionsModalVisible: boolean
};

export type CompareToolAction =
  { type: 'setTargetHp', value: number }
  | { type: 'setDistance', value: number }
  | { type: 'setHeadWeight', value: number }
  | { type: 'setChestWeight', value: number }
  | { type: 'setArmsWeight', value: number }
  | { type: 'setStomachWeight', value: number }
  | { type: 'setUpperLegsWeight', value: number }
  | { type: 'setLowerLegsWeight', value: number }
  | { type: 'setCharacterClasses', value: CharacterClass[] }
  | { type: 'setGunClasses', value: GunClass[] }
  | { type: 'setAttachmentRestrictions', value: AttachmentRestriction[] }
  | { type: 'setNewAttachmentRestrictionsModalVisible', value: boolean };

const defaultCompareToolData: CompareToolData = {
  targetHp: 100.0,
  distance: 50,
  headWeight: 0.0,
  chestWeight: 1.0,
  armsWeight: 0.0,
  stomachWeight: 0.0,
  upperLegsWeight: 0.0,
  lowerLegsWeight: 0.0,
  requiredCharacterClasses: ['Assault', 'Support', 'Engineer', 'Recon'],
  requiredGunClasses: [
    'Assault Rifle',
    'Light Machine Gun',
    'Marksman Rifle',
    'Pistol',
    'Shotgun',
    'Sniper Rifle',
    'Submachine Gun'
  ],
  attachmentRestrictions: [],
  newAttachmentRestrictionsModalVisible: false
};

const reducer = (state: CompareToolData, action: CompareToolAction): CompareToolData => {
  switch (action.type) {
    case 'setTargetHp': return { ...state, targetHp: action.value };
    case 'setDistance': return { ...state, distance: action.value };
    case 'setHeadWeight': return { ...state, headWeight: action.value };
    case 'setChestWeight': return { ...state, chestWeight: action.value };
    case 'setArmsWeight': return { ...state, armsWeight: action.value };
    case 'setStomachWeight': return { ...state, stomachWeight: action.value };
    case 'setUpperLegsWeight': return { ...state, upperLegsWeight: action.value };
    case 'setLowerLegsWeight': return { ...state, lowerLegsWeight: action.value };
    case 'setCharacterClasses': return { ...state, requiredCharacterClasses: action.value };
    case 'setGunClasses': return { ...state, requiredGunClasses: action.value };
    case 'setAttachmentRestrictions': return { ...state, attachmentRestrictions: action.value };
    case 'setNewAttachmentRestrictionsModalVisible': return { ...state, newAttachmentRestrictionsModalVisible: action.value };
  }
};

const CompareToolDataContext = createContext<
  (CompareToolData & { dispatch: React.Dispatch<CompareToolAction> })
  | undefined
>(undefined);

export const CompareToolDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultCompareToolData);
  return (
    <CompareToolDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompareToolDataContext.Provider>
  )
};

export const useCompareToolData = () => {
  const context = useContext(CompareToolDataContext);
  if (context === undefined) {
    throw Error('useCompareToolData must be used within a CompareToolDataProvider');
  }
  return context;
}
