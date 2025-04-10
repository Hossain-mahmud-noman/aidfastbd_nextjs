// app/api/set-location-cookie/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { lat, lng,name } = await request.json();

  if (!lat || !lng || !name) {
    return NextResponse.json({ message: 'Latitude and longitude are required.' }, { status: 400 });
  }

  // Set the cookie with HttpOnly flag
  const response = NextResponse.json({ message: 'Location saved in HTTP-only cookie' });
  
  response.cookies.set('userLocation', JSON.stringify({ lat, lng,name }), {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
