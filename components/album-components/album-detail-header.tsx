import { format } from 'date-fns';

interface AlbumDetaulsHeaderProps {
  title: string;
  albumDate: Date;
  createdAt: Date;
  description: string | null;
}

export const AlbumDetailsHeader = ({
  title,
  description,
  albumDate,
  createdAt,
}: AlbumDetaulsHeaderProps) => {
  const formattedAlbumDate = albumDate
    ? format(new Date(albumDate), 'MMMM d, yyyy')
    : 'Unknown Date';
  const formattedCreatedDate = createdAt
    ? format(new Date(createdAt), 'MMMM d, yyyy')
    : 'Unknown Date';

  return (
    <>
      <div className='h-full flex flex-col'>
        <div className='flex flex-col sm:flex-row items-center gap-4 h-full'>
          <h1 className='text-6xl lg:text-8xl font-extrabold tracking-tight text-center sm:text-left border-r-0 sm:border-r-4 dark:border-r-white border-r-black pr-0 sm:pr-6'>
            {title}
          </h1>

          <div className='mt-auto flex flex-col sm:flex-row items-end justify-between w-full'>
            <h2 className='text-lg sm:text-2xl tracking-tight font-semibold'>
              {description ? (
                description
              ) : (
                <p className='italic text-gray-400'>No description yet</p>
              )}
            </h2>

            <div className='flex flex-wrap sm:flex-nowrap gap-6 sm:gap-14 mt-auto'>
              <h2 className='text-sm sm:text-lg tracking-tight text-left'>
                <span className='font-semibold mr-2 sm:mr-4'>Album date:</span>
                {formattedAlbumDate}
              </h2>
              <h2 className='text-sm sm:text-lg tracking-tight text-left'>
                <span className='font-semibold mr-2 sm:mr-4'>Created:</span>
                {formattedCreatedDate}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
