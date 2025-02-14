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

export const deleteAlbum = async (albumId: string) => {
  if (!albumId) {
    throw new Error('Missing album id');
  }

  const album = await db.album.findUnique({
    where: { id: albumId },
    include: {
      images: true,
      thumbnail: true,
    },
  });

  if (!album) {
    throw new Error('Album not found');
  }

  const albumImages = await db.image.findMany({
    where: { id: { in: album.images.map((img) => img.imageId) } },
  });

  const imageFilePaths = albumImages.map((img) =>
    decodeURIComponent(
      img.url.split(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/album-images/`
      )[1]
    )
  );

  if (imageFilePaths.length > 0) {
    const { error } = await supabase.storage
      .from('album-images')
      .remove(imageFilePaths);

    if (error) {
      throw new Error(`Failed to delete images: ${error.message}`);
    }
  }

  for (const img of albumImages) {
    const isUsedElsewhere = await db.albumImage.findFirst({
      where: { imageId: img.id, albumId: { not: albumId } },
    });

    const isUsedInStory = await db.storyImage.findFirst({
      where: { imageId: img.id },
    });

    if (!isUsedElsewhere && !isUsedInStory) {
      await db.image.delete({
        where: { id: img.id },
      });
    }
  }

  if (album.thumbnail?.url) {
    const thumbnailPath = decodeURIComponent(
      album.thumbnail.url.split(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/album-thumbnails/`
      )[1]
    );

    const { error } = await supabase.storage
      .from('album-thumbnails')
      .remove([thumbnailPath]);

    if (error) {
      throw new Error(`Failed to delete thumbnail: ${error.message}`);
    }
  }

  if (album.thumbnail?.id) {
    const isThumbnailUsedElsewhere = await db.album.findFirst({
      where: { thumbnailId: album.thumbnail.id, id: { not: albumId } },
    });

    if (!isThumbnailUsedElsewhere) {
      await db.image.delete({
        where: { id: album.thumbnail.id },
      });
    }
  }

  return await db.album.delete({
    where: { id: albumId },
  });
};
