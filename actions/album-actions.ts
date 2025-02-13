'use server';

import { z } from 'zod';
import { Album } from '@prisma/client';

import { db } from '@/lib/db';
import { NewAlbumSchema } from '@/schemas';

export const createAlbum = async (
  values: z.infer<typeof NewAlbumSchema>
): Promise<Album> => {
  const validatedFields = NewAlbumSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error('Invalid fields');
  }

  const { title, description, albumDate } = validatedFields.data;

  return await db.album.create({
    data: { title, description, albumDate },
  });
};
