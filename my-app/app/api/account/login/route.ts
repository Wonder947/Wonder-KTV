import { apiHandler } from "@/_helpers/server/apiHandler"
import { db } from "@/_helpers/server/db"
import { authenticate } from "@/_helpers/server/serverActions"
import bcrypt from "bcryptjs"
import joi from "joi"
import jwt from "jsonwebtoken"
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

// // helper functions
// async function authenticate({username, password}: {username: string, password: string}){
//     const user = await db.User.findOne({username})
//     if (!(user && bcrypt.compareSync(password, user.hash))){
//         throw 'Username or password is incorrect'
//     }
//     // create a jwt token that is valid for 10 days
//     const token = jwt.sign({sub: user.id}, process.env.JWT_SECRET!, {expiresIn: '10d'})

//     return {
//         user: user.toJSON(),
//         token
//     }
// }

