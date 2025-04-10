import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Create a response object
        const response = NextResponse.json({ message: 'Logout successfully' });
        // Set cookies with HttpOnly flag and expiration in the past
        response.cookies.set('user', '', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            expires: new Date(0), // Set expiration to a past date
        });
        response.cookies.set('token', '', {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            expires: new Date(0), // Set expiration to a past date
        });

        return response;
    } catch (err) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
