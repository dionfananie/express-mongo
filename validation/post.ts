import { z } from 'zod';

export const PostData = z.object({
  title: z.string(),
  desc: z.string().min(10),
});
