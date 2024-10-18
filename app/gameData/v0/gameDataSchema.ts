import { z } from "zod";

/** Here to demonstrate the game data version updating pattern. */
export default z.object({
  version: z.literal(0),
  description: z.string().optional(),
  lastUpdated: z.string(),
  credits: z.string().optional()
});
