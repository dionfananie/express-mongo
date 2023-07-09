import { number, object, string, TypeOf } from 'zod';

const payload = {
  query: object({ id: string().optional(), type: string().optional() }),
};

export const qurbanTypeSchema = object({ ...payload });
