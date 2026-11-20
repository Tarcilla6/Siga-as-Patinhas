import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Heart,
  Calendar,
  HelpCircle,
  ShieldAlert,
  User,
} from "iconoir-react";

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Início", icon: Home, path: "/inicio" },
    { name: "Adoção", icon: Heart, path: "/adocao" },
    { name: "Eventos", icon: Calendar, path: "/eventos" },
    { name: "Suporte", icon: HelpCircle, path: "/suporte" },
    { name: "Denúncias", icon: ShieldAlert, path: "/denuncias" },
    { name: "Perfil", icon: User, path: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full h-[72px] bg-[#571A00] text-white flex items-center justify-around px-2 z-40">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-16 py-1.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-90 ${
              isActive
                ? "bg-[#FEE08A] text-[#571A00] font-bold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] whitespace-nowrap">{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};
