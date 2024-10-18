
import { CompareToolData } from "@/app/components/compareTool/compareToolContext";
import { Attachment, DamageFalloffMultiplier, GameData, GunData, NonShotgunData, ShotgunData } from "@/app/gameData/v1/gameData";
import AttachmentRestriction from "@/app/types/attachmentRestriction";

type AdditionGunData = {
  avgDamage: number,
  dps: number,
  shotsToKill: number,
  timeToKill: number,
  muzzle: { name: string, data: Attachment, } | null,
  barrel: { name: string, data: Attachment } | null,
  withAttachmentsDamageFalloffMultipliers: DamageFalloffMultiplier[]
}

type AdditionalShotgunData = {
  type: 'Shotgun',
  minAvgDamage: number,
  minDps: number,
  maxShotsToKill: number,
  maxTimeToKill: number
};

// export type GunResultData = (NonShotgunData & AdditionGunData) | (ShotgunData & AdditionGunData & AdditionalShotgunData);
type GunResultData = (NonShotgunData & AdditionGunData) | (ShotgunData & AdditionGunData & AdditionalShotgunData);

export type ResultType = {
  [name: string]: GunResultData
};

export default function compareAll(gameData: GameData): (compareToolData: CompareToolData) => ResultType {

  return ({
    targetHp,
    distance,
    headWeight,
    chestWeight,
    stomachWeight,
    armsWeight,
    upperLegsWeight,
    lowerLegsWeight,
    requiredCharacterClasses: characterClasses,
    requiredGunClasses: gunTypes,
    attachmentRestrictions
  }) => {

    const result: [name: string, (NonShotgunData & AdditionGunData) | (ShotgunData & AdditionGunData & AdditionalShotgunData)][] = Object.entries(gameData.guns)
      // filter by character class
      .filter(([_, gunData]) => gunData.characterClass.some(c => characterClasses.includes(c)))
      // filter by gun type
      .filter(([_, gunData]) => gunTypes.includes(gunData.type))
      // calculate additional data for each gun
      .map(([gunName, gunData]) => {

        // pick attachments
        const muzzle = pickAttachment(gunName, gameData.attachments.muzzle, attachmentRestrictions);
        const barrel = pickAttachment(gunName, gameData.attachments.barrel, attachmentRestrictions);

        // find updated damage falloff multipliers
        const rangeMultiplier = 1.0
          + (muzzle?.data.effects.find(effect => effect.type === 'range multiplier')?.amount ?? 0)
          + (barrel?.data.effects.find(effect => effect.type === 'range multiplier')?.amount ?? 0);

        const withAttachmentsDamageFalloffMultipliers = gunData.damageFalloffMultipliers.map((dfm) => ({
          ...dfm,
          from: (dfm.isAffectedByAttachments ?? true) ? dfm.from * rangeMultiplier : dfm.from
        }));

        const maxDamagePerShot = gunData.damage * (gunData.type === 'Shotgun' ? gunData.numBullets : 1);

        const avgDamagePerShot = getDistanceMultiplier(gunData, distance)
          * calcAvgDamagePerShot(
            maxDamagePerShot,
            gunData,
            headWeight,
            chestWeight,
            stomachWeight,
            armsWeight,
            upperLegsWeight,
            lowerLegsWeight
          );

        const dps = avgDamagePerShot * (gunData.fireRate / 60.0);
        const shotsToKill = Math.ceil(targetHp / avgDamagePerShot);
        const timeToKill = Math.round(((shotsToKill - 1) * 1000 / (gunData.fireRate / 60.0)))

        // result
        if (gunData.type !== 'Shotgun') {
          const updatedGunData: (GunData & AdditionGunData) = {
            avgDamage: avgDamagePerShot,
            dps,
            shotsToKill,
            timeToKill,
            muzzle,
            barrel,
            withAttachmentsDamageFalloffMultipliers,
            ...gunData
          };

          return [gunName, updatedGunData];
        }

        // additional shotgun values
        else {

          const minAvgDamagePerShot = getDistanceMultiplier(gunData, distance)
            * calcAvgDamagePerShot(
              gunData.damage,
              gunData,
              headWeight,
              chestWeight,
              stomachWeight,
              armsWeight,
              upperLegsWeight,
              lowerLegsWeight
            );

          const minDps = minAvgDamagePerShot * (gunData.fireRate / 60.0);
          const maxShotsToKill = Math.ceil(targetHp / minAvgDamagePerShot);
          const maxTimeToKill = Math.round(((maxShotsToKill - 1) * 1000 / (gunData.fireRate / 60.0)))

          // shotgun result
          const updatedGunData: (GunData & AdditionGunData & AdditionalShotgunData) = {
            avgDamage: avgDamagePerShot,
            dps,
            shotsToKill,
            timeToKill,
            muzzle,
            barrel,
            withAttachmentsDamageFalloffMultipliers,
            minAvgDamage: minAvgDamagePerShot,
            minDps,
            maxShotsToKill,
            maxTimeToKill,
            ...gunData
          };

          return [gunName, updatedGunData];
        }
      });

    return Object.fromEntries(result);
  };
}

// function compareAll2(
//   {
//     gameData,
//     targetHp,
//     distance,
//     headWeight,
//     chestWeight,
//     stomachWeight,
//     armsWeight,
//     upperLegsWeight,
//     lowerLegsWeight,
//     requiredCharacterClasses: characterClasses,
//     requiredGunClasses: gunTypes,
//     attachmentRestrictions
//   }: CompareToolData & { gameData: GameData }
// ): ResultType {


// };

function pickAttachment(
  gunName: string,
  attachments: { [name: string]: Attachment },
  attachmentRestrictions: AttachmentRestriction[]
): { name: string, data: Attachment } | null {

  const attachmentEntries = Object.entries(attachments);

  // check for required attachment restriction
  const requiredAttachmentName = attachmentRestrictions
    .filter(restriction => restriction.type === 'requireAttachment')
    .find(restriction => restriction.gun === gunName)
    ?.attachment;

  // if there is a required attachment restriction...
  if (requiredAttachmentName) {
    // if the required attachment can be picked from the provided list of muzzle/barrel attachments...
    const requiredAttachment = attachmentEntries.find(([attachmentName, _]) => (attachmentName === requiredAttachmentName))?.[1];
    // ...pick that attachment
    if (requiredAttachment) { return { name: requiredAttachmentName, data: requiredAttachment }; }
  }

  const result = attachmentEntries
    // filter by gun compatible attachments
    .filter(([_, attachmentData]) => attachmentData.compatibleGuns.includes(gunName))
    // remove excluded attachments
    .filter(([attachmentName, _]) =>
      attachmentRestrictions
        .filter(restriction => restriction.type === 'excludeAttachment')
        .every(restriction => {
          const excludeCondition1 = restriction.gun.type === 'all' || restriction.gun.name === gunName;
          const excludeCondition2 = restriction.attachment.type === 'all' || restriction.attachment.name === attachmentName;
          return !(excludeCondition1 && excludeCondition2);
        })
    )
    // find best attachment to increase range
    .reduce<[name: string, attachmentData: Attachment] | null>((attachmentA, attachmentB) => {
      if (attachmentA === null && attachmentB[1].effects.some(effect => effect.type === 'range multiplier')) {
        return attachmentB;
      }

      if (attachmentA !== null) {
        const aRangeMultiplier = attachmentA[1].effects.find(effect => effect.type === 'range multiplier')?.amount ?? 0;
        const bRangeMultiplier = attachmentB[1].effects.find(effect => effect.type === 'range multiplier')?.amount ?? 0;
        if (bRangeMultiplier > aRangeMultiplier) return attachmentB;
        else return attachmentA;
      }

      return null;
    }, null);

  // use attachment if it increases range
  const resultRangeMultiplier = result
    ? (result[1].effects.find(effect => effect.type === 'range multiplier')?.amount ?? 0)
    : 0;
  if (result !== null && resultRangeMultiplier > 0) { return { name: result[0], data: result[1] }; }

  return null;
}

function calcAvgDamagePerShot(
  maxDamagePerShot: number,
  gunData: GunData,
  headWeight: number,
  chestWeight: number,
  stomachWeight: number,
  armsWeight: number,
  upperLegsWeight: number,
  lowerLegsWeight: number
) {
  const weightsTotal = headWeight + chestWeight + stomachWeight + upperLegsWeight + lowerLegsWeight;
  const headPercentage = headWeight / weightsTotal;
  const chestPercentage = chestWeight / weightsTotal;
  const stomachPercentage = stomachWeight / weightsTotal;
  const armsPercentage = armsWeight / weightsTotal;
  const upperLegsPercentage = upperLegsWeight / weightsTotal;
  const lowerLegsPercentage = lowerLegsWeight / weightsTotal;

  return (headPercentage * gunData.headMultiplier * maxDamagePerShot)
    + (chestPercentage * maxDamagePerShot)
    + (stomachPercentage * gunData.stomachMultiplier * maxDamagePerShot)
    + (armsPercentage * gunData.armMultiplier * maxDamagePerShot)
    + (upperLegsPercentage * gunData.upperLegMultiplier * maxDamagePerShot)
    + (lowerLegsPercentage * gunData.lowerLegMultiplier * maxDamagePerShot);
}

function getDistanceMultiplier(gunData: GunData, distance: number): number {
  return gunData.damageFalloffMultipliers
    .sort((a, b) => a.from - b.from)
    .findLast(dfm => distance >= dfm.from)?.multiplier ?? 1.0;
}
