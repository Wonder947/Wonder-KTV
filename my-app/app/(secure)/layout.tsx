import LogoutBtn from "@/_components/LogoutBtb";
import { Sidebar } from "@/_components/Sidebar";
import { auth } from "@/_helpers/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";



export default function Layout({children}: {children: React.ReactNode}){
    if (!auth.isAuthenticated()){
        redirect('/start')
    }

    const sidebarEles = [
        <Link key={'home-page'} href={'/'}>Home Page</Link>,
        <Link key={'the hall'} href={'/room'}>Rooms</Link>,
        <LogoutBtn key={'logout-btn-secureLayout'}/>
    ]

    return (
        <>
            <Sidebar elements={sidebarEles} />
            <div className="other-side">
                {children}
            </div>
        </>
    )
}



