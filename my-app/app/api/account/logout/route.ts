import { apiHandler } from "@/_helpers/server/apiHandler";
import { cookies } from "next/headers";


// module.exports = apiHandler({
//     GET: logout
// })
export {GET}

const GET = apiHandler({
    GET: logout
}).GET

async function logout(req: Request){
    cookies().delete('auth')
}
