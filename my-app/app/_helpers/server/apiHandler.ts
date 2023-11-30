import { NextRequest, NextResponse } from "next/server"
import { jwtMiddleware } from "./jwt-middleware"
import { errorHandler } from "./errorHandler"


export function apiHandler(handler: any){
    const wrappedHandler: any = {}
    const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    // wrap handler methods to add middleware
    httpMethods.forEach(method=>{
        if (typeof handler[method] !== 'function'){
            return  //notice the return in forEach function
        }

        wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
            try {
                // monkey patch req.json() because it can only be called once
                // i.e. to replace req.json() of later calls to be the stored value of the first call
                const json = await req.json()
                req.json = () => json
            } catch{}

            try {
                // global middleware
                await jwtMiddleware(req)
                // route handler
                const responseBody = await handler[method](req, ...args)
                return NextResponse.json(responseBody || {})
            }
            catch (err: any){
                // global api error handler
                console.log('from apiHandler', err)
                return errorHandler(err)
            }
        }
    })

    return wrappedHandler
}




