import { GameDataV1 } from "@/app/gameData/v1/gameDataV1";
import GameDataV1Schema from "@/app/gameData/v1/gameDataV1Schema";

export type GameData = GameDataV1;

export async function parseGameData(json: any): Promise<{
  result: 'success',
  gameData: GameData
} | {
  result: 'error',
  message: string
}> {
  try {

    switch (json.version) {
      case 1:
        return {
          result: 'success',
          gameData: GameDataV1Schema.parse(json)
        };
      default:
        return {
          result: 'error',
          message: 'Unknown game data version number'
        };
    }

  } catch (error: any) {
    return {
      result: 'error',
      message: 'Failed to parse JSON data'
    }
  }
}
