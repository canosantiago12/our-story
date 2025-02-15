'use client';

import { toast } from 'sonner';
import { useCallback } from 'react';
import { Image } from '@prisma/client';
import { DropEvent, useDropzone } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';

import FlippingCard from '@/components/flippin-card';
import { createImage } from '@/actions/image-actions';

interface AlbumImagesGridProps {
  images: Image[];
  thumbnailImage: string | null;
  albumId: string;
}

export const AlbumImagesGrid = ({
  images = [],
  thumbnailImage,
  albumId,
}: AlbumImagesGridProps) => {
  console.log('🚀 ~ images:', images);
  const { mutate } = useMutation({
    mutationFn: ({ file, albumId }: { file: File; albumId: string }) =>
      createImage(file, albumId),
    onSuccess: async (data: Image) => {
      toast.success('Image uploaded successfully!', {
        id: 'create-image',
      });
    },
    onError: (error) => {
      console.log('🚀 ~ error:', error);
      toast.error('Something went wrong!', {
        id: 'create-image',
      });
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], _fileRejections: any[], _event: DropEvent) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      toast.loading('Uploading image...', { id: 'create-image' });

      mutate({ file, albumId });
    },
    [mutate, albumId]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    noClick: true,
  });

  return (
    <div
      {...getRootProps()}
      className='h-full flex flex-col border-2 border-dashed border-gray-400 rounded-lg p-4 cursor-pointer'
    >
      <input {...getInputProps()} />

      {images.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full h-full'>
          {images.map((img, i) => (
            <FlippingCard key={img.id || i} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center h-full text-2xl text-gray-600 italic'>
          Drag & drop an image here to upload
        </div>
      )}
    </div>
  );
};
