'use client';

import Video from 'next-video';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import backgroundVideo from '@/videos/txt-41Winks.mp4';

export default function Home() {
  const router = useRouter();

  const onClick = () => {
    router.push('/albums');
  };

  return (
    <main className='relative h-screen w-screen overflow-hidden flex items-center justify-center'>
      <div className='fixed inset-0 h-screen w-screen'>
        <Video
          src={backgroundVideo}
          className='h-full w-full object-cover'
          controls={false}
          autoPlay
          loop
        />
      </div>

      <div className='absolute inset-0 bg-black/50'></div>

      <div className='relative flex flex-col items-center justify-center text-center z-10 space-y-10'>
        <h1 className='text-9xl font-bold text-teal-500 drop-shadow-md'>
          Our Story
        </h1>
        <p className='font-semibold text-white text-5xl'>GACL - SCH</p>
        <div>
          <Button
            variant='default'
            size='lg'
            onClick={onClick}
            className='w-lg'
          >
            Open
          </Button>
        </div>
      </div>
    </main>
  );
}
