import React from 'react';
import { Package, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from '../ui/Link';
import { Button } from '../ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Package className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold">HIT CARGO</span>
            </div>
            <p className="mb-6 text-gray-300">
              Conectando Nicaragua con retailers de Estados Unidos a través de servicios confiables de envío. Tu socio de confianza para envíos internacionales.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">Servicios</Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-300 hover:text-primary transition-colors">Rastrear Paquete</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-primary transition-colors">Preguntas Frecuentes</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">Contáctanos</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Nuestros Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/air" className="text-gray-300 hover:text-primary transition-colors">Envío Aéreo</Link>
              </li>
              <li>
                <Link href="/services/sea" className="text-gray-300 hover:text-primary transition-colors">Envío Marítimo</Link>
              </li>
              <li>
                <Link href="/services/shopping" className="text-gray-300 hover:text-primary transition-colors">Asistencia de Compras</Link>
              </li>
              <li>
                <Link href="/services/warehousing" className="text-gray-300 hover:text-primary transition-colors">Almacenamiento</Link>
              </li>
              <li>
                <Link href="/services/customs" className="text-gray-300 hover:text-primary transition-colors">Despacho Aduanero</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Contáctanos</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                <span>123 Calle Principal, Managua, Nicaragua</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span>+505 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span>info@hitcargo.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button variant="primary">
                Contáctanos
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} HIT CARGO. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">Política de Privacidad</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">Términos de Servicio</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;