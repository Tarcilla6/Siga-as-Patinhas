import React from 'react';
import { Badge } from './Badge';
import { Button } from './Button';

interface EventCardProps {
  dateTag: string; // ex: "12 OUT • 13H"
  title: string;
  locationAndPrice: string; // ex: "Parque das Flores • Gratuito"
  imageUrl: string;
  onVerEvento?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  dateTag,
  title,
  locationAndPrice,
  imageUrl,
  onVerEvento
}) => {
  return (
    <div className="bg-amarelo rounded-2xl border border-marrom overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col max-w-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge status={dateTag} className="bg-marrom text-creme border-marrom shadow-sm" />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <h3 className="font-destaque font-bold text-marrom text-xl">{title}</h3>
          <p className="text-marrom/80 text-xs font-corpo mt-1">{locationAndPrice}</p>
        </div>

        <Button 
          variant="primary" 
          onClick={onVerEvento}
          className="w-full bg-marrom hover:bg-terra"
        >
          Ver evento
        </Button>
      </div>
    </div>
  );
};
