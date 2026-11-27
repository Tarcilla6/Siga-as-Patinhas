import { Header } from "../components/Header";

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Menu, Search, Heart } from "iconoir-react";
import { Sidebar } from "../components/Sidebar";
import { BottomNav } from "../components/BottomNav";

interface Animal {
  id: number;
  nome: string;
  especie: string;
  idade: string;
  porte: "Pequeno" | "Médio" | "Grande";
  distancia: number;
  status: "DISPONÍVEL" | "EM PROCESSO";
  foto: string;
}

const getAnimalSlug = (id: number) => {
    const map: Record<number, string> = {
      1: "amora",
      2: "nino",
      3: "bento",
      4: "mel",
      5: "thor",
    };
    return map[id] || id.toString();
  };
const animaisMock: Animal[] = [
  {
    id: 1,
    nome: "Amora",
    especie: "Cachorra",
    idade: "2 anos",
    porte: "Médio",
    distancia: 8,
    status: "DISPONÍVEL",
    foto: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    nome: "Nino",
    especie: "Gato",
    idade: "10 meses",
    porte: "Pequeno",
    distancia: 3,
    status: "DISPONÍVEL",
    foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    nome: "Bento",
    especie: "Cachorro",
    idade: "5 anos",
    porte: "Médio",
    distancia: 12,
    status: "EM PROCESSO",
    foto: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    nome: "Mel",
    especie: "Cachorra",
    idade: "1 ano",
    porte: "Pequeno",
    distancia: 4,
    status: "DISPONÍVEL",
    foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    nome: "Thor",
    especie: "Cachorro",
    idade: "3 anos",
    porte: "Grande",
    distancia: 10,
    status: "DISPONÍVEL",
    foto: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=300&q=80",
  },
];

export const Adocao: React.FC = () => {
  const [filtro, setFiltro] = useState("TODOS");
  const [showFavoritos, setShowFavoritos] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const animaisFiltrados = useMemo(() => {
    let filtrados = animaisMock;

    if (showFavoritos) {
      filtrados = filtrados.filter((a) => favoritos.includes(a.id));
    }

    if (filtro !== "TODOS") {
      if (["CÃES", "GATOS"].includes(filtro)) {
        filtrados = filtrados.filter((a) =>
          filtro === "CÃES"
            ? a.especie.toLowerCase().includes("cachorr")
            : a.especie.toLowerCase().includes("gato"),
        );
      } else if (["PEQUENO", "MÉDIO", "GRANDE"].includes(filtro)) {
        filtrados = filtrados.filter((a) => a.porte.toUpperCase() === filtro);
      } else if (filtro === "DISPONÍVEIS") {
        filtrados = filtrados.filter((a) => a.status === "DISPONÍVEL");
      }
    }

    return filtrados.filter((a) =>
      (a.nome + a.especie).toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, filtro, showFavoritos, favoritos]);

  return (
    <div className="min-h-screen bg-[#FFFDF2] flex flex-col">
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-6 pb-28">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 mr-4">
            <input
              type="text"
              placeholder="Buscar amigo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#571A00] rounded-full py-3 px-12 outline-none text-[#571A00]"
            />
            <Search className="absolute left-4 top-3.5 text-[#571A00]" />
          </div>
          <button
            onClick={() => setShowFavoritos(!showFavoritos)}
            className={`px-4 py-2 rounded-full font-bold text-sm border border-[#571A00] ${showFavoritos ? "bg-[#571A00] text-[#FFFDDD]" : "bg-white text-[#571A00]"}`}
          >
            FAVORITOS ({favoritos.length})
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {[
            "TODOS",
            "CÃES",
            "GATOS",
            "PEQUENO",
            "MÉDIO",
            "GRANDE",
            "DISPONÍVEIS",
          ].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${filtro === f ? "bg-[#571A00] text-[#FFFDDD]" : "bg-white text-[#571A00] border-[#571A00]"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {animaisFiltrados.map((animal) => (
            <div
              key={animal.id}
              onClick={() =>
                navigate(`/animal/${getAnimalSlug(animal.id)}`)
              }
              className="bg-[#FFFDF2] border border-[#571A00] rounded-2xl p-4 flex gap-4 items-center cursor-pointer"
            >
              <div className="relative w-28 h-28 shrink-0">
                <img
                  src={animal.foto}
                  alt={animal.nome}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(animal.id);
                  }}
                  className="absolute top-1 right-1 bg-[#FFFDF2] p-1.5 rounded-full border border-[#571A00]"
                >
                  <Heart
                    className={`w-4 h-4 ${favoritos.includes(animal.id) ? "fill-[#571A00]" : ""}`}
                  />
                </button>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-[#571A00] text-xl">
                    {animal.nome}
                  </h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                    style={{
                      backgroundColor:
                        animal.status === "DISPONÍVEL" ? "#FEE08A" : "#AFCFFE",
                    }}
                  >
                    {animal.status}
                  </span>
                </div>
                <p className="text-[#571A00] text-xs">
                  {animal.especie} • {animal.idade} • {animal.porte} •{" "}
                  {animal.distancia} km
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/animal/${getAnimalSlug(animal.id)}`);
                  }}
                  className={`mt-2 py-2 px-5 rounded-full text-xs font-bold w-fit ${animal.status === "DISPONÍVEL" ? "bg-[#571A00] text-[#FFFDDD]" : "bg-white border border-[#571A00] text-[#571A00]"}`}
                >
                  {animal.status === "DISPONÍVEL"
                    ? "Conhecer >"
                    : "Acompanhar >"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
