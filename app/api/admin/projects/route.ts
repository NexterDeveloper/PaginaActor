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
  const { data, error } = await supabase.from('projects').select('*').order('order_index').order('year', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const body = await req.json();
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const body = await req.json();
  const { id, ...rest } = body;
  const supabase = createClient();
  const { data, error } = await supabase.from('projects').update(rest).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  const supabase = createClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
