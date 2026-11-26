import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building, Attachment, ShieldCheck } from "iconoir-react";

const CadastroOng: React.FC = () => {
  const navigate = useNavigate();
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [toast, navigate]);

  const handleCadastroOng = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termos) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setToast("Solicitação de cadastro enviada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00]">
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#571A00] text-[#FEE08A] border border-[#FEE08A] px-6 py-3 rounded-full shadow-xl font-bold text-sm transition-all duration-300">
          {toast}
        </div>
      )}
      <header className="w-full bg-[#571A00] text-[#FFFDDD]">
        <div className="w-full px-6 sm:px-8 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/cadastro")} className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center text-[#571A00] hover:scale-105 transition-transform">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <p className="text-xs">Siga as Patinhas</p>
            <h1 className="font-destaque text-xl">Cadastro ONG</h1>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#FFFDDD]/30 flex items-center justify-center">
             <Building className="w-6 h-6" />
          </div>
        </div>
      </header>

      <main className="w-full max-w-[540px] mx-auto px-4 py-8">
        <div className="inline-block px-3 py-1 rounded-full bg-[#AFCFFE] text-xs font-bold text-[#571A00] mb-4">
          ORGANIZAÇÕES QUE ACOLHEM
        </div>
        <h2 className="text-3xl font-destaque mb-4">Cadastre sua organização</h2>
        
        <div className="mb-6">
            <div className="flex justify-between text-xs font-bold mb-1">
                <span>Etapa 2 de 4</span>
                <span>50%</span>
            </div>
            <div className="w-full h-2 bg-[#571A00]/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-[#AFCFFE]"></div>
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <label className="text-xs font-bold mb-1 block">Nome da organização</label>
                <input type="text" placeholder="Nome oficial ou nome fantasia" className="w-full p-4 rounded-xl border border-[#571A00]/20 bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold mb-1 block">CNPJ</label>
                    <input type="text" placeholder="00.000.000/0000-00" className="w-full p-4 rounded-xl border border-[#571A00]/20 bg-white" />
                </div>
                <div>
                    <label className="text-xs font-bold mb-1 block">Registro</label>
                    <input type="text" placeholder="Nº municipal/estadual" className="w-full p-4 rounded-xl border border-[#571A00]/20 bg-white" />
                </div>
            </div>
            <div>
                <label className="text-xs font-bold mb-1 block">Responsável legal</label>
                <input type="text" placeholder="Nome completo" className="w-full p-4 rounded-xl border border-[#571A00]/20 bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold mb-1 block">E-mail institucional</label>
                    <input type="email" placeholder="contato@ong.org" className="w-full p-4 rounded-xl border border-[#571A00]/20 bg-white" />
                </div>
                <div>
                    <label className="text-xs font-bold mb-1 block">Telefone</label>
                    <input type="tel" placeholder="(00) 00000-0000" className="w-full p-4 rounded-xl border border-[#571A00]/20 bg-white" />
                </div>
            </div>
            <div>
                <label className="text-xs font-bold mb-1 block">Documento comprobatório</label>
                <div className="w-full p-4 rounded-xl border border-[#571A00]/20 bg-white flex items-center gap-2 cursor-pointer">
                    <Attachment className="w-5 h-5 text-[#571A00]/50" />
                    <span className="text-[#571A00]/50">Ata, Estatuto ou Registro - Anexar PDF</span>
                </div>
            </div>
            
            <div className="bg-[#AFCFFE]/40 p-4 rounded-xl flex gap-3">
                <input 
                  type="checkbox" 
                  checked={termos}
                  onChange={(e) => setTermos(e.target.checked)}
                  className="w-5 h-5 accent-[#571A00]" 
                />
                <label className="text-xs">Declaro que posso representar esta organização.</label>
            </div>
        </div>

        <button 
          onClick={handleCadastroOng}
          disabled={loading || !termos}
          className="w-full mt-8 py-4 rounded-full bg-[#571A00] text-white font-bold hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
        >
          {loading ? "Enviando..." : "Enviar para validação"}
        </button>

        <div className="text-center mt-6">
            <button className="text-xs font-bold underline">Já representa uma ONG cadastrada? Solicitar acesso</button>
        </div>
      </main>
    </div>
  );
};

export default CadastroOng;

