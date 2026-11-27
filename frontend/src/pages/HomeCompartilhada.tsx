import React, { useState, useEffect } from "react";
import {
  Heart,
  WarningTriangle,
  ShieldAlert,
  Home,
  Calendar,
  HelpCircle,
  User,
  NavArrowRight,
} from "iconoir-react";
import { animaisData } from "./PerfilAnimal";

import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";

const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
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

const animaisDataList = Object.values(animaisData);

const HomeCompartilhada: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

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
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Conteúdo */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-8 pb-28">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Animais em destaque */}
          <section className="mb-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-[#571A00]/60 uppercase">
                Novos começos
                <div className="text-2xl font-serif text-[#571A00] normal-case">
                  Animais em destaque
                </div>
              </h2>
              <button 
                onClick={() => navigate("/adocao")}
                className="text-[#571A00] font-bold underline text-sm cursor-pointer"
              >
                Ver todos
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {animaisDataList.slice(0, 2).map((animal) => (
                <div
                  key={animal.id}
                  className="bg-white p-3 rounded-2xl border border-[#571A00] flex gap-3 cursor-pointer"
                  onClick={() => navigate(`/animal/${animal.id}`)}
                >
                  <img
                    src={animal.photos[0]}
                    alt={animal.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[#571A00]">
                        {animal.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(animal.name);
                        }}
                        className="transition-transform active:scale-125"
                      >
                        <Heart
                          className={`w-4 h-4 ${favorites[animal.name] ? "fill-[#571A00]" : "text-[#571A00]"}`}
                        />
                      </button>
                    </div>
                    <p className="text-[10px] text-[#571A00]/80">
                      {animal.age} · {animal.distance.split('·')[1].trim()}
                    </p>
                    <span className="bg-[#FEE08A] text-[#571A00] text-[9px] px-2 py-0.5 rounded-full w-fit font-bold uppercase">
                      {animal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Próximo evento */}
          <section className="mb-0">
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
        </div>

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
