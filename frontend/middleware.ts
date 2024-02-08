import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function getUser(id: RequestCookie | undefined, token: RequestCookie | undefined) {
    const url = `http://127.0.0.1:8000/users/user/${id?.value}/`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token?.value}`,
            },
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export default async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const id = request.cookies.get('userId');
    const path = request.nextUrl.pathname;
    const user = await getUser(id, token);

    if (!token && (path.startsWith('/todos') || path.startsWith('/add-todo'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if (!user && (path.startsWith('/todos') || path.startsWith('/add-todo'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else if (user && (path.startsWith('/login') || path.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}