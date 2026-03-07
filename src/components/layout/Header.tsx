import { ChevronDown, Menu, Package, X } from 'lucide-preact';
import { useEffect, useState } from 'preact/hooks';

export const Header = () => {
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
            <a href="/" className="flex items-center">
              <Package className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-secondary dark:text-white">HIT CARGO</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-secondary dark:text-white hover:text-primary transition-colors font-medium">Inicio</a>
            <div className="relative group">
              <button className="flex items-center text-secondary dark:text-white hover:text-primary transition-colors font-medium">
                Servicios <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-secondary shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right border border-gray-100 dark:border-gray-800">
                <div className="py-2 px-4">
                  <a href="/services/air" className="block py-2 text-neutral-text dark:text-gray-300 hover:text-primary">Envío Aéreo</a>
                  <a href="/services/sea" className="block py-2 text-neutral-text dark:text-gray-300 hover:text-primary">Envío Marítimo</a>
                  <a href="/services/shopping" className="block py-2 text-neutral-text dark:text-gray-300 hover:text-primary">Asistencia de Compras</a>
                </div>
              </div>
            </div>
            <a href="/track" className="text-secondary dark:text-white hover:text-primary transition-colors font-medium">Rastrear Paquete</a>
            <a href="/faq" className="text-secondary dark:text-white hover:text-primary transition-colors font-medium">Preguntas Frecuentes</a>
            <a href="/contact" className="text-secondary dark:text-white hover:text-primary transition-colors font-medium">Contacto</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/track">
               <button className="bg-accent-blue text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all shadow-lg font-medium">
                  Rastrear Paquete
               </button>
            </a>
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
        <div className="md:hidden bg-white dark:bg-secondary border-t border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-4">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="/" 
              className="block py-2 text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </a>
            <div>
              <h3 className="font-semibold py-2 text-secondary dark:text-white">Servicios</h3>
              <div className="pl-4 space-y-2">
                <a 
                  href="/services/air" 
                  className="block py-1 text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Envío Aéreo
                </a>
                <a 
                  href="/services/sea" 
                  className="block py-1 text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Envío Marítimo
                </a>
                <a 
                  href="/services/shopping" 
                  className="block py-1 text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Asistencia de Compras
                </a>
              </div>
            </div>
            <a 
              href="/track" 
              className="block py-2 text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Rastrear Paquete
            </a>
            <a 
              href="/faq" 
              className="block py-2 text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Preguntas Frecuentes
            </a>
            <a 
              href="/contact" 
              className="block py-2 text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
            <a href="/track">
                <button 
                  className="w-full bg-accent-blue text-white py-3 rounded-md font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rastrear Paquete
                </button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;