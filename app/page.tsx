'use client';

import Hls from 'hls.js';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onClick = () => {
    router.push('/albums');
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl =
      'https://ewv7mmkhhsczljc9.public.blob.vercel-storage.com/hsl-video/output.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
    }
  }, []);

  return (
    <main className='relative h-screen w-screen overflow-hidden flex items-center justify-center'>
      <div className='fixed inset-0 h-screen w-screen'>
        <video
          ref={videoRef}
          className='h-full w-full object-cover'
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
      </div>

      <div className='absolute inset-0 bg-black/50'></div>

      <div className='relative flex flex-col items-center justify-center text-center z-10 space-y-10'>
        <h1 className='text-9xl font-bold text-teal-500 drop-shadow-md'>
          Our Story
        </h1>
        <p className='font-semibold text-white text-5xl'>GACL - SCH</p>
        <div className='flex gap-4'>
          <Button variant='default' size='lg' onClick={toggleMute}>
            {isMuted ? '🔇 Unmute' : '🔊 Mute'}
          </Button>
          <Button variant='default' size='lg' onClick={onClick}>
            Open
          </Button>
        </div>
      </div>
    </main>
  );
}
