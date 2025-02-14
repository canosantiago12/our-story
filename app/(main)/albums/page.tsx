'use client';

import { useQuery } from '@tanstack/react-query';

import { AlbumCard } from '@/components/album-card';
import { AddAlbumDialog } from '@/components/add-album-dialog';
import { Album } from '@prisma/client';
import { SkeletonWrapper } from '@/components/skeleton-wrapper';

const fetchAlbums = async (): Promise<Album[]> => {
  const response = await fetch('/api/albums');

  if (response.status === 204) {
    return [];
  }

  const json = await response.json();
  return json.data;
};

const AlbumsPage = () => {
  const { data: albums = [], isLoading } = useQuery<Album[]>({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });

  return (
    <>
      <div className='p-4 space-y-3'>
        <div className='flex gap-4 items-end'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-700'>
            Our Albums
          </h1>
          <AddAlbumDialog />
        </div>

        <SkeletonWrapper isLoading={isLoading}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full bg-gradient-to-br from-slate-100 to-slate-100 rounded-2xl px-4 py-12 text-slate-900 place-items-center'>
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </SkeletonWrapper>
      </div>
    </>
  );
};

export default AlbumsPage;
