import { AmmoVariant, GameData, HavocWarfareGunData, TacticalTurmoilGunData } from "@/app/gameData/v1/gameData";
import ArmorLevel from "@/app/types/armorLevel";
import BodyPart from "@/app/types/bodyPart";

type Scenario = {
  initHp: number;
  helmet?: {
    level: ArmorLevel;
    durability: number;
    protects: ('chest' | 'abdomen' | 'shoulder')[];
  };
  vest?: {
    level: ArmorLevel;
    durability: number;
  };
  shot: {
    gun: HavocWarfareGunData | TacticalTurmoilGunData;
    ammo: AmmoVariant;
    bodyPart: BodyPart;
  };
};

type ResultType = {
  hp: number;
  hpDamage: number;
  helmetDurability?: number;
  helmetDamage?: number;
  vestDurability?: number;
  vestDamage?: number;
};

export default function scenario(gameData: GameData): (scenario: Scenario) => ResultType {

  return ({ initHp, helmet, vest, shot: { gun, ammo, bodyPart } }) => {

    switch (bodyPart) {
      case 'head':
        if (helmet) {
          // reduce damage yada yada...
        }
        break;
      case 'chest':
      case 'abdomen':
      case 'shoulder':
        if (vest) {
          // reduce damage yada yada...
        }
        break;
    }

    return {
      hp: initHp,
      hpDamage: 0
    };
  };
}