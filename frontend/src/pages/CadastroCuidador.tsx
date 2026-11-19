import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  CloudUpload,
  Phone,
  Mail,
  MapPin,
  Eye,
  EyeClosed,
  Group,
} from "iconoir-react";

const Toast = ({ message, show }: { message: string; show: boolean }) => (
  <div
    className={`fixed bottom-8 right-8 bg-[#571A00] text-[#FEE08A] px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform z-50 pointer-events-none ${show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
  >
    {message}
  </div>
);

export const CadastroCuidador: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const getPasswordStrength = (s: string) => {
    if (s.length === 0) return { width: "0%", color: "bg-gray-300" };
    if (s.length < 6) return { width: "33%", color: "bg-red-500" };
    if (s.length <= 8) return { width: "66%", color: "bg-yellow-500" };
    if (/[0-9]/.test(s) || /[^A-Za-z0-9]/.test(s))
      return { width: "100%", color: "bg-green-500" };
    return { width: "66%", color: "bg-yellow-500" };
  };

  const strength = getPasswordStrength(senha);
  const formatTelefone = (v: string) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024)
      setFotoPreview(URL.createObjectURL(file));
    else if (file) alert("Arquivo muito grande! Máximo 5MB.");
  };

  const handleConcluir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termos) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/login/cuidado");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00] flex flex-col font-sans">
      <Toast message="Cadastro concluído com sucesso!" show={showToast} />
      <header className="w-full bg-[#571A00] text-[#FFFDDD]">
        <div className="w-full px-6 sm:px-8 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/login/cuidado")}
            className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center text-[#571A00] hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 ml-4 text-center">
            <p className="text-xs">Siga as Patinhas</p>
            <h1 className="font-bold text-lg">Cadastro de cuidador</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#FFFDDD]/20 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>
      </header>
      <main className="w-full max-w-[540px] mx-auto px-5 py-8">
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="px-4 py-1 rounded-full bg-[#FEE08A] text-[#571A00] text-xs font-bold uppercase tracking-widest">
            Seu cuidado começa aqui
          </div>
          <h2 className="text-3xl font-serif text-[#571A00] font-bold">
            Crie seu perfil de cuidador
          </h2>
          <p className="text-sm">
            Cadastro pessoal • campos com * são obrigatórios
          </p>
        </div>
        <form onSubmit={handleConcluir} className="w-full space-y-6">
          <div
            className="border-2 border-dashed border-[#571A00] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#571A00]/5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            onClick={() => document.getElementById("foto-input")?.click()}
          >
            <input
              id="foto-input"
              type="file"
              className="hidden"
              onChange={handleFotoChange}
              accept="image/*"
            />
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Preview"
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
            ) : (
              <div className="flex flex-col items-center">
                <CloudUpload className="w-8 h-8 mb-2" />
                <span className="text-sm font-bold">Adicionar foto</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Nome completo*",
                icon: User,
                value: nome,
                setter: setNome,
              },
              {
                label: "Telefone*",
                icon: Phone,
                value: telefone,
                setter: (v: string) => setTelefone(formatTelefone(v)),
              },
              { label: "E-mail*", icon: Mail, value: email, setter: setEmail },
              {
                label: "Cidade*",
                icon: MapPin,
                value: cidade,
                setter: setCidade,
              },
            ].map((f, i) => (
              <div key={i} className="relative">
                <label className="text-xs font-bold ml-4 mb-1 block">
                  {f.label}
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 w-8 h-8 rounded-full bg-[#571A00] text-[#FFFDDD] flex items-center justify-center">
                    <f.icon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                    className="w-full pl-14 pr-4 py-3 rounded-full border border-[#571A00] bg-white transition-all focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Seu acesso</h3>
            <div className="relative">
              <label className="text-xs font-bold ml-4 mb-1 block">
                Senha*
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 w-8 h-8 rounded-full bg-[#571A00] text-[#FFFDDD] flex items-center justify-center">
                  <Group className="w-4 h-4" />
                </div>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full pl-14 pr-12 py-3 rounded-full border border-[#571A00] bg-white transition-all focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-4 text-[#571A00]"
                >
                  {mostrarSenha ? (
                    <EyeClosed className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-[#FEE08A] p-4 rounded-2xl">
              <input
                type="checkbox"
                required
                checked={termos}
                onChange={(e) => setTermos(e.target.checked)}
                className="w-5 h-5 accent-[#571A00]"
              />
              <span className="text-sm font-bold text-[#571A00]">
                Aceito os Termos de Uso
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#571A00] text-[#FFFDDD] py-4 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-[#FFFDDD] border-t-transparent rounded-full animate-spin" />
              ) : (
                "Concluir cadastro"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastroCuidador;
