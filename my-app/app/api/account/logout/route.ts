import { apiHandler } from "@/_helpers/server/apiHandler";
import { cookies } from "next/headers";


module.exports = apiHandler({
    GET: logout
})

async function logout(req: Request){
    cookies().delete('auth')
}
