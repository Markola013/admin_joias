import { sql } from '@/lib/db';
import { joiaSchema } from '@/lib/validators/joias';
import { NextRequest, NextResponse } from 'next/server';

// PUT - ATUALIZAR JOIA (Sem SKU)
export async function PUT(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Validação com o joiaSchema (que já deve estar sem o SKU)
    const parsed = joiaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(parsed.error, { status: 400 });
    }

    const { nome, material, preco, estoque, categoria, imagem_url } = parsed.data;

    await sql`
      UPDATE joias SET 
        nome = ${nome.trim()}, 
        material = ${material.trim()}, 
        preco = ${preco}, 
        estoque = ${estoque}, 
        categoria = ${categoria.trim()}, 
        imagem_url = ${imagem_url || null}, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DEBUG - Erro no PUT:", error.message);
    return NextResponse.json({ error: 'Erro ao atualizar os dados no banco' }, { status: 500 });
  }
}

// DELETE - REMOVER JOIA
export async function DELETE(
  _: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await sql`DELETE FROM joias WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DEBUG - Erro no DELETE:", error.message);
    return NextResponse.json({ error: 'Erro ao deletar a joia do banco' }, { status: 500 });
  }
}