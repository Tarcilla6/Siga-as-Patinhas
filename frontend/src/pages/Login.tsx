import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Eye,
  EyeClosed,
  ShieldCheck,
  User,
  Building,
  City,
} from "iconoir-react";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<"CIDADAO" | "ONG" | "GOVERNO">(
    "CIDADAO",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim() || !profile) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
        senha: password,
        perfil: profile,
      };

      /*
        // TODO: Integrar com endpoint POST /api/auth/login do backend Java
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Credenciais inválidas ou erro no servidor.');
        }

        const data = await response.json();
      */

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (profile === "ONG" || profile === "GOVERNO") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00] flex flex-col justify-between">
      {/* 1. Cabeçalho marrom (#571A00) ocupando 100% da largura (w-full) no topo, com logo alinhada */}
      <header className="w-full bg-[#571A00] shadow-md">
        <div className="w-full px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-start">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 cursor-pointer group text-left bg-transparent border-none p-0"
          >
            <div className="w-10 h-10 rounded-full bg-[#FEE08A] text-[#571A00] flex items-center justify-center font-destaque font-bold text-xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
              🐾
            </div>
            <div className="flex flex-col">
              <span className="font-destaque font-bold text-lg tracking-tight leading-none text-white group-hover:underline">
                Siga as
              </span>
              <span className="font-destaque font-bold text-xl tracking-tight leading-none text-white group-hover:underline">
                Patinhas
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* 2. Área do Conteúdo Responsiva (sem trava rígida de 420px, centralizada em telas grandes com px-5 no mobile) */}
      <main className="w-full max-w-[520px] mx-auto px-5 sm:px-6 py-8 md:my-auto flex flex-col justify-center">
        {/* Pílula azul (#AFCFFE) "UMA REDE QUE PROTEGE" */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#AFCFFE] border border-[#571A00]/20 shadow-sm">
            <span className="font-corpo font-bold text-xs uppercase tracking-wider text-[#571A00]">
              UMA REDE QUE PROTEGE
            </span>
          </div>
        </div>

        {/* Título em Fraunces e subtítulo */}
        <div className="text-center space-y-2 mb-6 px-2">
          <h1 className="font-destaque font-bold text-3xl sm:text-4xl text-[#571A00] leading-tight">
            Que bom ter você por aqui!
          </h1>
          <p className="font-corpo text-sm md:text-base text-[#571A00]/90 leading-relaxed max-w-[360px] mx-auto">
            Entre para cuidar, conectar e transformar a vida dos animais da sua
            cidade.
          </p>
        </div>

        {/* Seletor de Perfil ("Como você quer entrar?") */}
        {/* Alerta discreto de erro, caso ocorra */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-100 border border-red-300 text-red-800 font-corpo text-xs flex items-center justify-between shadow-sm">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-800 font-bold ml-2 hover:text-red-950 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-center font-corpo font-semibold text-xs uppercase tracking-wider text-[#571A00] mb-3">
            Como você quer entrar?
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setProfile("CIDADAO")}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                profile === "CIDADAO"
                  ? "bg-[#571A00] text-white border-[#571A00] shadow-md scale-[1.02]"
                  : "bg-white text-[#571A00] border-[#571A00]/30 hover:border-[#571A00]"
              }`}
            >
              <User className="w-5 h-5 shrink-0" />
              <span className="font-corpo font-semibold text-xs sm:text-sm">
                Cidadão
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProfile("ONG")}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                profile === "ONG"
                  ? "bg-[#571A00] text-white border-[#571A00] shadow-md scale-[1.02]"
                  : "bg-white text-[#571A00] border-[#571A00]/30 hover:border-[#571A00]"
              }`}
            >
              <Building className="w-5 h-5 shrink-0" />
              <span className="font-corpo font-semibold text-xs sm:text-sm">
                ONG
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProfile("GOVERNO")}
              className={`py-3 px-2 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                profile === "GOVERNO"
                  ? "bg-[#571A00] text-white border-[#571A00] shadow-md scale-[1.02]"
                  : "bg-white text-[#571A00] border-[#571A00]/30 hover:border-[#571A00]"
              }`}
            >
              <City className="w-5 h-5 shrink-0" />
              <span className="font-corpo font-semibold text-xs sm:text-sm">
                Governo
              </span>
            </button>
          </div>

          {/* Link para Login ONG/Cuidador */}
          <div className="mt-4 p-3.5 border border-[#571A00]/20 rounded-2xl bg-white/50 text-center">
            <p className="font-corpo text-xs font-semibold mb-1">
              Já é uma ONG ou Cuidador?
            </p>
            <button
              type="button"
              onClick={() => navigate("/login/cuidado")}
              className="text-xs text-[#571A00] font-bold underline cursor-pointer hover:text-[#683117]"
            >
              Acessar área de cuidador
            </button>
          </div>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* E-mail Input */}
          <div className="relative flex items-center">
            <input
              type="email"
              required
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3.5 pl-12 pr-4 rounded-full bg-white border border-[#571A00] text-[#571A00] placeholder-[#571A00]/50 font-corpo text-sm focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 shadow-sm transition-all duration-200"
            />
            <div className="absolute left-3.5 w-7 h-7 rounded-full bg-[#AFCFFE]/40 border border-[#571A00]/30 flex items-center justify-center text-[#571A00]">
              <Mail className="w-4 h-4" />
            </div>
          </div>

          {/* Senha Input */}
          <div className="space-y-1">
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3.5 pl-12 pr-12 rounded-full bg-white border border-[#571A00] text-[#571A00] placeholder-[#571A00]/50 font-corpo text-sm focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 shadow-sm transition-all duration-200"
              />
              <div className="absolute left-3.5 w-7 h-7 rounded-full bg-[#AFCFFE]/40 border border-[#571A00]/30 flex items-center justify-center text-[#571A00]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-[#571A00]/70 cursor-pointer transition-colors"
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Esqueci minha senha link à direita */}
            <div className="flex justify-end pt-1 pr-2">
              <button
                type="button"
                onClick={() => navigate("/cadastro")}
                className="font-corpo text-xs text-[#571A00] hover:underline font-semibold cursor-pointer"
              >
                Esqueci minha senha
              </button>
            </div>
          </div>

          {/* Botão largo marrom "Entrar" */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-[#571A00] text-white font-corpo font-bold text-base shadow-lg hover:bg-[#683117] transition-all transform active:scale-95 flex items-center justify-center cursor-pointer mt-2 disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Enviando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Aviso "Acesso seguro e seus dados protegidos" com ícone de escudo */}
        <div className="flex items-center justify-center gap-2 mt-6 text-[#571A00]/70">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="font-corpo text-xs">
            Acesso seguro e seus dados protegidos
          </span>
        </div>

        {/* Rodapé "Ainda não faz parte? Criar cadastro" */}
        <div className="text-center mt-6 pb-4">
          <p className="font-corpo text-xs text-[#571A00]">
            Ainda não faz parte?{" "}
            <button
              onClick={() => navigate("/cadastro")}
              className="font-bold underline hover:text-[#683117] transition-colors cursor-pointer"
            >
              Criar cadastro
            </button>
          </p>
        </div>
      </main>

      {/* Espaçador inferior em telas grandes */}
      <div className="h-4"></div>
    </div>
  );
};

export default Login;
