import { apiHandler } from "@/_helpers/server/apiHandler"
import { authenticate } from "@/_helpers/server/serverActions"
import joi from "joi"
import {cookies} from "next/headers"

module.exports = apiHandler({
    POST: login
})

async function login(req: Request){
    const body = await req.json()
    const {user, token} = await authenticate(body)
    cookies().set('auth', token, {httpOnly: true})

    return user
}

login.schma =joi.object({
    username: joi.string().required(),
    password: joi.string().required()
})


