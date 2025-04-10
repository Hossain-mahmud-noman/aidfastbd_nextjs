// app/api/get-location-cookie/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  const cookies = request.cookies.get('userLocation');

  if (!cookies) {
    return NextResponse.json({ lat: null, lng: null, name: "" });
  }

  const location = JSON.parse(cookies.value);
  return NextResponse.json({ location });
}
