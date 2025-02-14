'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  const onClick = () => {
    router.push('/albums');
  };

  return (
    <main className='relative h-screen w-screen overflow-hidden flex items-center justify-center'>
      <div className='fixed inset-0 h-screen w-screen'>
        <video
          width='100%'
          height='100%'
          className='h-full w-full object-cover'
          autoPlay
          loop
          playsInline
          preload='none'
        >
          <source src='/videos/txt-41Winks.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className='absolute inset-0 bg-black/50'></div>

      <div className='relative flex flex-col items-center justify-center text-center z-10 space-y-10'>
        <h1 className='text-9xl font-bold text-teal-500 drop-shadow-md'>
          Our Story
        </h1>
        <p className='font-semibold text-white text-5xl'>GACL - SCH</p>
        <div className='flex gap-4'>
          <Button variant='default' size='lg' onClick={onClick}>
            Open
          </Button>
        </div>
      </div>
    </main>
  );
}
