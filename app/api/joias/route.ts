import { sql } from '@/lib/db';
import { joiaSchema } from '@/lib/validators/joias';
import { NextResponse } from 'next/server';

// GET - LISTAR PRODUTOS
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  try {
    const result = search
      ? await sql`
          SELECT * FROM joias 
          WHERE nome ILIKE ${'%' + search + '%'}
          ORDER BY id DESC
        `
      : await sql`SELECT * FROM joias ORDER BY id DESC`;

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("DEBUG - Erro no GET:", error.message);
    return NextResponse.json({ error: 'Erro ao carregar lista' }, { status: 500 });
  }
}

// POST - CADASTRAR PRODUTO
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = joiaSchema.safeParse(body);
    
    if (!parsed.success) {
      console.error("DEBUG - Erro Zod:", parsed.error.format());
      return NextResponse.json({ error: "Dados inválidos", details: parsed.error.format() }, { status: 400 });
    }

    const { nome, material, preco, estoque, categoria, imagem_url } = parsed.data;

    // Adicionamos CURRENT_TIMESTAMP explicitamente para evitar o erro 500 
    // se o banco não tiver DEFAULT NOW() configurado
    await sql`
      INSERT INTO joias (nome, material, preco, estoque, categoria, imagem_url, created_at, updated_at)
      VALUES (
        ${nome.trim()}, 
        ${material.trim()}, 
        ${preco}, 
        ${estoque}, 
        ${categoria.trim()}, 
        ${imagem_url || null},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
    `;

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("DEBUG - Erro SQL Detalhado:", error.message);
    return NextResponse.json({ 
      error: 'Erro ao salvar no banco', 
      details: error.message 
    }, { status: 500 });
  }
}