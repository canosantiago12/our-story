import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-red-500'>
      <div className='space-y-6 text-center'>
        <h1 className='text-6xl font-semibold text-teal-500 drop-shadow-md'>
          Our Story
        </h1>
        <p className='text-teal-900 text-lg'>GACL - SCH</p>
        <div>
          <Button variant='default' size='lg'>
            Open
          </Button>
        </div>
      </div>
    </main>
  );
}
