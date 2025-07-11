import React from 'react';
import { Plane, Ship, ShoppingBag, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, linkUrl }) => {
  return (
    <div className="bg-white dark:bg-secondary-light p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-primary/10 hover:border-primary/30">
      <div className="bg-neutral-bg dark:bg-secondary p-3 rounded-full inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-secondary dark:text-white mb-3">{title}</h3>
      <p className="text-neutral-text dark:text-gray-300 mb-4">{description}</p>
      <a 
        href={linkUrl} 
        className="text-primary font-medium hover:text-primary-dark transition-colors"
      >
        Saber más →
      </a>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Plane className="h-6 w-6 text-primary" />,
      title: "Envío Aéreo",
      description: "Entrega rápida por vía aérea para paquetes urgentes. Llega a Nicaragua en solo 3-5 días hábiles.",
      linkUrl: "/services/air"
    },
    {
      icon: <Ship className="h-6 w-6 text-primary" />,
      title: "Envío Marítimo",
      description: "Opción económica de envío por vía marítima. Perfecto para artículos grandes con tiempos flexibles.",
      linkUrl: "/services/sea"
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
      title: "Asistencia de Compras",
      description: "Te ayudamos a comprar en tiendas de Estados Unidos que no envían internacionalmente.",
      linkUrl: "/services/shopping"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Entrega Express",
      description: "Servicio premium expedito para envíos urgentes con manejo prioritario y tránsito más rápido.",
      linkUrl: "/services/express"
    }
  ];

  return (
    <section className="py-20 bg-neutral-bg dark:bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-neutral-text dark:text-gray-300 max-w-3xl mx-auto">
            Ofrecemos soluciones integrales de envío para conectarte con tus tiendas favoritas de Estados Unidos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              linkUrl={service.linkUrl}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="secondary">
            Ver Todos los Servicios
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;