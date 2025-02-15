import { getImagesByIds } from '@/data/images';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { imageIds } = await req.json();

  if (!imageIds || !Array.isArray(imageIds) || imageIds.length === 0) {
    return NextResponse.json(
      { error: 'No valid image IDs provided' },
      { status: 400, statusText: 'No valid image IDs provided' }
    );
  }

  const images = await getImagesByIds(imageIds);

  if (!images || images.length === 0)
    return new NextResponse(null, { status: 204 });

  return NextResponse.json(
    { status: 'success', data: images },
    { status: 200 }
  );
};
