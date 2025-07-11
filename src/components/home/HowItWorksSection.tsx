import React from 'react';
import { ShoppingCart, Package, Plane, Box } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, description, step, isLast = false }) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="relative">
        <div className="bg-accent-yellow rounded-full p-4 z-10 relative shadow-lg">
          {icon}
        </div>
        {!isLast && (
          <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-primary opacity-30 hidden md:block" style={{ 
            transform: 'translate(50%, -50%)',
            width: '100%'
          }}></div>
        )}
      </div>
      <div className="mt-6 text-center md:text-left">
        <span className="inline-block bg-primary text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mb-2">
          {step}
        </span>
        <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">{title}</h3>
        <p className="text-neutral-text dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <ShoppingCart className="h-6 w-6 text-secondary" />,
      title: "Compra Online",
      description: "Compra en tus tiendas favoritas de Estados Unidos como Amazon, eBay o Shein."
    },
    {
      icon: <Package className="h-6 w-6 text-secondary" />,
      title: "Envía a Nuestra Bodega",
      description: "Usa nuestra dirección de Estados Unidos para la entrega a nuestra bodega segura."
    },
    {
      icon: <Plane className="h-6 w-6 text-secondary" />,
      title: "Enviamos a Nicaragua",
      description: "Elige entre envío aéreo o marítimo según tus necesidades."
    },
    {
      icon: <Box className="h-6 w-6 text-secondary" />,
      title: "Recibe tu Paquete",
      description: "Entregamos tu paquete directamente a tu puerta en Nicaragua."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-secondary-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">¿Cómo Funciona?</h2>
          <p className="text-xl text-neutral-text dark:text-gray-300 max-w-3xl mx-auto">
            Recibir tus paquetes desde Estados Unidos a Nicaragua es fácil con nuestro simple proceso de 4 pasos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step 
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index + 1}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;