import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token && (await verifyAdminToken(token));
}

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const supabase = createClient();
  const { data, error } = await supabase.from('gallery_images').select('*').order('order_index');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No se recibió archivo' }, { status: 400 });

  const supabase = createClient();
  const ext = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filename, bytes, { contentType: file.type, upsert: false });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filename);

  const { data, error } = await supabase.from('gallery_images').insert([{ url: publicUrl, alt: file.name }]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  const supabase = createClient();
  const { data: img } = await supabase.from('gallery_images').select('url').eq('id', id).single();
  if (img?.url) {
    const filename = img.url.split('/').pop();
    if (filename) await supabase.storage.from('gallery').remove([filename]);
  }
  const { error } = await supabase.from('gallery_images').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
