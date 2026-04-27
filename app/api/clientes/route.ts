import { sql } from '@/lib/db';
import { clienteSchema } from '@/lib/validators/admin';
import { NextRequest, NextResponse } from 'next/server';


// Buscar todos os clientes
export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM clientes ORDER BY nome ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar clientes' }, { status: 500 });
  }
}

// Cadastrar um novo cliente
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = clienteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(parsed.error, { status: 400 });
    }

    const { nome, email, telefone, cpf } = parsed.data;

    await sql`
      INSERT INTO clientes (nome, email, telefone, cpf)
      VALUES (${nome}, ${email}, ${telefone}, ${cpf})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    // Trata erro de e-mail ou CPF duplicado
    if (error.code === '23505') {
      return NextResponse.json({ error: 'E-mail ou CPF já cadastrado' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno ao salvar cliente' }, { status: 500 });
  }
}