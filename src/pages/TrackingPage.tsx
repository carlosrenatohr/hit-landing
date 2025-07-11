import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Search, Package, Truck, MapPin } from 'lucide-react';

const TrackingPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data - in a real app, this would come from an API
  const trackingInfo = {
    number: 'HIT20240720-001',
    status: 'En Tránsito',
    estimatedDelivery: '25 de Julio, 2024',
    shipDate: '20 de Julio, 2024',
    origin: 'Miami, FL, Estados Unidos',
    destination: 'Managua, Nicaragua',
    events: [
      {
        date: '20 de Julio, 2024 08:30 AM',
        location: 'Miami, FL',
        status: 'Paquete recibido en instalación de origen',
        icon: <Package />
      },
      {
        date: '21 de Julio, 2024 10:15 AM',
        location: 'Miami, FL',
        status: 'Paquete procesado y preparado para envío internacional',
        icon: <Package />
      },
      {
        date: '22 de Julio, 2024 02:45 PM',
        location: 'En Tránsito',
        status: 'Paquete salió de instalación de origen',
        icon: <Truck />
      },
      {
        date: '23 de Julio, 2024 09:20 AM',
        location: 'En Tránsito',
        status: 'Paquete en tránsito hacia destino',
        icon: <Truck />
      }
    ]
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setError('Por favor ingresa un número de rastreo');
      return;
    }
    
    setError('');
    setIsTracking(true);
    
    // In a real app, this would make an API call to fetch tracking data
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20 bg-neutral-bg dark:bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">Rastrea tu Paquete</h1>
            <p className="text-xl text-neutral-text dark:text-gray-300 max-w-3xl mx-auto">
              Ingresa tu número de rastreo para obtener actualizaciones en tiempo real sobre el estado y ubicación de tu envío.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white dark:bg-secondary-light p-8 rounded-lg shadow-lg border border-primary/10">
              <form onSubmit={handleTrack}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Ingresa tu número de rastreo (ej. HIT20240720-001)"
                    className={`pl-10 pr-4 py-4 w-full border-2 ${
                      error ? 'border-red-500' : 'border-accent-blue/30 dark:border-gray-600'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue text-lg bg-white dark:bg-secondary text-secondary dark:text-white`}
                  />
                  {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>
                <Button 
                  type="submit" 
                  variant="accent-blue" 
                  className="w-full mt-4 py-4 text-lg"
                >
                  Rastrear Paquete
                </Button>
              </form>
              <p className="text-sm text-neutral-text dark:text-gray-400 mt-4 text-center">
                Los números de rastreo típicamente comienzan con "HIT" seguido de la fecha y un número de secuencia.
              </p>
            </div>
          </div>
          
          {isTracking && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-secondary-light p-8 rounded-lg shadow-lg mb-8 border border-primary/10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">Número de Rastreo: {trackingInfo.number}</h2>
                    <p className="text-neutral-text dark:text-gray-300">Fecha de Envío: {trackingInfo.shipDate}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-block bg-accent-yellow text-secondary font-bold px-4 py-2 rounded-full">
                      {trackingInfo.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-neutral-bg dark:bg-secondary p-4 rounded-md">
                    <p className="text-sm font-medium text-neutral-text dark:text-gray-400 mb-1">Entrega Estimada</p>
                    <p className="text-lg font-bold text-secondary dark:text-white">{trackingInfo.estimatedDelivery}</p>
                  </div>
                  <div className="bg-neutral-bg dark:bg-secondary p-4 rounded-md">
                    <p className="text-sm font-medium text-neutral-text dark:text-gray-400 mb-1">Tipo de Servicio</p>
                    <p className="text-lg font-bold text-secondary dark:text-white">Envío Aéreo</p>
                  </div>
                  <div className="bg-neutral-bg dark:bg-secondary p-4 rounded-md">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-neutral-text dark:text-gray-400 mb-1">Desde</p>
                        <p className="text-lg font-bold text-secondary dark:text-white">{trackingInfo.origin}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-neutral-bg dark:bg-secondary p-4 rounded-md">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-neutral-text dark:text-gray-400 mb-1">Hacia</p>
                        <p className="text-lg font-bold text-secondary dark:text-white">{trackingInfo.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">Historial de Rastreo</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"></div>
                  <div className="space-y-6">
                    {trackingInfo.events.map((event, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 relative z-10">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-accent-yellow' : 'bg-gray-200 dark:bg-gray-600'
                          }`}>
                            {React.cloneElement(event.icon, { 
                              className: `h-6 w-6 ${index === 0 ? 'text-secondary' : 'text-gray-500'}`
                            })}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="font-bold text-secondary dark:text-white">{event.status}</div>
                          <div className="text-sm text-neutral-text dark:text-gray-400 mt-1">{event.date}</div>
                          <div className="text-sm text-neutral-text dark:text-gray-400">{event.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="max-w-3xl mx-auto text-center mt-16">
            <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">¿Necesitas Ayuda?</h2>
            <p className="text-neutral-text dark:text-gray-300 mb-6">
              ¿No puedes encontrar tu paquete o tienes preguntas sobre tu envío? Nuestro equipo de atención al cliente está aquí para ayudarte.
            </p>
            <Button variant="outline">
              Contactar Soporte
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackingPage;