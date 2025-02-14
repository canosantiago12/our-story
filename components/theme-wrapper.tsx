'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface ThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function ThemeWrapper({
  children,
  className,
}: ThemeWrapperProps) {
  const { resolvedTheme } = useTheme();
  return (
    <div data-theme={resolvedTheme} className={cn('h-full', className)}>
      {children}
    </div>
  );
}
