'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { Album } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { deleteAlbum } from '@/actions/album-actions';
import { SkeletonWrapper } from '@/components/skeleton-wrapper';
import { CardContextMenu } from '@/components/card-context-menu';
import { AlbumCard } from '@/components/album-components/album-card';
import { AddAlbumDialog } from '@/components/album-components/add-album-dialog';

const fetchAlbums = async (): Promise<Album[]> => {
  const response = await fetch('/api/albums');

  if (response.status === 204) {
    return [];
  }

  const json = await response.json();
  return json.data;
};

const AlbumsPage = () => {
  const { resolvedTheme } = useTheme();
  const queryClient = useQueryClient();

  const {
    data: albums = [],
    isLoading,
    isFetching,
  } = useQuery<Album[]>({
    queryKey: ['albums'],
    queryFn: fetchAlbums,
  });

  const { mutate } = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: async (data: Album) => {
      toast.success(`Album ${data.title} deleted successfully!`, {
        id: 'delete-album',
      });

      await queryClient.invalidateQueries({
        queryKey: ['albums'],
      });
    },
    onError: () => {
      toast.error('Something went wrong!', {
        id: 'delete-album',
      });
    },
  });

  return (
    <>
      <div className='p-4 space-y-6 h-full flex flex-col'>
        <div className='flex gap-4 items-end'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-700 dark:text-white'>
            Our Albums
          </h1>
          <AddAlbumDialog />
        </div>

        <SkeletonWrapper
          isLoading={isFetching}
          showProgress
          progressValue={isLoading ? 30 : 100}
        >
          <div
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full rounded-xl p-4 place-items-center flex-1',
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-br from-zinc-900 to-zinc-900'
                : 'bg-gradient-to-br from-slate-100 to-slate-100'
            )}
          >
            {albums.map((album) => (
              <CardContextMenu
                id={album.id}
                type='album'
                onDelete={() => mutate(album.id)}
              >
                <Link key={album.id} href={`/albums/${album.id}`}>
                  <AlbumCard album={album} />
                </Link>
              </CardContextMenu>
            ))}
          </div>
        </SkeletonWrapper>
      </div>
    </>
  );
};

export default AlbumsPage;
