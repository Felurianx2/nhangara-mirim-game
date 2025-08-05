
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DailyCheckinModal from '../DailyCheckinModal';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className='p-4 sm:p-6 md:p-8 max-w-7xl mx-auto flex-1'>
        {children}
      </main>
      <Footer />
      <DailyCheckinModal />
    </div>
  );
};

export default MainLayout;
