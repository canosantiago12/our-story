'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { ThemeSwitcherButton } from '@/components/theme-switcher-button';

const items = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Story book', link: '/story-book' },
];

const NavbarItem = ({ link, label }: { link: string; label: string }) => {
  const pathName = usePathname();
  const isActive = pathName === link;

  return (
    <div className='relative flex items-center '>
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-lg text-mu hover:text-foreground',
          isActive && 'text-foreground'
        )}
      >
        {label}
      </Link>
      {isActive && (
        <div className='absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block'></div>
      )}
    </div>
  );
};

const DesktopNavbar = () => {
  return (
    <div className='hidden border-separate border-b bg-background md:block'>
      <nav className='flex items-center justify-between px-8'>
        <div className='flex h-[80px] min-h-[60px] items-center gap-x-4'>
          <div className='flex h-full'>
            {items.map((i) => (
              <NavbarItem key={i.label} link={i.link} label={i.label} />
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <ThemeSwitcherButton />
        </div>
      </nav>
    </div>
  );
};

export const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
    </>
  );
};
