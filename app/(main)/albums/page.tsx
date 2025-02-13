import { AlbumCard } from '@/components/album-card';
import { AddAlbumDialog } from '@/components/add-album-dialog';

const AlbumsPage = () => {
  return (
    <>
      <div className='p-4 space-y-3'>
        <div className='flex gap-4 items-end'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-700'>
            Our Albums
          </h1>
          <AddAlbumDialog />
        </div>
        <div className='grid w-full bg-gradient-to-br from-slate-100 to-slate-100 rounded-2xl px-4 py-12 text-slate-900'>
          <AlbumCard />
        </div>
      </div>
    </>
  );
};

export default AlbumsPage;
