import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen min-w-0">
      <Sidebar />
      <div className="flex-1 ml-[var(--spacing-sidebar)] min-w-0">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;