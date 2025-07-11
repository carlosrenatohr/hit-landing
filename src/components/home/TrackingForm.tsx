import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

const TrackingForm: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError('Por favor ingresa un número de rastreo');
      return;
    }
    
    setError('');
    
    try {
      // Here you can integrate with your tracking service
      const response = await fetch(`/api/track/${trackingNumber}`);
      if (!response.ok) throw new Error('Tracking failed');
      
      window.location.href = `#/track?number=${trackingNumber}`;
    } catch (err) {
      setError('No se pudo rastrear el paquete. Inténtalo de nuevo.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">
        Rastrea tu Paquete
      </h2>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Ingresa tu número de rastreo"
            className={`pl-12 pr-4 py-4 w-full border-2 ${
              error ? 'border-red-500' : 'border-accent-blue/30 dark:border-gray-600'
            } rounded-xl bg-white dark:bg-secondary text-secondary dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-300`}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
        <Button 
          type="submit" 
          variant="accent-blue" 
          className="w-full mt-4 py-4 text-lg rounded-xl transform hover:scale-105 transition-transform duration-300"
        >
          Rastrear Paquete
        </Button>
      </form>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-10 blur-xl" />
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent-blue rounded-full opacity-10 blur-xl" />
    </motion.div>
  );
};

export default TrackingForm;