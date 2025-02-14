'use client';

import { format } from 'date-fns';
import { useTheme } from 'next-themes';
import { Album } from '@prisma/client';
import { MouseEvent, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';

import { cn } from '@/lib/utils';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

interface AlbumWithThumbnail extends Album {
  thumbnail?: { url: string };
}

interface AlbumCardProps {
  album: AlbumWithThumbnail;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const { resolvedTheme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const formattedDate = album.albumDate
    ? format(new Date(album.albumDate), 'd MMMM yyyy')
    : 'Unknown Date';

  return (
    <>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform,
        }}
        className={cn(
          'relative w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]',
          'aspect-[3/4] rounded-xl bg-gradient-to-br',
          resolvedTheme === 'dark'
            ? 'from-zinc-800 to-neutral-900'
            : 'from-slate-200 to-cyan-200'
        )}
      >
        <div
          style={{
            transform: 'translateZ(75px)',
            transformStyle: 'preserve-3d',
            backgroundImage: album.thumbnail?.url
              ? `url(${album.thumbnail.url})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className={cn(
            'absolute inset-4 flex flex-col justify-end place-content-center rounded-xl shadow-lg p-6',
            resolvedTheme === 'dark' ? 'bg-neutral-800' : 'bg-white'
          )}
        >
          <p
            style={{ transform: 'translateZ(50px)' }}
            className='text-center text-2xl sm:text-3xl font-bold text-white drop-shadow-lg'
          >
            {album.title}
          </p>
          <p style={{ transform: 'translateZ(50px)' }} className='text-center font-semibold text-2xl'>
            {album.description}
          </p>
          <p
            style={{ transform: 'translateZ(50px)' }}
            className='text-center text-sm sm:text-lg text-white drop-shadow-lg'
          >
            {formattedDate}
          </p>
        </div>
      </motion.div>
    </>
  );
};
