import { Navbar } from '@/components/navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='relative flex w-full flex-col'>{children}</div>
    </>
  );
};

export default MainLayout;
