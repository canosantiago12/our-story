import * as z from 'zod';

export const NewAlbumSchema = z.object({
  title: z.string().min(1, 'An album title is required'),
  description: z.string().optional(),
  albumDate: z.date({ required_error: 'An album date is required' }),
  thumbnailImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Thumbnail image is required')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPEG, PNG, or WEBP images are allowed'
    ),
});
