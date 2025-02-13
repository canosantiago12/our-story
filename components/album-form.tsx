'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Album } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAlbum } from '@/actions/album-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { NewAlbumSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormError } from '@/components/form-error';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface AlbumFormProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccessCallBack?: (category: Album) => void;
}

export const AlbumForm = ({
  setOpen = () => {},
  onSuccessCallBack = () => {},
}: AlbumFormProps) => {
  const [error, setError] = useState<string | undefined>('');

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof NewAlbumSchema>>({
    resolver: zodResolver(NewAlbumSchema),
    defaultValues: {
      title: '',
      description: '',
      albumDate: new Date(),
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createAlbum,
    onSuccess: async (data: Album) => {
      setOpen((prev) => !prev);

      form.reset({
        title: '',
        description: '',
        albumDate: new Date(),
      });

      toast.success(`Album ${data.title} created successfully!`, {
        id: 'create-category',
      });

      onSuccessCallBack(data);

      await queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: (error) => {
      toast.error('Something went wrong!', {
        id: 'create-category',
      });
      setError(error.message);
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof NewAlbumSchema>) => {
      toast.loading('Creating category...', {
        id: 'create-category',
      });
      mutate(values);
    },
    [mutate]
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
          id='album-form'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title </FormLabel>
                <FormControl>
                  <Input placeholder='Title' {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder='Description' {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='albumDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Album date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      required
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type='submit' className='w-full'>
            Create
          </Button>
          <FormError message={error} />
        </form>
      </Form>
    </>
  );
};
