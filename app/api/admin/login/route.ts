import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'crypto';
import { signAdminToken } from '@/lib/auth';

function sha256(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'Contraseña requerida' }, { status: 400 });
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    if (!storedHash) {
      return NextResponse.json({ error: 'Admin no configurado. Añade ADMIN_PASSWORD_HASH al .env.local' }, { status: 500 });
    }

    const inputHash = sha256(password);

    // Comparación segura contra timing attacks
    const a = Buffer.from(inputHash);
    const b = Buffer.from(storedHash);
    const valid = a.length === b.length && timingSafeEqual(a, b);

    if (!valid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = await signAdminToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[admin login]', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
