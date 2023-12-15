'use client'
import { useFetch } from "@/_helpers/client/useFetch"
import { createNewRoom, getRooms } from "@/_helpers/server/serverActions"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { Socket, io } from "socket.io-client"

export default function Page(){
    const [rooms, setRooms] = useState<{id: string, name: string}[]>([])
    const fetch = useFetch()
    const {register, handleSubmit, formState} = useForm()
    const socketRef = useRef<Socket>()
    

    useEffect(()=>{
        // get rooms
        getRooms().then(setRooms).catch(err=>console.log(err))

        // connect to server to get real time notification
        // socketRef.current = io('http://localhost:3001')
        socketRef.current = io('https://wonder-ktv-websocket-server-fa65d400d2bd.herokuapp.com/')

        socketRef.current.on('connect', ()=>{
            console.log(socketRef.current!.id, 'connected')
            socketRef.current!.emit('greeting', 'hello!!!!!!!!!!')
            // join to the hall
            socketRef.current!.emit('joinHall')
        })

        socketRef.current.on('test', ()=>console.log('test success'))

        socketRef.current.on('updateRoomList', async ()=>{
            // const data = await fetch.get('/api/rooms')
            console.log("updating room list")
            const data = await getRooms()
            setRooms(data)
        })

        socketRef.current.on('disconnect', ()=>{
            console.log('disconnected')
        })

        return ()=>{
            socketRef.current!.disconnect()
        }
    }, [])
    

    async function createRoom({roomname}: any){
        try{
            await createNewRoom(roomname)
            // use socket to remind server to broadcast to update the roomlist
            socketRef.current!.emit('updateRoomList')
        }
        catch(e){
            console.log("create room failed because", e)
        }
    }

    return (
        <>
            <h2>Welcome to the Hall</h2>
            <h4>To Create a New Room</h4>
            <form onSubmit={handleSubmit(createRoom)}>
                <label className="form-label">Room Name</label>
                <input type="text" {...register('roomname')} />
                <button className="form-submit-button" disabled={formState.isSubmitting}>
                    Create
                </button>
            </form>

            <RoomList rooms={rooms} />
        </>
    )
}


// components defined below
function RoomList({rooms}: {rooms: any}){

    return (
        <div>
            <h4>Room List</h4>
            {rooms ? rooms.map((room: any)=>
                <RoomInfo key={room.id} room={room} />
            ) : null}
        </div>
    )
}

function RoomInfo({room}: {room: any}){
    console.log("room id", room.id)

    return (
        <div>
            {room.name}
            <Link className="join-link" href={`/room/${room.id}`}>join</Link>
        </div>
    )
}


