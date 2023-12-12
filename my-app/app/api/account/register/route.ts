import { apiHandler } from "@/_helpers/server/apiHandler";
import { db } from "@/_helpers/server/db";
import joi from "joi"
import bcrypt from "bcryptjs"


// module.exports = apiHandler({
//     POST: register
// })

const POST = apiHandler({
    POST: register
}).POST

export {
    POST
}

async function register(req: Request){
    const body = await req.json()
    console.log('this is the register body', body)
    await createUser(body)
}

register.schema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
})

// helper functions
async function createUser({username, password}: any){
    // validate username being unique
    if (await db.User.findOne({username})){
        // console.log('username exists already', username)
        throw 'Username ' + username + ' is already taken'
    }
    // register to the db
    const hash = bcrypt.hashSync(password, 10)
    const user = new db.User({username, hash})
    const res = await user.save()
    console.log('register result', res)
}

