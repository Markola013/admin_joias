// lib/validators/joia.ts
import { z } from 'zod';

export const joiaSchema = z.object({
  nome: z.string().min(2),
  material: z.string().min(2),
  preco: z.number().positive(),
  estoque: z.number().int().nonnegative(),
  categoria: z.string(),
  sku: z.string().min(3),
  imagem_url: z.string().url().optional().or(z.literal("")),
});