import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//add headers to contain the current path url

export function middleware(request: NextRequest){
    const pathName = request.nextUrl.pathname
    const newHeader = request.headers
    newHeader.set('x-pathName', pathName)
    console.log('path name:', pathName)
    return NextResponse.next({
        request:{
            headers: newHeader
        }
    })
}

