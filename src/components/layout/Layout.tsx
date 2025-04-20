import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
        {children}
      </main>
      <footer className="py-6 bg-[#000000] text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2025 StudyWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;