export interface TrackingEvent {
  date: string;
  location: string;
  status: string;
}

export interface TrackingData {
  number: string;
  status: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
}

export function validateTrackingNumber(number: string): boolean {
  return /^HIT\d{8}-\d{3}$/.test(number.trim());
}

export function getTrackingMockData(number: string): TrackingData {
  return {
    number: number,
    status: 'En Tránsito',
    estimatedDelivery: '25 de Julio, 2024',
    events: [
      {
        date: '20 de Julio, 2024 08:30 AM',
        location: 'Miami, FL',
        status: 'Paquete recibido en instalación de origen'
      }
    ]
  };
}
