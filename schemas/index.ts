import * as z from 'zod';

export const NewAlbumSchema = z.object({
  title: z.string().min(1, 'An album title is required'),
  description: z.string().optional(),
  albumDate: z.date({ required_error: 'An album date is required' }),
});
