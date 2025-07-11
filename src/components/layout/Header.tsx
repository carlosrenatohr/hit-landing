import React, { useState, useEffect } from 'react';
import { Menu, X, Package, ChevronDown } from 'lucide-react';
import { Link } from '../ui/Link';
import { Button } from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white dark:bg-secondary shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Package className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-secondary dark:text-white">HIT CARGO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary dark:text-white hover:text-primary transition-colors">Inicio</Link>
            <div className="relative group">
              <button className="flex items-center text-secondary dark:text-white hover:text-primary transition-colors">
                Servicios <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-secondary shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                <div className="py-2 px-4">
                  <Link href="/services/air" className="block py-2 text-neutral-text dark:text-gray-300 hover:text-primary">Envío Aéreo</Link>
                  <Link href="/services/sea" className="block py-2 text-neutral-text dark:text-gray-300 hover:text-primary">Envío Marítimo</Link>
                  <Link href="/services/shopping" className="block py-2 text-neutral-text dark:text-gray-300 hover:text-primary">Asistencia de Compras</Link>
                </div>
              </div>
            </div>
            <Link href="/track" className="text-secondary dark:text-white hover:text-primary transition-colors">Rastrear Paquete</Link>
            <Link href="/faq" className="text-secondary dark:text-white hover:text-primary transition-colors">Preguntas Frecuentes</Link>
            <Link href="/contact" className="text-secondary dark:text-white hover:text-primary transition-colors">Contacto</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="accent-blue" 
              className="transition-transform hover:scale-105"
            >
              Rastrear Paquete
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-secondary dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-secondary border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              href="/" 
              className="block py-2 text-secondary dark:text-white hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <div>
              <h3 className="font-semibold py-2 text-secondary dark:text-white">Servicios</h3>
              <div className="pl-4 space-y-2">
                <Link 
                  href="/services/air" 
                  className="block py-1 text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Envío Aéreo
                </Link>
                <Link 
                  href="/services/sea" 
                  className="block py-1 text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Envío Marítimo
                </Link>
                <Link 
                  href="/services/shopping" 
                  className="block py-1 text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Asistencia de Compras
                </Link>
              </div>
            </div>
            <Link 
              href="/track" 
              className="block py-2 text-secondary dark:text-white hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Rastrear Paquete
            </Link>
            <Link 
              href="/faq" 
              className="block py-2 text-secondary dark:text-white hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Preguntas Frecuentes
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 text-secondary dark:text-white hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Button 
              variant="accent-blue" 
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Rastrear Paquete
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;