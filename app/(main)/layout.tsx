import { Navbar } from '@/components/navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col h-full'>
      <Navbar />
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default MainLayout;
