'use client'
import MemberList from '@/_components/MemberList'
import { getCookies } from '@/_helpers/client/cookieHelper'
import { addSongToRoom, deleteSongFromRoom, getRoomInfo } from '@/_helpers/server/serverActions'
import {useState, useEffect, useRef} from 'react'
import { useForm } from 'react-hook-form'
import YouTube, {YouTubeProps} from 'react-youtube'
import { Socket, io } from 'socket.io-client'


// this page shall display room info, including room name, current users, and a chatpot
// and also provide a form to display, add, delete, and order the room's song list
export default function Page({params}: {params: {id: string}}){
    const userId = getCookies(document.cookie).uid
    const roomId = params.id
    const [roomInfo, setRoomInfo] = useState<Room>()
    const socketRef = useRef<Socket | null>(null)
    const [curVideoId, setCurVideoId] = useState()
    const [roomMemberNames, setRoomMemberNames] = useState<string[]>([])
    
    
    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          controls: 0,
          rel: 0,
        },
      };

    useEffect(()=>{
        getRoomInfo(roomId).then(setRoomInfo)

        // socket set up
        // socketRef.current = io('http://localhost:3001', {autoConnect: false})
        socketRef.current = io('https://wonder-ktv-websocket-server-fa65d400d2bd.herokuapp.com/', {autoConnect: false})

        socketRef.current.auth = {uid: userId, rid: roomId}
        socketRef.current.connect()

        socketRef.current.on('connect', ()=>{
            console.log(socketRef.current!.id, 'connected')
            socketRef.current!.emit('greeting', 'hello!!!!!!!!!!')
            // join the room by room id
            socketRef.current!.emit('joinRoom', roomId)
            // remind server to broadcast update on new member of the room
            socketRef.current!.emit('requestUpdateRoomInfo', roomId)
        })

        socketRef.current.on('disconnect', ()=>{
            console.log('disconnected')
        })

        socketRef.current.on('test', ()=>console.log('test success'))

        socketRef.current.on('updateRoomInfo', async ()=>{
            const newRoomInfo = await getRoomInfo(roomId)
            setRoomInfo(newRoomInfo)
            setRoomMemberNames(newRoomInfo.memberNames)
            console.log("updated room info:", newRoomInfo)
        })

        socketRef.current.on('updateRoomMemberNames', (memberNames: string[])=>{
            setRoomMemberNames(memberNames)
        })


        return ()=>{
            socketRef.current!.disconnect()
        }

    }, [])

    useEffect(()=>{
        const newVideoId = roomInfo?.songList[0]?.ytVideoId
        if (newVideoId!=curVideoId){
            setCurVideoId(newVideoId)
        }
        console.log("new video id", newVideoId)
    }, [roomInfo])


    return (
        <>
            <h2>Welcome to room {roomInfo?.name}</h2>
            <Chatpot />
            <MemberList memberNames={roomMemberNames} />
            <SongList songList={roomInfo?.songList} socketRef={socketRef} roomId={roomId} />
            { curVideoId ? <YouTube videoId={curVideoId} opts={opts} /> : null }
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


