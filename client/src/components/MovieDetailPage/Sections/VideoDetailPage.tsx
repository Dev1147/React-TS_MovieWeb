import React from 'react'

function VideoDetailPage({videoInfo}: {videoInfo: any}) {

  const videoUrl = `https://www.youtube.com/embed/${videoInfo.key}`;
  // console.log('Video URL:', videoUrl);
  // YouTube 영상 크기 (기본값으로 560x315 설정)
  const iframeWidth = videoInfo.size ? videoInfo.size : 560; // videoSize가 있으면 사용, 없으면 기본값 560
  const iframeHeight = videoInfo.size ? (videoInfo.size * 0.5625) : 315;

  return (
    <div style={{ width: '70%', justifyContent: 'center', margin: '1rem auto' }}>
      <h1>{videoInfo.name}</h1>
      <hr/>
      <iframe
          width={iframeWidth}
          height={iframeHeight}
          src={videoUrl}
          title={videoInfo.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
      />
  </div>
  )
}

export default VideoDetailPage