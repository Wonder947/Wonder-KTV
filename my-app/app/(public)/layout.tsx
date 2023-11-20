import { redirect } from "next/navigation"
import auth from './_helpers/server'

// this is the layout for public routes
// if authenticated, redirected to secure page
export default function Layout({children}: {children: React.ReactNode}){
    if (auth.isAuthenticated()){
        redirect('/')
    }

    return (
        <div>
            <button onClick={guestStart}>Guest</button>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
        </div>
    )
}




