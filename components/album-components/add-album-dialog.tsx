'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { AlbumForm } from '@/components/album-components/album-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const AddAlbumDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='default'>Create album</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Create new album</DialogTitle>
            <DialogDescription>Let&apos;s create a new album</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 space-y-4'>
            <AlbumForm setOpen={setOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
