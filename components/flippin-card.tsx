'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface FlippingCardProps {
  imageUrl: string;
}

const FlippingCard = ({ imageUrl }: FlippingCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      className='relative w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] aspect-[3/4] rounded-xl'
      style={{
        transformStyle: 'preserve-3d',
      }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className='w-full h-full'
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Front Side: Image */}
        <motion.div
          className='absolute inset-0'
          style={{
            backfaceVisibility: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src={imageUrl}
            alt='Album Image'
            fill
            className='object-cover rounded-xl'
          />
        </motion.div>

        {/* Back Side: Solid Black */}
        <motion.div
          className={cn(
            'absolute inset-0 bg-black flex items-center justify-center rounded-xl bg-gradient-to-br',
            resolvedTheme === 'dark'
              ? 'from-zinc-800 to-neutral-900'
              : 'from-slate-200 to-cyan-200'
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            width: '100%',
            height: '100%',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FlippingCard;
