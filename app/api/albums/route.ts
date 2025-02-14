import { getAlbums } from '@/data/albums';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const albums = await getAlbums();

  if (!albums || albums.length === 0) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json(
    { status: 'success', data: albums },
    { status: 200 }
  );
};
