
import { GameData as GameDataV0 } from '@/app/gameData/v0/gameData';
import { GameData as GameDataV1 } from '@/app/gameData/v1/gameData';

/** Here to demonstrate the game data version updating pattern. */
export default function update(gameDataV0: GameDataV0): GameDataV1 {
  return {
    ...gameDataV0,
    version: 1,
    attachments: {
      muzzle: {},
      barrel: {}
    },
    guns: {}
  };
}
