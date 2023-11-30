'use client'


export function Sidebar({elements}: {elements: any[]}){
    // console.log('elements are', elements)

    return (
        <div className="sidebar">
            {elements.map((ele)=>(
                ele
            ))}
        </div>
    )
}

