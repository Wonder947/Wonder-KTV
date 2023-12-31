import { apiHandler } from "@/_helpers/server/apiHandler"
import { authenticate } from "@/_helpers/server/serverActions"
import joi from "joi"
import {cookies} from "next/headers"

// module.exports = apiHandler({
//     POST: login
// })
export const POST = apiHandler({
    POST: login
}).POST

async function login(req: Request){
    const body = await req.json()
    const {user, token} = await authenticate(body)
    cookies().set('auth', token, {httpOnly: true})
    cookies().set('uid', user.id, {httpOnly: false})

    return user
}

login.schma =joi.object({
    username: joi.string().required(),
    password: joi.string().required()
})


