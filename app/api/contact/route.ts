import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // Import Supabase lazily to avoid build errors if env vars not set
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message }]);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact route]', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
