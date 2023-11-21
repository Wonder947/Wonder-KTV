'use client'
import Link from "next/link" 

export function Sidebar({pathList}: {pathList: string[]}){
    return (
        <div className="sidebar">
            {pathList.map((path)=>(
                <Link key={path} href={`/${path}`}>{path}</Link>
            ))}
        </div>
    )
}


