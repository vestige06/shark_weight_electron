// import React from 'react';
// import videojs from 'video';
// import videozhCN from 'video.js/dist/lang/zh-CN.json'; //播放器中文，不能使用.js文件
// import 'video.js/dist/video-js.css';  //样式文件注意要加上
// import 'videojs-flash';  //如果要播放RTMP要使用flash 需要先npm i videojs-flash

// class VideoPlayer extends React.Component {
//   player:any;
//   videoNode:any;
//   componentDidMount() {
//     // instantiate Video.js
//     //这里的this.props是上级传进来的video的options
//     this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
//       // console.log('onPlayerReady', this)
//     });
//     videojs.addLanguage('zh-CN', videozhCN);

//     // this.player.liveTracker.on('liveedgechange', () => {
//       // console.log('跟随直播');
//       // this.player.liveTracker.seekToLiveEdge();
//     // });
//   }

//   // destroy player on unmount
//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose()
//     }
//   }

//   // wrap the player in a div with a `data-vjs-player` attribute
//   // so videojs won't create additional wrapper in the DOM
//   // see https://github.com/videojs/video.js/pull/3856
//   render() {
//     return (
//       <div> 
//         <div data-vjs-player>  {/*这个带有属性的div目前没看到作用，可以去掉*/}
//           <video ref={ node => this.videoNode = node } className="video-js"></video>
//         </div>
//       </div>
//     )
//   }
// }
// module.exports = VideoPlayer;
export {};