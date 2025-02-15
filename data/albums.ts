import { db } from '@/lib/db';

export const getAlbums = async () => {
  try {
    const albums = await db.album.findMany({
      include: {
        thumbnail: true,
      },
    });

    return albums;
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return null;
  }
};

export const getAlbumById = async (albumId: string) => {
  console.log('🚀 ~ albumId:', albumId);
  try {
    const album = await db.album.findUnique({
      where: { id: albumId },
      include: { images: true, thumbnail: true },
    });

    return album;
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return null;
  }
};
