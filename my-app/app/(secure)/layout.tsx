import { auth } from "@/_helpers/server/auth";
import { redirect } from "next/navigation";



export default function Layout({children}: {children: React.ReactNode}){
    if (!auth.isAuthenticated()){
        redirect('/start')
    }

    return (
        <>
            <p>note: currently u need to delete the auth cookie to logout manually</p>
            {children}
        </>
    )
}



