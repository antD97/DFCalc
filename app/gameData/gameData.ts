import { GameDataV1 } from "@/app/gameData/v1/gameDataV1";
import GameDataV1Schema from "@/app/gameData/v1/gameDataV1Schema";

export type GameData = GameDataV1;

export async function validateGameData(json: any): Promise<GameData | "error"> {
  try {
    switch (json.version) {
      case 1: return GameDataV1Schema.parse(json);
    }
  } catch (error: any) {
    return "error";
  }
  return "error";
}
