import React, { useState, useEffect } from "react";
import {
  Menu,
  Heart,
  WarningTriangle,
  ShieldAlert,
  Home,
  Calendar,
  HelpCircle,
  User,
  NavArrowRight,
} from "iconoir-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { BottomNav } from "../components/BottomNav";

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#571A00] text-[#FEE08A] px-6 py-3 rounded-full shadow-lg font-bold text-sm animate-fade-in-out">
      {message}
    </div>
  );
};


const HomeCompartilhada: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (name: string) => {
    const isFav = !!favorites[name];
    setFavorites((prev) => ({ ...prev, [name]: !isFav }));
    setToast(isFav ? "Removido dos favoritos!" : "Adicionado aos favoritos!");
  };

  return (
    <div className="min-h-screen bg-[#FFFDDD] flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-[#571A00] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center">
            <span className="text-xl">🐾</span>
          </div>
          <div className="text-white font-bold text-lg font-serif">
            Siga as
            <br />
            Patinhas
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-[#571A00] bg-[#FFFDDD] p-2 rounded-full"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Conteúdo */}
      <main className="flex-grow max-w-[760px] mx-auto px-5 py-6 pb-28">
        {/* Saudação */}
        <section className="mb-6">
          <p className="text-sm font-medium text-[#571A00]/80">
            Bom dia, Marina
          </p>
          <div className="flex items-center justify-between mt-1">
            <h1 className="text-3xl font-bold text-[#571A00] font-serif">
              Vamos cuidar juntos?
            </h1>
            <div className="flex items-center gap-2 bg-[#AFCFFE] px-3 py-1.5 rounded-full">
              <User className="w-4 h-4 text-[#571A00]" />
              <span className="text-xs font-bold text-[#571A00]">Cidadão</span>
            </div>
          </div>
          <div className="bg-[#FEE08A] p-4 rounded-2xl mt-4 flex items-center justify-between border border-[#571A00]">
            <p className="text-[#571A00] font-medium text-xs max-w-[70%]">
              A base é compartilhada por Cidadão, ONG e Governo.
            </p>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-[#571A00] text-[#FFFDDD] px-4 py-1.5 rounded-full text-xs font-bold"
            >
              TROCAR
            </button>
          </div>
        </section>

        {/* Cards de Ação */}
        <section className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Adotar", icon: Heart },
            { label: "Denunciar", icon: WarningTriangle },
            { label: "Minhas denúncias", icon: ShieldAlert },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="bg-[#FEE08A] border border-[#571A00] p-4 rounded-2xl text-[#571A00] font-bold text-sm text-center flex flex-col items-center gap-2 transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <Icon className="w-6 h-6" />
              {label}
            </button>
          ))}
        </section>
        {/* Animais em destaque */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-[#571A00]/60 uppercase">
              Novos começos
              <div className="text-2xl font-serif text-[#571A00] normal-case">
                Animais em destaque
              </div>
            </h2>
            <button className="text-[#571A00] font-bold underline text-sm">
              Ver todos
            </button>
          </div>
          <div className="flex gap-4">
            {loading
              ? [1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-2xl w-1/2 border border-[#571A00] flex gap-3 animate-pulse"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gray-200" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))
              : [
                  {
                    name: "Amora",
                    img: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=200&h=200&fit=crop",
                  },
                  {
                    name: "Nino",
                    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&h=200&fit=crop",
                  },
                ].map((animal, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-2xl w-1/2 border border-[#571A00] flex gap-3"
                  >
                    <img
                      src={animal.img}
                      alt={animal.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-[#571A00]">{animal.name}</h3>
                        <button
                          onClick={() => toggleFavorite(animal.name)}
                          className="transition-transform active:scale-125"
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites[animal.name] ? "fill-[#571A00]" : "text-[#571A00]"}`}
                          />
                        </button>
                      </div>
                      <p className="text-[10px] text-[#571A00]/80">2 anos · 8km</p>
                      <span className="bg-[#FEE08A] text-[#571A00] text-[9px] px-2 py-0.5 rounded-full w-fit font-bold uppercase">
                        DISPONÍVEL
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* Próximo evento */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-[#571A00]/60 uppercase">
              Agenda
              <div className="text-2xl font-serif text-[#571A00] normal-case">
                Próximo evento
              </div>
            </h2>
            <button 
              onClick={() => navigate("/eventos")}
              className="text-[#571A00] font-bold underline text-sm"
            >
              Agenda
            </button>
          </div>
          <div 
            onClick={() => navigate("/eventos")}
            className="bg-[#FEE08A] p-3 rounded-2xl flex justify-between items-center border border-[#571A00] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#571A00] text-[#FFFDDD] rounded-xl p-3 text-center">
                <div className="text-xl font-bold">12</div>
                <div className="text-[10px] font-bold">OUT</div>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-[#571A00]">Feira de adoção</p>
                <p className="text-[10px] text-[#571A00]/80">
                  Parque das Flores · 10h · 24 vagas
                </p>
              </div>
            </div>
            <NavArrowRight className="text-[#571A00] w-6 h-6" />
          </div>
        </section>

        {/* Alerta e Métricas */}
        <section>
          <div className="bg-[#AFCFFE] p-4 rounded-2xl mb-4 flex items-center gap-4">
            <div className="bg-[#571A00] p-2 rounded-xl text-[#FFFDDD]">
              <WarningTriangle className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <p className="font-bold text-[#571A00] text-xs">
                #SP-2481 · EM ANÁLISE
              </p>
              <p className="text-sm font-bold text-[#571A00]">
                Animal sem abrigo adequado
              </p>
            </div>
            <NavArrowRight className="text-[#571A00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FEE08A] p-4 rounded-2xl text-center border border-[#571A00]">
              <p className="text-2xl font-bold text-[#571A00]">18</p>
              <p className="text-[10px] text-[#571A00]">
                animais protegidos esta semana
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl text-center border border-[#571A00]">
              <p className="text-2xl font-bold text-[#571A00]">7</p>
              <p className="text-[10px] text-[#571A00]">
                casos com equipes mobilizadas
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Navbar Inferior */}
      <BottomNav />
      <style>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          15% { opacity: 1; transform: translate(-50%, 0); }
          85% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomeCompartilhada;

