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

    // DEBUG — quitar después de resolver
    console.log('--- ADMIN LOGIN DEBUG ---');
    console.log('password recibida (longitud):', password.length);
    console.log('hash del env (primeros 20 chars):', hash?.slice(0, 20));
    console.log('hash longitud total:', hash?.length);
    console.log('hash completo:', hash);
    console.log('-------------------------');

    if (!hash) {
      return NextResponse.json({ error: 'Admin no configurado' }, { status: 500 });
    }

    const valid = await bcrypt.compare(password, hash);
    console.log('bcrypt.compare resultado:', valid);

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
