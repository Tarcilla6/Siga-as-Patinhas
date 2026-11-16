import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Search, 
  Heart, 
  WarningTriangle, 
  Calendar, 
  User, 
  Pin, 
  Bell 
} from 'iconoir-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-marrom text-creme px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo / Brand */}
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-amarelo text-marrom flex items-center justify-center font-destaque font-bold text-xl shadow-inner transition-transform group-hover:scale-105">
            🐾
          </div>
          <div className="flex flex-col">
            <span className="font-destaque font-bold text-xl tracking-tight leading-none text-amarelo">
              Siga as
            </span>
            <span className="font-destaque font-bold text-2xl tracking-tight leading-none text-creme">
              Patinhas
            </span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-1 md:gap-3 bg-terra/50 px-4 py-2 rounded-full border border-marrom/30 shadow-inner">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-amarelo text-marrom font-semibold shadow-sm' 
                  : 'text-creme/90 hover:text-amarelo hover:bg-marrom/40'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/adocao" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-amarelo text-marrom font-semibold shadow-sm' 
                  : 'text-creme/90 hover:text-amarelo hover:bg-marrom/40'
              }`
            }
          >
            Adoção
          </NavLink>
          <NavLink 
            to="/denuncias" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-amarelo text-marrom font-semibold shadow-sm' 
                  : 'text-creme/90 hover:text-amarelo hover:bg-marrom/40'
              }`
            }
          >
            Denúncias
          </NavLink>
          <NavLink 
            to="/eventos" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-amarelo text-marrom font-semibold shadow-sm' 
                  : 'text-creme/90 hover:text-amarelo hover:bg-marrom/40'
              }`
            }
          >
            Eventos
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-amarelo text-marrom font-semibold shadow-sm' 
                  : 'text-creme/90 hover:text-amarelo hover:bg-marrom/40'
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        {/* User profile & notifications */}
        <div className="flex items-center space-x-3">
          <button 
            aria-label="Notificações"
            className="w-10 h-10 rounded-full bg-terra hover:bg-terra/80 border border-marrom flex items-center justify-center text-amarelo transition-all shadow-sm"
          >
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 bg-azul text-marrom px-4 py-1.5 rounded-full border border-marrom shadow-sm font-medium text-sm">
            <div className="w-6 h-6 rounded-full bg-marrom text-azul flex items-center justify-center font-bold text-xs">
              M
            </div>
            <span>Marina</span>
          </div>
        </div>
      </div>
    </header>
  );
};
