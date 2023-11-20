import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// if not with session-cookie, redirect to '/start'
//else to '/'

//self implemented session
//if not session_id, set session_id
//else check the server-side session store for the user's info

export function middleware(request: NextRequest){
    console.log("this is from middleware")
    const req_cookies = request.cookies
    if (!req_cookies.has('session_id')){
        console.log("not session_id")
        req_cookies.set('session_id', '123')
        const response = NextResponse.redirect(new URL('/start', request.url))
        response.cookies.set('session_id', '123')
        return response
    }
}

