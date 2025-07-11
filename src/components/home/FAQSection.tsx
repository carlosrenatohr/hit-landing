import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-5">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-secondary dark:text-white">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-primary" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 pr-12">
          <p className="text-neutral-text dark:text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      question: "¿Cómo obtengo una dirección de Estados Unidos para envíos?",
      answer: "Cuando te registres con HIT CARGO, automáticamente recibirás una dirección de Estados Unidos para usar en tus envíos. Esta dirección estará vinculada a tu cuenta, permitiéndonos identificar y procesar tus paquetes cuando lleguen."
    },
    {
      question: "¿Cuánto tiempo toma el envío?",
      answer: "Los tiempos de envío varían según el método elegido. El envío aéreo típicamente toma 3-5 días hábiles desde que recibimos tu paquete, mientras que el envío marítimo puede tomar 15-25 días hábiles pero es más económico para artículos grandes."
    },
    {
      question: "¿Cuánto cuesta el envío?",
      answer: "Los costos de envío dependen del peso, dimensiones y método de envío. Ofrecemos tarifas competitivas con envío aéreo desde $5 por libra y envío marítimo a tarifas más bajas para artículos voluminosos. Puedes usar nuestra calculadora para una cotización precisa."
    },
    {
      question: "¿Puedo rastrear mi paquete?",
      answer: "Sí, todos los envíos incluyen rastreo gratuito. Una vez que tu paquete sea procesado en nuestra bodega, recibirás información de rastreo por correo electrónico. También puedes iniciar sesión en tu cuenta en nuestro sitio web para monitorear el viaje de tu paquete en tiempo real."
    },
    {
      question: "¿Qué artículos están prohibidos para envío?",
      answer: "Los artículos prohibidos incluyen armas de fuego, municiones, materiales inflamables, sustancias ilegales, alimentos perecederos y ciertos electrónicos con baterías de litio. Por favor revisa nuestra lista completa de artículos prohibidos antes de comprar para asegurar el cumplimiento."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-secondary-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">Preguntas Frecuentes</h2>
          <p className="text-xl text-neutral-text dark:text-gray-300 max-w-3xl mx-auto">
            Encuentra respuestas a preguntas comunes sobre nuestros servicios de envío.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-neutral-text dark:text-gray-300 mb-6">
            ¿No encuentras lo que buscas? Contacta a nuestro equipo de atención al cliente.
          </p>
          <Button variant="primary">
            Ver Todas las Preguntas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;