import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavArrowLeft, Building } from "iconoir-react";

export const CadastroGoverno: React.FC = () => {
  const navigate = useNavigate();

  // TODO: integrar com backend Java
  const [formData, setFormData] = useState({
    orgao: "",
    setor: "",
    municipio: "",
    uf: "",
    responsavel: "",
    matricula: "",
    cargo: "",
    email: "",
    telefone: "",
    aceite: false,
  });

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário Cadastro Governo:", formData);
    // TODO: Chamar endpoint backend Java
  };

  const [loading, setLoading] = useState(false);
  const handleGovernoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    alert("Solicitação de cadastro enviada com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00] flex flex-col items-center pb-12 font-sans">
      <header className="w-full bg-[#571A00] text-[#FFFDDD]">
        <div className="w-full px-6 sm:px-8 py-4 flex items-center justify-between">
          <button
              onClick={() => navigate("/login")}
              className="z-10 w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center text-[#571A00] transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              <NavArrowLeft />
            </button>
          <div className="text-center">
            <span className="text-xs">Siga as Patinhas</span>
            <h1 className="text-xl font-bold">Cadastro Governo</h1>
          </div>
          <div className="z-10 w-10 h-10 rounded-full border border-[#FFFDDD]/30 flex items-center justify-center">
            <Building className="text-[#FFFDDD]" />
          </div>
        </div>
      </header>

      {/* Conteúdo Centralizado */}
      <main className="w-full max-w-[680px] px-6 mt-8 mx-auto">
        {/* Topo da Tela */}
        <div className="flex flex-col items-center mb-8 text-center">
          <span className="bg-[#FEE08A] text-[#571A00] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase inline-block">
            GESTÃO PÚBLICA CONECTADA
          </span>
          <h2
            className="text-3xl font-serif mt-3"
            style={{ fontFamily: "Fraunces" }}
          >
            Acesso institucional
          </h2>
          <p className="text-[#571A00]/80 mt-1 max-w-[300px]">
            Cadastre seu órgão para acompanhar demandas e políticas públicas.
          </p>

          <div className="mt-6 w-full">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>Etapa 2 de 4</span>
              <span>50%</span>
            </div>
            <div className="w-full h-2 bg-[#FEE08A] rounded-full overflow-hidden">
              <div className="h-full bg-[#571A00] w-1/2"></div>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleGovernoSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Órgão público"
            className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
            onChange={(e) =>
              setFormData({ ...formData, orgao: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Setor"
              className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
              onChange={(e) =>
                setFormData({ ...formData, setor: e.target.value })
              }
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Município"
                className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
                onChange={(e) =>
                  setFormData({ ...formData, municipio: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="UF"
                className="w-16 p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
                onChange={(e) =>
                  setFormData({ ...formData, uf: e.target.value })
                }
              />
            </div>
          </div>
          <input
            type="text"
            placeholder="Responsável institucional"
            className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
            onChange={(e) =>
              setFormData({ ...formData, responsavel: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Matrícula funcional"
              className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
              onChange={(e) =>
                setFormData({ ...formData, matricula: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Cargo"
              className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
              onChange={(e) =>
                setFormData({ ...formData, cargo: e.target.value })
              }
            />
          </div>
          <input
            type="email"
            placeholder="E-mail institucional"
            className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Telefone / ramal"
            className="w-full p-3 rounded-full border border-[#571A00] bg-transparent focus:outline-none focus:ring-4 focus:ring-[#FEE08A]/60 transition-all duration-200"
            onChange={(e) =>
              setFormData({ ...formData, telefone: e.target.value })
            }
          />

          {/* Base */}
          <div className="bg-[#FEE08A] p-6 rounded-2xl mt-8">
            <label className="flex items-center gap-3 text-sm font-semibold mb-6 cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) =>
                  setFormData({ ...formData, aceite: e.target.checked })
                }
              />
              Confirmo que os dados informados são institucionais.
            </label>
            <button
              type="submit"
              className="w-full bg-[#571A00] text-white py-4 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Enviando...
                </>
              ) : "Solicitar acesso"}
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm">
              Já possui acesso?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-bold underline"
              >
                Entrar
              </button>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastroGoverno;
