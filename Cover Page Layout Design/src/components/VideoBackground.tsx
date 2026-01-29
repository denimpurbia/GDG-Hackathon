import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  fallbackImage: string;
}

export function VideoBackground({ fallbackImage }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // If video fails to play, fallback image will be shown
        console.log("Video autoplay failed, using fallback image");
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onError={() => {
          // Hide video on error, fallback image will show
          if (videoRef.current) {
            videoRef.current.style.display = 'none';
          }
        }}
      >
        {/* Using a sample travel/architecture video URL - in production you'd host your own */}
        <source
          src="https://player.vimeo.com/external/397667648.sd.mp4?s=1b8155ce4b26706e9a64d181a8a5fd59a9e15b1e&profile_id=165&oauth2_token_id=57447761"
          type="video/mp4"
        />
        {/* Fallback for browsers that don't support video */}
      </video>
      
      {/* Fallback Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${fallbackImage})`,
          zIndex: -1
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
    </div>
  );
}