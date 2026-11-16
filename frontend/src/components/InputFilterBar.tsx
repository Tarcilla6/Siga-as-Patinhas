import React from 'react';
import { Search, Pin } from 'iconoir-react';

interface InputFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories?: string[];
  location?: string;
  onLocationChange?: (location: string) => void;
}

export const InputFilterBar: React.FC<InputFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories = ['TODOS', 'CÃES', 'GATOS', 'DISPONÍVEL', 'EM PROCESSO'],
  location = 'São Paulo, SP',
  onLocationChange
}) => {
  return (
    <div className="bg-creme p-6 rounded-2xl border border-marrom shadow-sm space-y-4 max-w-xl">
      <h3 className="font-destaque font-bold text-marrom text-lg">Busca e filtros</h3>
      
      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-marrom/60">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Busque por nome ou cidade"
          className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-marrom rounded-full text-marrom placeholder-marrom/50 text-sm focus:outline-none focus:ring-2 focus:ring-marrom/30 transition-all shadow-inner"
        />
      </div>

      {/* Category Filter Badges */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toUpperCase() === cat.toUpperCase();
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border border-marrom transition-all ${
                isSelected 
                  ? 'bg-marrom text-creme shadow-md scale-105' 
                  : 'bg-amarelo/60 text-marrom hover:bg-amarelo'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Location Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-marrom/60">
          <Pin className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
          placeholder="Localização..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-marrom rounded-full text-marrom text-sm focus:outline-none focus:ring-2 focus:ring-marrom/30 transition-all shadow-inner"
        />
      </div>
    </div>
  );
};
