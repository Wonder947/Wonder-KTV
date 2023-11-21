import { Sidebar } from "@/_components/Sidebar"
import { auth } from "@/_helpers/server/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


// this is the layout for public routes
// if authenticated, redirected to secure page
export default function Layout({children}: {children: React.ReactNode}){
    if (auth.isAuthenticated()){
        redirect('/')
    }

    return (
        <>
            <Sidebar pathList={['start','login','register','guest']} />
            <div className="other-side">
                {children}
            </div>
        </>

    )
}




