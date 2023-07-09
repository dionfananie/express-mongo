import { z } from 'zod';

const Qurban = z.object({ qurban_id: z.string(), name: z.string(), qurban_type: z.string() });
const BuyerData = z.object({
  name: z.string(),
  address: z.string().min(3),
  handphone: z.number(),
  qurban: Qurban,
  desc: z.string().nullable(),
  hasPaid: z.boolean().default(false),
  date: z.date(),
});

export default BuyerData;
