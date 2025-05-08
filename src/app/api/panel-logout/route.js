import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Create a redirect response to /panel/login
    const response = NextResponse.redirect(new URL('/panel/login', request.url));

    // Delete the 'panel_is_admin' cookie
    response.cookies.delete('panel_is_admin');

    // Delete the 'panel_token' cookie
    response.cookies.delete('panel_token');

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}



export async function GET(request) {
  try {
    // Create a redirect response to /panel/login
    const response = NextResponse.redirect(new URL('/panel/login', request.url));

    // Delete the 'panel_is_admin' cookie
    response.cookies.delete('panel_is_admin');

    // Delete the 'panel_token' cookie
    response.cookies.delete('panel_token');

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
