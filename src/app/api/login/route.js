import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the request body
    const { token, user } = await request.json();

    // Validate the presence of token and user
    if (!user || !token) {
      return NextResponse.json({ message: 'Login data save failed' }, { status: 400 });
    }

    // Create the response
    const response = NextResponse.json({ message: 'Login data saved' });

    // Set cookies
    response.cookies.set('user', JSON.stringify(user), {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
