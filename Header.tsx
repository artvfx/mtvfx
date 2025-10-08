import React, { useState } from 'react';

interface HeaderProps {
  page: string;
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "CREATE", href: "#", action: () => setPage('create') },
    { name: "Solutions", href: "#solutions", action: () => setPage('home') },
    { name: "About Us", href: "#", action: () => setPage('about') },
    { name: "Contact", href: "#", action: () => setPage('contact') },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    // For single-page app navigation links (Create, About, Contact)
    if (['CREATE', 'About Us', 'Contact'].includes(link.name)) {
      e.preventDefault();
      link.action();
    }
    // For links to sections on the home page
    else {
      if (page !== 'home') {
        e.preventDefault(); // Prevent default jump
        setPage('home');    // Go to home page
        // Wait for re-render, then scroll
        setTimeout(() => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // If already on home page, the default anchor link behavior handles the scroll
    }
    setIsMenuOpen(false);
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold tracking-wider cursor-pointer"
          onClick={() => setPage('home')}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Studio Capsul Corp
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link)}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <button 
            onClick={() => setPage('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Create Your Product
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link)}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { setPage('create'); setIsMenuOpen(false); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Create Your Product
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;