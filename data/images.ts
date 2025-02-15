import { db } from '@/lib/db';

export const getImagesByIds = async (imageIds: string[]) => {
  if (!imageIds || imageIds.length === 0) return [];

  try {
    const images = await db.image.findMany({
      where: {
        id: { in: imageIds },
      },
    });

    return images ?? [];
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return null;
  }
};
