import LogoutBtn from "@/_components/LogoutBtb";
import { Sidebar } from "@/_components/Sidebar";
import { auth } from "@/_helpers/server/auth";
import { redirect } from "next/navigation";



export default function Layout({children}: {children: React.ReactNode}){
    if (!auth.isAuthenticated()){
        redirect('/start')
    }


    const sidebarEles = [<LogoutBtn />]

    return (
        <>
            <Sidebar elements={sidebarEles} />
            <div className="other-side">
                {children}
            </div>
        </>
    )
}



