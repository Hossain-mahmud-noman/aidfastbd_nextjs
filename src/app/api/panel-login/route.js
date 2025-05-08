import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { panel_token, panel_is_admin } = await request.json();

    if (!panel_is_admin || !panel_token) {
      return NextResponse.json({ message: 'Login data save failed' }, { status: 400 });
    }

    // Create the redirect response
    const response = NextResponse.redirect(new URL('/panel/', request.url));

    // Set cookies
    response.cookies.set('panel_is_admin', panel_is_admin, {
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set('panel_token', panel_token, {
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (err) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
