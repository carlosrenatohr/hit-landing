import { ChevronDown, Menu, X } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-secondary shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center" aria-label="HIT Cargo — Inicio">
              {/* Brand book §05: full logo (isotype + wordmark). Black wordmark on light, white on dark. */}
              <img
                src="/brand/logo-full.png"
                alt="HIT Cargo"
                width="640"
                height="656"
                className={`${isScrolled ? "h-11" : "h-16"} w-auto object-contain transition-all duration-300 dark:hidden`}
              />
              <img
                src="/brand/logo-full-dark.png"
                alt="HIT Cargo"
                width="640"
                height="656"
                className={`hidden ${isScrolled ? "h-11" : "h-16"} w-auto object-contain transition-all duration-300 dark:block`}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="min-h-11 inline-flex items-center text-secondary dark:text-white hover:text-primary transition-colors font-medium"
            >
              Inicio
            </a>
            <div className="relative group">
              <button
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
                onClick={() => setIsServicesOpen((open) => !open)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setIsServicesOpen(false);
                }}
                className="min-h-11 flex items-center text-secondary dark:text-white hover:text-primary transition-colors font-medium"
              >
                Servicios <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className={`absolute left-0 mt-2 w-48 bg-white dark:bg-secondary shadow-lg rounded-md transition-all duration-300 transform origin-top-right border border-gray-100 dark:border-gray-800 ${isServicesOpen ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"}`}>
                <div className="py-2 px-4">
                  <a
                    href="/servicios/aereo"
                    className="min-h-11 flex items-center text-neutral-text dark:text-gray-300 hover:text-primary"
                  >
                    Envío Aéreo
                  </a>
                  <a
                    href="/servicios/maritimo"
                    className="min-h-11 flex items-center text-neutral-text dark:text-gray-300 hover:text-primary"
                  >
                    Envío Marítimo
                  </a>
                  <a
                    href="/servicios/encomiendas"
                    className="min-h-11 flex items-center text-neutral-text dark:text-gray-300 hover:text-primary"
                  >
                    Encomiendas
                  </a>
                  <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
                  <a
                    href="/servicios"
                    className="min-h-11 flex items-center text-primary font-semibold hover:text-primary-dark"
                  >
                    Todos los Servicios
                  </a>
                </div>
              </div>
            </div>
            <a
              href="/track"
              className="min-h-11 inline-flex items-center text-secondary dark:text-white hover:text-primary transition-colors font-medium"
            >
              Rastrear Paquete
            </a>
            <a
              href="/#faq"
              className="min-h-11 inline-flex items-center text-secondary dark:text-white hover:text-primary transition-colors font-medium"
            >
              Preguntas Frecuentes
            </a>
            <a
              href="/contacto"
              className="min-h-11 inline-flex items-center text-secondary dark:text-white hover:text-primary transition-colors font-medium"
            >
              Contacto
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/track" className="min-h-11 inline-flex items-center bg-primary text-navy py-2 px-6 rounded-md hover:bg-primary-dark transition-all shadow-lg font-medium">
              Rastrear Paquete
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden min-h-11 min-w-11 flex items-center justify-center text-secondary dark:text-white"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
          <nav aria-label="Navegación móvil" className="md:hidden bg-white dark:bg-secondary border-t border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-top-4">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="/"
              className="min-h-11 flex items-center text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </a>
            <div>
              <p className="font-semibold py-2 text-secondary dark:text-white">
                Servicios
              </p>
              <div className="pl-4 space-y-2">
                <a
                  href="/servicios/aereo"
                  className="min-h-11 flex items-center text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Envío Aéreo
                </a>
                <a
                  href="/servicios/maritimo"
                  className="min-h-11 flex items-center text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Envío Marítimo
                </a>
                <a
                  href="/servicios/encomiendas"
                  className="min-h-11 flex items-center text-neutral-text dark:text-gray-300 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Encomiendas
                </a>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <a
                  href="/servicios"
                  className="min-h-11 flex items-center text-primary font-semibold hover:text-primary-dark"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Todos los Servicios
                </a>
              </div>
            </div>
            <a
              href="/track"
              className="min-h-11 flex items-center text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Rastrear Paquete
            </a>
            <a
              href="/#faq"
              className="min-h-11 flex items-center text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Preguntas Frecuentes
            </a>
            <a
              href="/contacto"
              className="min-h-11 flex items-center text-secondary dark:text-white hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
            <a href="/track" className="min-h-11 flex items-center justify-center w-full bg-primary text-navy py-3 rounded-md font-bold hover:bg-primary-dark transition-all" onClick={() => setIsMenuOpen(false)}>
              Rastrear Paquete
            </a>
          </div>
          </nav>
      )}
    </header>
  );
};

export default Header;
