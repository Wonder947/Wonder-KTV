'use client'
import { useEffect } from "react"
import { io } from "socket.io-client"

export default function Page(){

    const socket = io('http://localhost:3001')

    useEffect(()=>{
        // const socket = io('wss://localhost:3001')

        socket.on('connection', ()=>{
            console.log(socket.id)
            socket.emit('greeting', 'hello!!!!!!!!!!')
        })

        return ()=>{
            socket.disconnect()
        }
    }, [])
    

    function handleClick(){
    }

    function handleChange(evt: any){
        const tt = document.getElementById('ttext')
        tt!.textContent = evt.target.value
        // console.log(evt.target.value)
    }

    return (
        <>
            <h2>Welcome to the Hall</h2>
            test1: <input name="test1" type="text" onChange={evt=>handleChange(evt)} />
            <button onClick={handleClick}>Click</button>
            <h4 id='ttext'></h4>
        </>
    )
}

