'use server';

import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export const createImage = async (file: File, albumId: string) => {
  if (!file || !albumId) {
    throw new Error('Missing file or album ID');
  }

  const filePath = `albums/${albumId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('album-images')
    .upload(filePath, file, {
      contentType: file.type,
    });

  if (error) {
    console.log('🚀 ~ error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('album-images')
    .getPublicUrl(filePath);

  if (!publicUrlData.publicUrl) {
    throw new Error('Failed to get image URL from Supabase');
  }

  revalidatePath(`/albums/${albumId}`);

  const newImage = await db.image.create({
    data: {
      url: publicUrlData.publicUrl,
      caption: '',
      uploadedAt: new Date(),
      albums: {
        create: { albumId },
      },
    },
  });

  return newImage;
};
