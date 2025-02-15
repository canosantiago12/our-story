'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { Album, Image } from '@prisma/client';
import ThemeWrapper from '@/components/theme-wrapper';
import { AlbumImagesGrid } from '@/components/album-components/album-images';
import { AlbumDetailsHeader } from '@/components/album-components/album-detail-header';

interface AlbumDetailsPageProps {
  params: Promise<{ albumId: string }>;
}

interface AlbumWithImages extends Album {
  images: {
    imageId: string;
    albumId: string;
  }[];
}

const fetchAlbum = async (albumId: string): Promise<AlbumWithImages | null> => {
  const response = await fetch(`/api/albums/${albumId}`);

  if (!response.ok) return null;

  const json = await response.json();
  return json.data;
};

const fetchImages = async (imageIds: string[]): Promise<Image[]> => {
  console.log('🚀 ~ imageIds:', imageIds);
  if (!imageIds.length) return [];

  const response = await fetch('/api/images', {
    method: 'POST',
    body: JSON.stringify({ imageIds }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) return [];

  const json = await response.json();
  return json.data;
};

const AlbumDetailsPage = ({ params }: AlbumDetailsPageProps) => {
  const { albumId } = use(params);

  const {
    data: album,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
  } = useQuery<AlbumWithImages | null>({
    queryKey: ['album', albumId],
    queryFn: () => fetchAlbum(albumId),
  });

  const {
    data: images = [],
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = useQuery<Image[]>({
    queryKey: ['album-images', albumId],
    queryFn: () => fetchImages(album?.images.map((img) => img.imageId) || []),
    enabled: !!album,
  });

  if (isAlbumLoading || isImagesLoading) {
    return <div className='text-center text-gray-500'>Loading album...</div>;
  }

  if (isAlbumError || isImagesError || !album) {
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
            images={images}
            thumbnailImage={album.thumbnailId}
          />
        </div>
      </ThemeWrapper>
    </>
  );
};

export default AlbumDetailsPage;
