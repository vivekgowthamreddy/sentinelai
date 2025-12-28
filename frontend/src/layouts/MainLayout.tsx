import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen min-w-0">
      <Sidebar />
      {/* Content Area with refined padding: Less top, more bottom for scrolling space */}
      <div className="flex-1 ml-[var(--spacing-sidebar)] min-w-0 px-6 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-12 transition-all duration-300 animate-enter">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;