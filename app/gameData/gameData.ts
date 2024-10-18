import compareAll from '@/app/gameData/compareAll';
import GameDataV0Schema from '@/app/gameData/v0/gameDataSchema';
import updateV0 from '@/app/gameData/v0/update';
import { GameData as GameDataV1 } from '@/app/gameData/v1/gameData';
import GameDataV1Schema from '@/app/gameData/v1/gameDataSchema';

export type GameData = GameDataV1;

export async function parseGameData(rawData: any): Promise<{
  result: 'success',
  gameData: GameData,
  compareAll: (args: any) => any
} | {
  result: 'error',
  message: string
}> {

  try {

    if (rawData.version === 0) { // update version 0
      const gameData = GameDataV0Schema.parse(rawData);
      return parseGameData(updateV0(gameData));

    } else if (rawData.version === 1) { // current version
      const gameData = GameDataV1Schema.parse(rawData);
      return {
        result: 'success',
        gameData,
        compareAll
      };

    } else { // failed to read
      return {
        result: 'error',
        message: 'Failed to parse game data'
      };
    }

  } catch (error: any) { // failed to read
    return {
      result: 'error',
      message: 'Failed to parse game data'
    }
  }
}
