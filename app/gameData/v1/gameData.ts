import AmmoPenetrationLevel from "@/app/types/ammoPenetrationLevel";
import ArmorLevel from "@/app/types/armorLevel";
import CharacterClass from "@/app/types/characterClass";
import GunClass from "@/app/types/gunClass";

export type GameData = {
  version: 1;
  description?: string;
  lastUpdated: string;
  credits?: string;
  attachments: {
    muzzle: { [name: string]: Attachment; };
    barrel: { [name: string]: Attachment; };
  };
  guns: { [name: string]: CommonGunData; };
  havocWarfare: {
    guns: { [name: string]: HavocWarfareGunData };
  };
  tacticalTurmoil: {
    ammunition: {
      armorPenetrationFalloffs: { [name: string]: ArmorPenetrationFalloff };
      calibers: { [name: string]: CaliberData };
    };
    armor: {
      helmets: { [name: string]: ArmorData };
      vests: { [name: string]: ArmorData }
    };
    guns: { [name: string]: TacticalTurmoilGunData };
  };
};

export type Attachment = {
  effects: Effect[];
  compatibleGuns: string[];
  incompatibleAttachments?: string[];
};

export type Effect = RangeMultiplierEffect;

export type RangeMultiplierEffect = {
  type: 'range multiplier';
  amount: number;
};

export type CommonGunData = {
  type: GunClass;
  caliber: string;
  fireRate: number;
};

export type HavocWarfareGunData = {
  characterClass: CharacterClass[];
  damage: number;
  numPellets?: number;
  damageFalloffMultipliers: DamageFalloffMultiplier[];
  headMultiplier: number;
  abdomenMultiplier: number;
  shoulderMultiplier: number;
  lowerArmMultiplier: number;
  upperLegMultiplier: number;
  lowerLegMultiplier: number;
};

export type ArmorPenetrationFalloff = {
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  level6: number;
};

export type CaliberData = {
  sameArmorClassDamageMultiplier: number;
  variants: { [name: string]: AmmoVariant };
};

export type AmmoVariant = {
  numPellets?: number;
  penetrationLevel: AmmoPenetrationLevel;
  armorPenetrationFalloff: string;
  damageRatio: number;
};

export type ArmorData = {
  level: ArmorLevel;
  durability: number;
};

export type TacticalTurmoilGunData = {
  damage: number;
  armorPenetration: number;
  damageFalloffMultipliers: DamageFalloffMultiplier[];
  headMultiplier: number;
  abdomenMultiplier: number;
  shoulderMultiplier: number;
  lowerArmMultiplier: number;
  upperLegMultiplier: number;
  lowerLegMultiplier: number;
};

export type DamageFalloffMultiplier = {
  from: number;
  multiplier: number;
  isAffectedByAttachments?: boolean;
};
