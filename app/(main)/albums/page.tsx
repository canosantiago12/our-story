'use client';

import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { Album } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { AlbumCard } from '@/components/album-card';
import { deleteAlbum } from '@/actions/album-actions';
import { AddAlbumDialog } from '@/components/add-album-dialog';
import { SkeletonWrapper } from '@/components/skeleton-wrapper';
import { CardContextMenu } from '@/components/card-context-menu';

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
      <div className='p-4 space-y-6'>
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
              'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full rounded-2xl px-4 py-12 place-items-center',
              resolvedTheme === 'dark'
                ? 'bg-gradient-to-br from-zinc-900 to-zinc-900'
                : 'bg-gradient-to-br from-slate-100 to-slate-100'
            )}
          >
            {albums.map((album) => (
              <CardContextMenu
                key={album.id}
                id={album.id}
                type='album'
                onDelete={() => mutate(album.id)}
              >
                <AlbumCard album={album} />
              </CardContextMenu>
            ))}
          </div>
        </SkeletonWrapper>
      </div>
    </>
  );
};

export default AlbumsPage;
