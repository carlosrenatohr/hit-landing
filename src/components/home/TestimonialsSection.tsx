import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  imageSrc: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, rating, imageSrc }) => {
  return (
    <div className="bg-white dark:bg-secondary-light p-6 rounded-lg shadow-lg border border-primary/10">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < rating ? 'text-accent-yellow fill-accent-yellow' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-neutral-text dark:text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={imageSrc} 
          alt={author} 
          className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-primary/20" 
        />
        <div>
          <h4 className="font-bold text-secondary dark:text-white">{author}</h4>
          <p className="text-sm text-neutral-text dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "HIT CARGO hizo que fuera muy fácil comprar en tiendas de Estados Unidos. Mis paquetes siempre llegan seguros y a tiempo. ¡Excelente servicio!",
      author: "María Hernández",
      role: "Cliente Regular",
      rating: 5,
      imageSrc: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "He estado usando su servicio por más de un año. El sistema de rastreo es excelente y su atención al cliente es muy responsiva.",
      author: "Carlos Mendoza",
      role: "Empresario",
      rating: 4,
      imageSrc: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      quote: "¡Finalmente puedo comprar en mis tiendas favoritas de Estados Unidos! La opción de envío marítimo me ahorra mucho dinero en compras grandes.",
      author: "Elena Gutiérrez",
      role: "Compradora Online",
      rating: 5,
      imageSrc: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section className="py-20 bg-secondary dark:bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No solo tomes nuestra palabra. Esto es lo que nuestros clientes satisfechos dicen sobre nuestros servicios.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;