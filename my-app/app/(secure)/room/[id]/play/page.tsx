
import { YouTubeEmbed } from "@next/third-parties/google"
// import YoutubeEmbed from "./helper"

export function YTPlayer(){
    const params = {
        'enablejsapi': 1,
        'controls': 1,
        'autoplay': 1,
        'origin': 'ktv.wonder947.com'
    }

    const myParams:string = Object.keys(params).reduce((accu, curr)=>{
        let tmp = params[curr as keyof typeof params]
        accu += `${curr}=${tmp}&`
        return accu
    }, '')
    console.log('myparams:',myParams)

    const frame = document.getElementsByTagName('YoutubeEmbed')[0]


    return (
        <div>
            <p>This is a youtube player</p>
            <YouTubeEmbed width={600} height={400} videoid="PL713zo-5YI"
                params={myParams}
            />
        </div>
    )
}

export default function page(){

    // return <YTPlayer />
    // return <YoutubeEmbed videoId={"PL713zo-5YI"}/>
    return (
        <h1>To be done</h1>
    )
}


