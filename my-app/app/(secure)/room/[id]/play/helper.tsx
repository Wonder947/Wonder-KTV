// //from chatgpt
// 'use client'
// import React, { useEffect, useRef } from 'react';

// const YoutubeEmbed = ({ videoId }: any) => {
//   const playerRef = useRef(null);

//   useEffect(() => {
//     // Ensure the global YT object is available
//     if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
//       // Load the YouTube IFrame Player API
//       var tag = document.createElement('script');
//       tag.src = 'https://www.youtube.com/iframe_api';
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

//       // Create player after API download
//       window.onYouTubeIframeAPIReady = () => {
//         playerRef.current = new YT.Player('player', {
//           height: '100vh',
//           width: '100vw',
//           videoId: videoId,
//           playerVars:{
//             fs: 0,
//             autoplay: 1,
//             controls: 0
//           },
//           events: {
//             onReady: onPlayerReady,
//             onStateChange: onPlayerStateChange
//             // ... other event handlers
//           },
//         });
//       };
//     }
//   }, [videoId]);

//   // Handler for when player is ready
//   const onPlayerReady = (event) => {
//     // You can control the player through event.target (event.target.playVideo(), event.target.pauseVideo(), etc.)
//     event.target.playVideo()
//   };
//   // const onPlayerStateChange = (event) => {
//   //   event.target.unMute()
//   // }
//   const onPlayerStateChange = (event) => {
//     if (event.data === YT.PlayerState.PLAYING) {
//       enterFullScreenMode();
//     }
//   };

//   const enterFullScreenMode = () => {
//     const playerElement = playerRef.current.getIframe();
//     if (playerElement.requestFullscreen) {
//       playerElement.requestFullscreen();
//     } else if (playerElement.mozRequestFullScreen) { /* Firefox */
//       playerElement.mozRequestFullScreen();
//     } else if (playerElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
//       playerElement.webkitRequestFullscreen();
//     } else if (playerElement.msRequestFullscreen) { /* IE/Edge */
//       playerElement.msRequestFullscreen();
//     }
//   };

//   return <div id="player" style={{width: '100vw', height: '100vh'}}></div>;
// };

// export default YoutubeEmbed;
