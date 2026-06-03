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
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PATCH(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  const supabase = createClient();
  const { error } = await supabase.from('contact_messages').update({ read: true }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
  const supabase = createClient();
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
