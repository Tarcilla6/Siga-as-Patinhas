import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building, User, Mail, Eye, EyeClosed, ShieldCheck } from "iconoir-react";

const LoginOngCuidador: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"ONG" | "Cuidador">("Cuidador");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00]">
      <header className="w-full bg-[#571A00] text-[#FFFDDD]">
        <div className="w-full px-6 sm:px-8 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/login")} className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center text-[#571A00] hover:scale-105 transition-transform">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-xs">Siga as Patinhas</p>
            <h1 className="font-destaque text-xl">Área do Cuidador</h1>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#FFFDDD]/30 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[540px] mx-auto px-4 py-8">
        <div className="inline-block px-3 py-1 rounded-full bg-[#AFCFFE] text-xs font-bold text-[#571A00] mb-4">
          UMA REDE QUE PROTEGE
        </div>
        <h2 className="text-3xl font-destaque mb-2">Entrando como ONG ou cuidador</h2>
        <p className="mb-8">Entre para acolher, publicar animais e organizar eventos da sua rede.</p>

        <p className="mb-4 font-bold">Como você quer entrar?</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {(["ONG", "Cuidador"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${role === r ? "bg-[#FEE08A] border-[#FEE08A]" : "bg-white border-[#571A00]/10"}`}
            >
              {r === "ONG" ? <Building className="w-8 h-8" /> : <User className="w-8 h-8" />}
              <span className="font-bold">{r}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input type="email" placeholder="E-mail" className="w-full p-4 pl-12 rounded-full border border-[#571A00]/20 bg-white focus:ring-4 focus:ring-[#FEE08A]/60 outline-none" />
            <Mail className="absolute left-4 top-4 w-5 h-5 text-[#571A00]/50" />
          </div>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="Senha" className="w-full p-4 pl-12 rounded-full border border-[#571A00]/20 bg-white focus:ring-4 focus:ring-[#FEE08A]/60 outline-none" />
            <ShieldCheck className="absolute left-4 top-4 w-5 h-5 text-[#571A00]/50" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4">
              {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="text-right">
            <button className="text-xs font-bold underline">Esqueci minha senha</button>
          </div>
        </div>

        <button className="w-full mt-8 py-4 rounded-full bg-[#571A00] text-white font-bold hover:-translate-y-0.5 active:scale-95 transition-all">
          Entrar como {role}
        </button>

        <div className="flex items-center justify-center gap-2 mt-6 text-[#571A00]/70">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs">Acesso seguro e seus dados protegidos</span>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs">
            Ainda não faz parte?{" "}
            <button onClick={() => navigate(`/cadastro/${role.toLowerCase()}`)} className="font-bold underline">Criar cadastro</button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginOngCuidador;
