import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserCircle, CloudUpload } from "iconoir-react";

const Toast = ({ message, show }: { message: string; show: boolean }) => (
  <div
    className={`fixed bottom-8 right-8 bg-[#571A00] text-[#FEE08A] px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform z-50 ${
      show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`}
  >
    {message}
  </div>
);

export const CadastroCidadao: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cidade, setCidade] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const formatCelular = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleContinuar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termos) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setShowToast(true);
    setTimeout(() => {
        setShowToast(false);
        navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00] flex flex-col">
      <Toast message="Cadastro concluído com sucesso!" show={showToast} />
      <header className="w-full bg-[#571A00] text-[#FFFDDD]">
        <div className="w-full px-6 sm:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/login")}
            className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center text-[#571A00] hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-xs">Siga as Patinhas</p>
            <h1 className="font-destaque text-xl">Cadastro Cidadão</h1>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#FFFDDD]/30 flex items-center justify-center">
            <UserCircle className="w-6 h-6" />
          </div>
        </div>
      </header>


      <main className="w-full max-w-[680px] mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-2 mb-6">
          <div className="px-4 py-1 rounded-full bg-[#FEE08A] text-[#571A00] text-xs font-bold uppercase tracking-widest">
            SEU CUIDADO COMEÇA AQUI
          </div>
          <h2 className="font-destaque text-3xl text-center">
            Crie seu perfil cidadão
          </h2>
          <p className="text-sm text-center">
            Preencha seus dados básicos para participar da rede.
          </p>
          <div className="w-full mt-4">
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Etapa 1 de 3</span>
              <span>33%</span>
            </div>
            <div className="w-full h-2 bg-[#571A00]/20 rounded-full overflow-hidden">
              <div className="h-full w-[33%] bg-[#FEE08A] rounded-full"></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleContinuar} className="w-full space-y-4">
          <div
            className="border-2 border-dashed border-[#571A00] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#571A00]/5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            onClick={() => document.getElementById("foto-input")?.click()}
          >
            <input
              id="foto-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFotoChange}
            />
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
              />
            ) : (
              <CloudUpload className="mx-auto mb-2 text-[#571A00] w-8 h-8" />
            )}
            <span className="block font-bold">Adicionar sua foto</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">Nome completo*</label>
            <input
              type="text"
              placeholder="Como prefere ser chamado(a)"
              className="w-full p-4 rounded-full border border-[#571A00] bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold">CPF*</label>
              <input
                type="text"
                placeholder="000.000.000-00"
                className="w-full p-4 rounded-full border border-[#571A00] bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Nascimento*</label>
              <input
                type="date"
                className="w-full p-4 rounded-full border border-[#571A00] bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">E-mail*</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full p-4 rounded-full border border-[#571A00] bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold">Celular*</label>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                className="w-full p-4 rounded-full border border-[#571A00] bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
                value={celular}
                onChange={(e) => setCelular(formatCelular(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Cidade</label>
              <input
                type="text"
                placeholder="São Paulo, SP"
                className="w-full p-4 rounded-full border border-[#571A00] bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#FEE08A] p-4 rounded-2xl space-y-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={termos}
                onChange={(e) => setTermos(e.target.checked)}
                className="w-5 h-5 accent-[#571A00]"
              />
              <span className="text-sm text-[#571A00]">
                Li e aceito os Termos de Uso e a Política de Privacidade.
              </span>
            </label>
            <button
              type="submit"
              className="w-full bg-[#571A00] text-[#FFFDDD] py-4 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Enviando...
                </>
              ) : (
                "Continuar"
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastroCidadao;
