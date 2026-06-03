import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

const ADMIN_PATHS = ['/admin/dashboard'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    const token = req.cookies.get('admin_token')?.value;
    const valid = token ? await verifyAdminToken(token) : false;
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
