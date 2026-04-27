import { z } from 'zod';

export const clienteSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Insira um e-mail válido"),
  telefone: z.string().optional().nullable(),
  cpf: z.string().length(14, "O CPF deve seguir o formato 000.000.000-00"),
});

export const vendaSchema = z.object({
  cliente_id: z.number().int("O ID deve ser um número inteiro"),
  total: z.number().positive("O valor deve ser maior que zero"),
  
  // Versão ultra-compatível do enum
  status: z.enum(['pendente', 'concluida', 'cancelada']),
  
  itens: z.array(
    z.object({
      joia_id: z.number().int(),
      quantidade: z.number().min(1, "Mínimo de 1 unidade"),
      preco_unitario: z.number().positive()
    })
  ).min(1, "A venda deve ter pelo menos um item")
});