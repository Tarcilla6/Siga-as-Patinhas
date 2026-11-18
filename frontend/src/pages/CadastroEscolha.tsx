import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Building, Heart } from "iconoir-react";

export const CadastroEscolha: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00] flex flex-col">
      <header className="w-full bg-[#571A00] text-[#FFFDDD]">
        <div className="w-full max-w-[680px] mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/login")}
            className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center text-[#571A00] hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-xs">Siga as Patinhas</p>
            <h1 className="font-destaque text-xl">Novo Cadastro</h1>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#FFFDDD]/30 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[680px] mx-auto px-4 py-12 flex flex-col items-center text-center">
        <h2 className="font-destaque text-3xl mb-8">
          Como você deseja se cadastrar?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { title: "Cidadão", icon: User, path: "/cadastro/cidadao" },
            { title: "ONG / Protetor", icon: Heart, path: "/cadastro/cidadao" },
            { title: "Governo", icon: Building, path: "/cadastro/governo" },
          ].map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border-2 border-[#571A00]/10 shadow-sm hover:border-[#571A00] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEE08A] flex items-center justify-center text-[#571A00] group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8" />
              </div>
              <span className="font-bold text-lg">{item.title}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CadastroEscolha;
