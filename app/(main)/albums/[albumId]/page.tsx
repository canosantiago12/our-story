import { cn } from '@/lib/utils';
import { getAlbumById } from '@/data/albums';
import ThemeWrapper from '@/components/theme-wrapper';
import { AlbumImagesGrid } from '@/components/album-components/album-images';
import { AlbumDetailsHeader } from '@/components/album-components/album-detail-header';

interface AlbumDetailsPageProps {
  params: Promise<{ albumId: string }>;
}

const AlbumDetailsPage = async ({ params }: AlbumDetailsPageProps) => {
  const { albumId } = await params;

  const album = await getAlbumById(albumId);

  if (!album) {
    return <div className='text-center text-red-500'>Album not found.</div>;
  }

  return (
    <>
      <ThemeWrapper className='p-4 h-full flex flex-col gap-6'>
        <div className='grow-0'>
          <AlbumDetailsHeader
            title={album?.title}
            description={album?.description}
            albumDate={album?.albumDate}
            createdAt={album?.createdAt}
          />
        </div>
        <div
          className={cn(
            'p-4 rounded-2xl grow',
            'dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-900 bg-gradient-to-br from-slate-100 to-slate-100'
          )}
        >
          <AlbumImagesGrid />
        </div>
      </ThemeWrapper>
    </>
  );
};

export default AlbumDetailsPage;
