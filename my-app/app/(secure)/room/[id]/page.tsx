'use client'
import MemberList from '@/_components/MemberList'
import { addSongToRoom, deleteSongFromRoom, getRoomInfo } from '@/_helpers/server/serverActions'
import { getSongByName, getSongFromYoutube } from '@/_helpers/server/songActions'
import {useState, useEffect, useRef} from 'react'
import { useForm } from 'react-hook-form'
import { Socket, io } from 'socket.io-client'


// this page shall display room info, including room name, current users, and a chatpot
// and also provide a form to display, add, delete, and order the room's song list
export default function Page({params}: {params: {id: string}}){
    const roomId = params.id
    const [roomInfo, setRoomInfo] = useState<Room>()
    const socketRef = useRef<Socket | null>(null)

    useEffect(()=>{
        getRoomInfo(roomId).then(setRoomInfo)

        // socket set up
        // socketRef.current = io('http://localhost:3001')
        socketRef.current = io('https://wonder-ktv-websocket-server-fa65d400d2bd.herokuapp.com/')
        socketRef.current.on('connect', ()=>{
            console.log(socketRef.current!.id, 'connected')
            socketRef.current!.emit('greeting', 'hello!!!!!!!!!!')
            // join the room by room id
            socketRef.current!.emit('join', roomId)
            // remind server to broadcast update on new member of the room
            socketRef.current!.emit('requestUpdateRoomInfo', roomId)
        })

        socketRef.current.on('disconnect', ()=>{
            console.log('disconnected')
            // remind server to broadcast update on member leave
            socketRef.current!.emit('requestUpdateRoomInfo', roomId)
        })

        socketRef.current.on('test', ()=>console.log('test success'))

        socketRef.current.on('updateRoomInfo', ()=>{
            // update the room info
            getRoomInfo(roomId).then(setRoomInfo)
            console.log('updated roominfo')
        })


        return ()=>{
            socketRef.current!.disconnect()
        }

    }, [])



    return (
        <>
            <h2>Welcome to room {roomInfo?.name}</h2>
            <Chatpot />
            <MemberList members={roomInfo?.members} />
            <SongList songList={roomInfo?.songList} socketRef={socketRef} roomId={roomId} />
        </>
    )
}


//helper functions
interface Room{
    id: string,
    name: string,
    members: any[],
    songList: any[]
}


// components
function Chatpot(){

    return (
        <div>
            TBD: display chat messages here
        </div>
    )
}

function SongList({socketRef, roomId, songList}: {socketRef: React.RefObject<Socket | null>, roomId: string, songList: any}){
    const {register, handleSubmit, formState} = useForm()
    
    async function addSong({songName}: any){
        // add song by name to the room's playList
        await addSongToRoom(songName, roomId)
        // remind server socket to broadcast the update of the song list
        socketRef.current!.emit('requestUpdateRoomInfo', roomId)
    }

    function SongEntry({song}: {song: any}){

        async function deleteSong(){
            await deleteSongFromRoom(song.addedTime, roomId)
            socketRef.current!.emit('requestUpdateRoomInfo', roomId)
        }
    
        return (
            <div>
                {song.songName}
                <button className='in-line-block' onClick={deleteSong}>Delete</button>
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={handleSubmit(addSong)}>
            <label className="form-label">add a song</label>
                <input type="text" {...register('songName')} />
                <button className="form-submit-button" disabled={formState.isSubmitting}>
                    Add
                </button>
            </form>
            <div>
                <h4>Current Song List</h4>
                {songList?.map((song: any)=>(
                    <SongEntry key={song.addedTime} song={song} />  //key now could be replaced with song.id
                ))}
            </div>
        </div>
    )
}


