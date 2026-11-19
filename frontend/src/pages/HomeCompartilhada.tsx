import React, { useState } from "react";
import {
  Menu,
  Heart,
  WarningTriangle,
  List,
  Home,
  Calendar,
  HelpCircle,
  ShieldAlert,
  User,
  NavArrowRight,
} from "iconoir-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const HomeCompartilhada: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
            { label: "Minhas denúncias", icon: List },
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
            {[
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
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#571A00]">{animal.name}</h3>
                    <Heart className="w-4 h-4 text-[#571A00]" />
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
            <button className="text-[#571A00] font-bold underline text-sm">
              Agenda
            </button>
          </div>
          <div className="bg-[#FEE08A] p-3 rounded-2xl flex justify-between items-center border border-[#571A00]">
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
      <nav className="fixed bottom-0 w-full bg-[#571A00] text-white flex justify-around py-3 px-2">
        {[
          { name: "Início", icon: Home, active: true },
          { name: "Adoção", icon: Heart },
          { name: "Eventos", icon: Calendar },
          { name: "Suporte", icon: HelpCircle },
          { name: "Denúncia", icon: ShieldAlert },
          { name: "Perfil", icon: User },
        ].map((item, idx) => (
          <div
            key={item.name}
            className={`flex flex-col items-center gap-1 cursor-pointer ${item.active ? "bg-[#FEE08A] text-[#571A00] rounded-2xl px-3 py-1.5" : "text-white"}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px]">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default HomeCompartilhada;
