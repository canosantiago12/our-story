'use server';

import { z } from 'zod';
import { Album } from '@prisma/client';

import { db } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { NewAlbumSchema } from '@/schemas';

export const createAlbum = async (
  values: z.infer<typeof NewAlbumSchema>
): Promise<Album> => {
  const validatedFields = NewAlbumSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid fields');
  }

  const { title, description, albumDate, thumbnailImage } =
    validatedFields.data;

  const filePath = `thumbnails/${Date.now()}-${thumbnailImage.name}`;
  const { error } = await supabase.storage
    .from('album-thumbnails')
    .upload(filePath, thumbnailImage, {
      contentType: thumbnailImage.type,
    });

  if (error) {
    throw new Error('Failed to upload image to Supabase');
  }

  const { data: publicUrlData } = supabase.storage
    .from('album-thumbnails')
    .getPublicUrl(filePath);
  const thumbnailUrl = publicUrlData?.publicUrl || null;

  if (!thumbnailUrl) {
    throw new Error('Failed to retrieve image URL from Supabase');
  }

  const newImage = await db.image.create({
    data: {
      url: thumbnailUrl,
      caption: 'Thumbnail for album',
    },
  });

  return await db.album.create({
    data: {
      title,
      description,
      albumDate,
      thumbnailId: newImage.id,
    },
  });
};
