import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

interface SkeletonWrapperProps {
  children: ReactNode;
  isLoading: boolean;
  fullWidth?: boolean;
  showProgress?: boolean;
  progressValue?: number;
}

export const SkeletonWrapper = ({
  children,
  isLoading,
  fullWidth = true,
  showProgress = false,
  progressValue = 0,
}: SkeletonWrapperProps) => {
  if (!isLoading) return children;

  return (
    <>
      <div className='relative w-full flex-1'>
        <Skeleton
          className={cn(fullWidth && 'w-full h-full rounded-[var(--radius)]')}
        >
          <div className='opacity-0'>{children}</div>
        </Skeleton>

        {showProgress && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2'>
            <Progress value={progressValue} />
          </div>
        )}
      </div>
    </>
  );
};
