import { Sidebar } from "@/_components/Sidebar"
import { auth } from "@/_helpers/server/auth"
import { redirect } from "next/navigation"
import Link from "next/link"


// this is the layout for public routes
// if authenticated, redirected to secure page
export default function Layout({children}: {children: React.ReactNode}){
    if (auth.isAuthenticated()){
        redirect('/')
    }

    const sidebarEles = ['start','login','register','guest'].map((path)=>(
        <Link key={path} href={`/${path}`}>{path}</Link>
    ))

    return (
        <>
            <Sidebar elements={sidebarEles} />
            <div className="other-side">
                {children}
            </div>
        </>

    )
}




