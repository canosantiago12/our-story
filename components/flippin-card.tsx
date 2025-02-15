'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const FlippingCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className='card-container'
      style={{
        transform: 'translateZ(75px)',
      }}
    >
      <motion.div
        className='card'
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Side */}
        <motion.div
          className='card-front'
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p className='bg-red-500 w-50'>HOLA</p>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className='card-back'
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p className='bg-blue-500 w-50'>ADIOS</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlippingCard;
