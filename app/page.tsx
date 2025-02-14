'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  const videoUrl =
    'https://ewv7mmkhhsczljc9.public.blob.vercel-storage.com/txt-41Winks-TioB5iNs40n6ncd08l726T2z8mmW3Y.mp4';

  const onClick = () => {
    router.push('/albums');
  };

  return (
    <main className='relative h-screen w-screen overflow-hidden flex items-center justify-center'>
      <div className='fixed inset-0 h-screen w-screen'>
        <video
          className='h-full w-full object-cover'
          autoPlay
          loop
          src={videoUrl}
        />
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
