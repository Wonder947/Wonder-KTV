import Link from "next/link";



export default function Page(){

    return (
        <div id="start-page">
            <h3>Please choose your start point:</h3>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
            <Link href={'/guest'}>Guest</Link>
        </div>
    )
}

