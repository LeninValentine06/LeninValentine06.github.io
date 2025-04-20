import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, BookOpen, Clock, LineChart, BookMarked, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle window scroll for header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <BookOpen size={20} /> },
    { path: '/plan', label: 'Plan Sessions', icon: <Clock size={20} /> },
    { path: '/progress', label: 'Progress', icon: <LineChart size={20} /> },
    { path: '/flashcards', label: 'Flashcards', icon: <BookMarked size={20} /> },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#000000] text-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen size={28} className="text-[#ff7f11]" />
            <span className="text-2xl font-bold">StudyWise</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center space-x-1.5 py-2 border-b-2 ${
                  location.pathname === link.path 
                    ? 'border-[#ff7f11] text-[#ff7f11]' 
                    : 'border-transparent hover:border-[#ff7f11] hover:text-[#ff7f11]'
                } transition-all duration-200`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`
          fixed inset-0 bg-[#000000] z-50 transition-all duration-300 md:hidden
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={closeMenu}
            className="text-white text-2xl focus:outline-none"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={closeMenu}
              className={`
                flex items-center space-x-3 text-xl py-2 px-4 ${
                  location.pathname === link.path 
                    ? 'text-[#ff7f11]' 
                    : 'text-white hover:text-[#ff7f11]'
                } transition-all duration-200
              `}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;