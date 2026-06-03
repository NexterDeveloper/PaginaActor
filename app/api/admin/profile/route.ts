import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyAdminToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { defaultProfile } from '@/lib/default-content';

async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token && (await verifyAdminToken(token));
}

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const supabase = createClient();
  const { data } = await supabase.from('site_content').select('key,value').eq('section', 'profile');
  const fromDB: Record<string, string> = {};
  (data ?? []).forEach(({ key, value }: any) => { fromDB[key] = value; });
  return NextResponse.json({ ...defaultProfile, ...fromDB });
}

export async function PUT(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  const fields: Record<string, string> = await req.json();
  const supabase = createClient();
  const upserts = Object.entries(fields).map(([key, value]) => ({ section: 'profile', key, value, updated_at: new Date().toISOString() }));
  const { error } = await supabase.from('site_content').upsert(upserts, { onConflict: 'section,key' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
