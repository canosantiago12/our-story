'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { getAlbumById } from '@/data/albums';
import { getImagesByIds } from '@/data/images';
import ThemeWrapper from '@/components/theme-wrapper';
import { AlbumImagesGrid } from '@/components/album-components/album-images';
import { AlbumDetailsHeader } from '@/components/album-components/album-detail-header';

const AlbumDetailsPage = ({ params }) => {
  const { albumId } = React.use(params);

  const { data: album, isLoading: albumLoading } = useQuery({
    queryKey: ['album'],
    queryFn: () => getAlbumById(albumId),
  });

  const { data: images = [] } = useQuery({
    queryKey: ['album-images'],
    queryFn: () =>
      getImagesByIds(album?.images.map((image) => image.imageId) || []),
  });

  if (albumLoading) {
    return <div className='text-center text-gray-500'>Loading album...</div>;
  }

  if (!album) {
    return <div className='text-center text-red-500'>Album not found.</div>;
  }

  return (
    <>
      <ThemeWrapper className='p-4 h-full flex flex-col gap-6'>
        <div className='grow-0'>
          <AlbumDetailsHeader
            title={album.title}
            description={album.description}
            albumDate={album.albumDate}
            createdAt={album.createdAt}
          />
        </div>
        <div
          className={cn(
            'p-4 rounded-2xl grow',
            'dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-900 bg-gradient-to-br from-slate-100 to-slate-100'
          )}
        >
          <AlbumImagesGrid
            albumId={album.id}
            images={images || []}
            thumbnailImage={album.thumbnailId}
          />
        </div>
      </ThemeWrapper>
    </>
  );
};

export default AlbumDetailsPage;
