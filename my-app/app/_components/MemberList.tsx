

export default function MemberList({memberNames}: {memberNames: any[] | undefined}) {
    const memberNameStr = memberNames?.reduce((accu,currVal, currInd)=>{
        accu += currVal
        if (currInd<memberNames.length-1){
            accu += ', '
        }
        return accu
    }, '')

    return (
        <div>
            <h5>Current Users in the Room</h5>
            <p className="member-names">{memberNameStr}</p>
        </div>
    )
}
