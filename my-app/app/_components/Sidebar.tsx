'use client'


export function Sidebar({elements}: {elements: any[]}){
    // console.log('elements are', elements)

    return (
        <div className="sidebar">
            {/* <div className="sidebar-header">Wonder KTV</div> */}
            <a href="#" className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a>
            <div className="sidebar-links">
                {elements.map((ele)=>(
                    ele
                ))}
            </div>
        </div>
    )
}

