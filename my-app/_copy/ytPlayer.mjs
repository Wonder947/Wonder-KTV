//https://developers.google.com/youtube/iframe_api_reference#Retrieving_playlist_information
console.log('loading ytPlayer.mjs')
const tag = document.createElement('script')
tag.src = 'https://www.youtube.com/iframe_api'
const tag2 = document.createElement('script')
tag2.src = 'https://www.youtube.com/player_api'
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let player
const frame = document.getElementById('ytplayer')

function onYouTubePlayerAPIReady(){
    console.log('youtube player api is ready')
    player = new YT.Player('ytplayer')
    player.addEventListener('onReady', onPlayerReady)
    player.addEventListener('onStateChange', onPlayerStateChange)
}

function onYouTubeIframeAPIReady(){
    console.log('youtube iframe api is ready')
}

//player functions go here
function onPlayerReady(event){
    console.log('player is ready')
    player.playVideo()
    player.loadVideoById
}

function onPlayerStateChange(event){
    switch (player.getPlayerState()){
        case -1: //unstarted
            break
        case 0: //ended
            onVideoEnded()
            break
        case 1: //playing
            break
        case 2: //paused
            break
        case 3: //buffering
            break
        case 5: //video cued
            break
        default:
            console.log('this shall not happen, check ytPlayer.mjs')
    }

}


// other functions
function onVideoEnded(){

}

