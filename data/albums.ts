import { db } from '@/lib/db';

export const getAlbums = async () => {
  try {
    const albums = await db.album.findMany();

    return albums;
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return null;
  }
};
