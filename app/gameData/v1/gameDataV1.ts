export type GameDataV1 = {
  version: 1;
  description?: string;
  lastUpdated: string;
  credits?: string;
  attachments: {
    muzzle: { [name: string]: Attachment; };
    barrel: { [name: string]: Attachment; };
  };
  guns: { [name: string]: Gun; };
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
}

type BaseGun = {
  damage: number;
  fireRate: number;
  armorPenetration: number;
  damageFalloffMultipliers: DamageFalloffMultiplier[];
  headMultiplier: number;
  stomachMultiplier: number;
  armMultiplier: number;
  upperLegMultiplier: number;
  lowerLegMultiplier: number;
  characterClass: ('Assault' | 'Support' | 'Engineer' | 'Recon')[];
}

export type Gun = BaseGun & ({
  type: 'Assault Rifle' | 'Marksman Rifle' | 'Battle Rifle' | 'Submachine Gun' | 'Light Machine Gun' | 'Marksman Rifle' | 'Sniper Rifle' | 'Pistol';
} | {
  type: 'Shotgun';
  numBullets: number;
});

export type DamageFalloffMultiplier = {
  from: number;
  multiplier: number;
  isAffectedByAttachments?: boolean;
};
