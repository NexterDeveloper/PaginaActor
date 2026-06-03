import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signAdminToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: 'Contraseña requerida' }, { status: 400 });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH;
    console.log('HASH RECIBIDO:', hash);
    if (!hash) {
      return NextResponse.json({ error: 'Admin no configurado' }, { status: 500 });
    }

    const valid = await bcrypt.compare(password, hash);
    if (!valid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = await signAdminToken();

    const response = NextResponse.json({ ok: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 horas
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[admin login]', err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
