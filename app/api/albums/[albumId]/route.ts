import { getAlbumById } from '@/data/albums';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ albumId: string }>;
  }
) => {
  const albumId = (await params).albumId;

  const album = await getAlbumById(albumId);

  return NextResponse.json({ status: 'success', data: album }, { status: 200 });
};
