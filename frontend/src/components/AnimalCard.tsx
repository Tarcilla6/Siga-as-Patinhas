import React, { useState } from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { Heart } from 'iconoir-react';

interface AnimalCardProps {
  name: string;
  ageAndBreed: string;
  imageUrl: string;
  status?: string;
  onConhecer?: () => void;
  onFavorite?: () => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  name,
  ageAndBreed,
  imageUrl,
  status = 'Disponível',
  onConhecer,
  onFavorite
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    if (onFavorite) onFavorite();
  };

  return (
    <div className="bg-creme rounded-2xl border border-marrom overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col max-w-sm">
      <div className="relative h-56 w-full overflow-hidden bg-marrom/10">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <button
          onClick={handleFavoriteClick}
          aria-label="Favoritar"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-creme border border-marrom flex items-center justify-center text-marrom hover:bg-amarelo transition-colors shadow-sm"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-marrom text-marrom' : ''}`} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-destaque font-bold text-marrom text-xl">{name}</h3>
            <p className="text-marrom/70 text-xs font-corpo mt-0.5">{ageAndBreed}</p>
          </div>
          <Badge status={status} />
        </div>

        <Button 
          variant="primary" 
          onClick={onConhecer}
          className="w-full"
          icon={<span>🐾</span>}
        >
          Conhecer
        </Button>
      </div>
    </div>
  );
};
