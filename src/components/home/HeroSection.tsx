import React from 'react';
import { Package, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '../ui/Button';
import TrackingForm from './TrackingForm';

const HeroSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-neutral-bg to-white dark:from-secondary dark:to-secondary-light">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 md:px-6 pt-32 pb-20"
      >
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            variants={itemVariants}
            className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-secondary dark:text-white mb-6 leading-tight">
              Tu puente desde Estados Unidos a Nicaragua
            </h1>
            <p className="text-xl text-neutral-text dark:text-gray-300 mb-8">
              Conecta con tus tiendas favoritas de Estados Unidos como Amazon, Shein y eBay con nuestro servicio confiable de envíos. Nosotros nos encargamos de todo, desde la recepción hasta la entrega.
            </p>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white dark:bg-secondary-light rounded-2xl shadow-2xl p-6 mb-10 transform hover:scale-105 transition-transform duration-300 border border-primary/20"
            >
              <TrackingForm />
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="primary" size="lg">
                Nuestros Servicios
              </Button>
              <Button variant="outline" size="lg">
                Contáctanos
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="lg:w-1/2"
          >
            <div className="relative">
              <motion.img 
                src="https://images.pexels.com/photos/7706440/pexels-photo-7706440.jpeg"
                alt="Servicio de entrega HIT CARGO"
                className="rounded-2xl shadow-2xl w-full object-cover border-4 border-primary/20"
                style={{ height: '600px' }}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              />

              <motion.div 
                className="absolute -bottom-5 -left-5 bg-white dark:bg-secondary-light p-6 rounded-2xl shadow-xl border border-primary/20"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary p-3 rounded-full">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-secondary dark:text-white">Entrega Rápida</p>
                    <p className="text-neutral-text dark:text-gray-300">Estados Unidos a Nicaragua</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -top-5 -right-5 bg-white dark:bg-secondary-light p-6 rounded-2xl shadow-xl border border-primary/20"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-yellow p-3 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-secondary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-secondary dark:text-white">Envío Seguro</p>
                    <p className="text-neutral-text dark:text-gray-300">100% Confiable</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-secondary-light to-transparent" />
    </section>
  );
};

export default HeroSection;