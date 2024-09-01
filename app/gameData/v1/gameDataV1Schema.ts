import { z } from "zod";

const rangeMultiplierEffectSchema = z.object({
  type: z.literal("range multiplier"),
  amount: z.number()
});

const damageFalloffMultiplierSchema = z.object({
  from: z.number(),
  multiplier: z.number(),
  isAffectedByAttachments: z.boolean().optional()
});

const baseGunSchema = z.object({
  damage: z.number(),
  fireRate: z.number(),
  armorPenetration: z.number(),
  damageFalloffMultipliers: z.array(damageFalloffMultiplierSchema),
  headMultiplier: z.number(),
  stomachMultiplier: z.number(),
  armMultiplier: z.number(),
  upperLegMultiplier: z.number(),
  lowerLegMultiplier: z.number(),
  characterClass: z.enum(['Assault', 'Support', 'Engineer', 'Recon']).array()
});

const nonShotgunSchema = baseGunSchema.extend({
  type: z.enum(['Assault Rifle', 'Marksman Rifle', 'Battle Rifle', 'Submachine Gun', 'Light Machine Gun', 'Sniper Rifle', 'Pistol'])
});

const shotgunSchema = baseGunSchema.extend({
  type: z.literal('Shotgun'),
  numBullets: z.number()
});

const gunSchema = z.union([
  nonShotgunSchema,
  shotgunSchema
]);

const attachmentSchema = z.object({
  effects: z.array(rangeMultiplierEffectSchema),
  compatibleGuns: z.array(z.string()),
  incompatibleAttachments: z.array(z.string()).optional()
});

const gameDataV1Schema = z.object({
  version: z.literal(1),
  description: z.string().optional(),
  lastUpdated: z.string(),
  credits: z.string().optional(),
  attachments: z.object({
    muzzle: z.record(attachmentSchema),
    barrel: z.record(attachmentSchema),
  }),
  guns: z.record(gunSchema)
});

export default gameDataV1Schema;
