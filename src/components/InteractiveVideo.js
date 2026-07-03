"use client";

import { useRef, useState, useEffect } from "react";

export default function InteractiveVideo({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState(src);

  useEffect(() => {
    // Adding #t=0.001 forces iOS/Safari to load the first frame as a poster
    setVideoSrc(src.includes('#') ? src : `${src}#t=0.001`);
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        cursor: 'pointer', 
        overflow: 'hidden',
        backgroundColor: '#e9e9e9'
      }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted={true}
        playsInline={true}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          backgroundColor: 'transparent',
          pointerEvents: 'none' // Let the parent div handle clicks
        }}
        preload="metadata"
      />
      
      {/* Play indicator */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.4)',
        color: 'white',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isPlaying ? 0 : 1,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none',
        backdropFilter: 'blur(4px)'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}
