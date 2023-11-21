import { apiHandler } from "@/_helpers/server/apiHandler";
import { db } from "@/_helpers/server/db";
import { headers } from "next/headers";


module.exports = apiHandler({
    GET: getCurrent
})

async function getCurrent(){
    try{
        const currentUserId = headers().get('userId')
        console.log('current user id', currentUserId)
        return await db.User.findById(currentUserId)
    }
    catch{
        console.log('current user not found')
        throw 'Current user not found'
    }
}
