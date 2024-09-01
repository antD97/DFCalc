import CharacterClass from "@/app/types/characterClass";

export type GameDataV1 = {
  version: 1;
  description?: string;
  lastUpdated: string;
  credits?: string;
  attachments: {
    muzzle: { [name: string]: Attachment; };
    barrel: { [name: string]: Attachment; };
  };
  guns: { [name: string]: GunData; };
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

export type BaseGunData = {
  damage: number;
  fireRate: number;
  armorPenetration: number;
  damageFalloffMultipliers: DamageFalloffMultiplier[];
  headMultiplier: number;
  stomachMultiplier: number;
  armMultiplier: number;
  upperLegMultiplier: number;
  lowerLegMultiplier: number;
  characterClass: CharacterClass[];
};

export type NonShotgunData = BaseGunData & {
  type: 'Assault Rifle' | 'Marksman Rifle' | 'Battle Rifle' | 'Submachine Gun' | 'Light Machine Gun' | 'Marksman Rifle' | 'Sniper Rifle' | 'Pistol';
};

export type ShotgunData = BaseGunData & {
  type: 'Shotgun';
  numBullets: number;
};

export type GunData = NonShotgunData | ShotgunData;

export type DamageFalloffMultiplier = {
  from: number;
  multiplier: number;
  isAffectedByAttachments?: boolean;
};
