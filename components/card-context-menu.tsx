'use client';

import { ReactNode } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '@/components/ui/context-menu';

interface CardContextMenu {
  id: string;
  type: 'album' | 'story';
  children: ReactNode;
  onDelete?: (id: string) => void;
}

export const CardContextMenu = ({
  id,
  type,
  children,
  onDelete,
}: CardContextMenu) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className='w-full'>{children}</ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          <ContextMenuItem onClick={handleDelete}>
            Delete {type === 'album' ? 'Album' : 'Story'}
            <ContextMenuShortcut>
              <AiOutlineDelete />
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
        <ContextMenuSeparator />
      </ContextMenu>
    </>
  );
};
