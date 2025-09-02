import React from 'react';
import { Button } from '../ui/Button';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary dark:bg-secondary-light">
      <div className="container mx-auto px-4 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-accent-yellow opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-primary opacity-10 rounded-full"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para enviar desde Estados Unidos a Nicaragua?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Únete a miles de clientes satisfechos que confían en HIT CARGO para sus necesidades de envío. 
            Regístrate hoy y obtén tu dirección personal de envío en Estados Unidos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg">
              Comenzar
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              Contactar Ventas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;