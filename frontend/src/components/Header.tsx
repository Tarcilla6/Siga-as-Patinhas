import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Menu } from 'iconoir-react';

interface HeaderProps {
  showBack?: boolean;
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBack = false, onOpenSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#571A00] px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-[#FEE08A] text-[#571A00] flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        <div 
          onClick={() => navigate('/inicio')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center">
            <span className="text-xl">🐾</span>
          </div>
          <div className="text-white font-bold text-lg font-serif">
            Siga as
            <br />
            Patinhas
          </div>
        </div>
      </div>
      
      <button 
        onClick={onOpenSidebar} 
        className="w-10 h-10 rounded-full bg-[#FEE08A] text-[#571A00] flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};
