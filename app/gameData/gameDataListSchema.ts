import { z } from "zod";

const gameDataListSchema = z.object({
  filename: z.string(),
  gameMode: z.enum(['Havoc Warfare', 'Tactical Turmoil'])
}).array();

export default gameDataListSchema;
