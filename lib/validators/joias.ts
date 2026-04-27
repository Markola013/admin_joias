import { z } from 'zod';

export const joiaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  material: z.string().min(1, "Material é obrigatório"),
  preco: z.coerce.number().min(0.01, "Preço inválido"),
  estoque: z.coerce.number().int().min(0, "Estoque inválido"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  imagem_url: z.string().optional().nullable().or(z.literal('')),
});