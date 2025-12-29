import type { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen min-w-0 bg-(--color-bg-subtle) relative overflow-hidden">
      {/* Ambient Background Layers */}
      <div className="ambient-glow -top-20 -left-20 opacity-50"></div>
      <div className="ambient-glow-secondary bottom-0 right-0 opacity-40"></div>

      <Sidebar />
      {/* Content Area with refined padding: Less top, more bottom for scrolling space */}
      <div className="flex-1 ml-[var(--spacing-sidebar)] min-w-0 px-6 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-12 transition-all duration-300 animate-enter relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;