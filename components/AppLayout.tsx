
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Page } from '../types';

interface AppLayoutProps {
  children: React.ReactNode;
  activePage: Page;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, activePage, setActivePage }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
