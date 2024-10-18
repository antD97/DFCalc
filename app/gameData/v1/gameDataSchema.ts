import { z } from "zod";

const damageFalloffMultiplierSchema = z.object({
  from: z.number().nonnegative(),
  multiplier: z.number().nonnegative(),
  isAffectedByAttachments: z.boolean().optional()
});

const tacticalTurmoilGunDataSchema = z.object({
  damage: z.number().positive().int(),
  armorPenetration: z.number().positive().int(),
  damageFalloffMultipliers: damageFalloffMultiplierSchema.array(),
  headMultiplier: z.number().positive(),
  abdomenMultiplier: z.number().positive(),
  shoulderMultiplier: z.number().positive(),
  lowerArmMultiplier: z.number().positive(),
  upperLegMultiplier: z.number().positive(),
  lowerLegMultiplier: z.number().positive()
});

const armorDataSchema = z.object({
  level: z.number().int().min(1).max(6),
  durability: z.number().int().positive()
})

const ammoVariantSchema = z.object({
  numPellets: z.number().positive().int().optional(),
  penetrationLevel: z.number().int().min(1).max(7),
  armorPenetrationFalloffSchema: z.string(),
  damageRatio: z.number().positive()
});

const caliberDataSchema = z.object({
  sameArmorClassDamageMultiplier: z.number().positive(),
  variants: z.record(ammoVariantSchema)
});

const armorPenetrationFalloffSchema = z.object({
  level1: z.number().positive(),
  level2: z.number().positive(),
  level3: z.number().positive(),
  level4: z.number().positive(),
  level5: z.number().positive(),
  level6: z.number().positive()
});

const havocWarfareGunDataSchema = z.object({
  characterClass: z.enum(['Assault', 'Support', 'Engineer', 'Recon']).array(),
  damage: z.number().positive().int(),
  numPellets: z.number().positive().int().optional(),
  damageFalloffMultipliers: damageFalloffMultiplierSchema.array(),
  headMultiplier: z.number().positive(),
  abdomenMultiplier: z.number().positive(),
  shoulderMultiplier: z.number().positive(),
  lowerArmMultiplier: z.number().positive(),
  upperLegMultiplier: z.number().positive(),
  lowerLegMultiplier: z.number().positive()
});

const commonGunDataSchema = z.object({
  type: z.enum(['Assault Rifle', 'Marksman Rifle', 'Submachine Gun', 'Light Machine Gun', 'Sniper Rifle', 'Pistol']),
  caliber: z.string(),
  fireRate: z.number().positive().int()
});

const rangeMultiplierEffectSchema = z.object({
  type: z.literal("range multiplier"),
  amount: z.number().positive()
});

const attachmentSchema = z.object({
  effects: z.array(rangeMultiplierEffectSchema),
  compatibleGuns: z.array(z.string()),
  incompatibleAttachments: z.array(z.string()).optional()
});

const gameDataSchema = z.object({
  version: z.literal(1),
  description: z.string().optional(),
  lastUpdated: z.string(),
  credits: z.string().optional(),
  attachments: z.object({
    muzzle: z.record(attachmentSchema),
    barrel: z.record(attachmentSchema),
  }),
  guns: z.record(commonGunDataSchema),
  havocWarfare: z.object({
    guns: z.record(havocWarfareGunDataSchema)
  }),
  tacticalTurmoil: z.object({
    ammunition: z.object({
      armorPenetrationFalloffs: z.record(armorPenetrationFalloffSchema),
      calibers: z.record(caliberDataSchema)
    }),
    armor: z.object({
      helmets: z.record(armorDataSchema),
      vests: z.record(armorDataSchema)
    }),
    guns: z.record(tacticalTurmoilGunDataSchema)
  })
});

export default gameDataSchema;
