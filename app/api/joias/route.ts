// app/api/joias/route.ts
import { sql } from '@/lib/db';
import { joiaSchema } from '@/lib/validators/joias';
import { NextResponse } from 'next/server';

// GET - LISTAR
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  try {
    const result = search
      ? await sql`
        SELECT * FROM joias 
        WHERE nome ILIKE ${'%' + search + '%'} 
        OR sku ILIKE ${'%' + search + '%'}
        ORDER BY id DESC
      `
      : await sql`SELECT * FROM joias ORDER BY id DESC`;

    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}

// POST - CRIAR
export async function POST(req: Request) {
  const body = await req.json();

  const parsed = joiaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error, { status: 400 });
  }

  const { nome, material, preco, estoque, categoria, sku, imagem_url } = parsed.data;

  try {
    await sql`
      INSERT INTO joias (nome, material, preco, estoque, categoria, sku, imagem_url)
      VALUES (${nome}, ${material}, ${preco}, ${estoque}, ${categoria}, ${sku}, ${imagem_url})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao inserir' }, { status: 500 });
  }
}