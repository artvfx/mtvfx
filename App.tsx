import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [page, setPage] = useState('home');

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden flex flex-col min-h-screen">
      <Header page={page} setPage={setPage} />
      <main className="flex-grow">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'create' && <CreatePage />}
        {page === 'about' && <AboutPage setPage={setPage} />}
        {page === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;