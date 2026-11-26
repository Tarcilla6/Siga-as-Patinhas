import React, { useState, useEffect } from "react";
import {
  Menu,
  Heart,
  ShieldAlert,
  Home,
  Calendar,
  HelpCircle,
  User,
  NavArrowRight,
  ArrowLeft,
  Xmark,
  MapPin,
  Clock,
} from "iconoir-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { BottomNav } from "../components/BottomNav";

export interface EventoDTO {
  id: string;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  vagas: number;
  tipo: "CASTRAÇÃO" | "VACINAÇÃO" | "ADOÇÃO" | "OUTRAS";
  corFundo: string;
}

// Coloque a imagem em frontend/public/destaque.jpg (ou troque por uma URL direta de imagem)
const IMAGEM_DESTAQUE =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=300&q=80";

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
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#571A00] text-[#FEE08A] px-6 py-3 rounded-full shadow-lg font-bold text-sm">
      {message}
    </div>
  );
};

export const Eventos: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("TODOS");
  const [toast, setToast] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventoDTO | null>(null);

  const filters = ["TODOS", "CASTRAÇÃO", "VACINAÇÃO", "ADOÇÃO", "OUTRAS"];

  // TODO: Integrar com GET /api/eventos e POST /api/eventos/{id}/inscricao do backend Java
  const [destaque, setDestaque] = useState<EventoDTO>({
    id: "destaque",
    titulo: "Feira no Parque das Flores",
    data: "12 OUT",
    hora: "10h — 16h",
    local: "Av. das Acácias, 400",
    vagas: 24,
    tipo: "ADOÇÃO",
    corFundo: "#AFCFFE",
  });

  const [eventos, setEventos] = useState<EventoDTO[]>([
    {
      id: "1",
      titulo: "Mutirão de castração",
      data: "16 OUT",
      hora: "8h",
      local: "UBS Vila Mariana",
      vagas: 7,
      tipo: "CASTRAÇÃO",
      corFundo: "#FEE08A",
    },
    {
      id: "2",
      titulo: "Vacinação antirrábica",
      data: "18 OUT",
      hora: "9h",
      local: "Centro Comunitário Mooca",
      vagas: 32,
      tipo: "VACINAÇÃO",
      corFundo: "#AFCFFE",
    },
    {
      id: "3",
      titulo: "Feira de adoção",
      data: "26 OUT",
      hora: "10h",
      local: "Praça do Sol",
      vagas: 0,
      tipo: "ADOÇÃO",
      corFundo: "#FFFDDD",
    },
    {
        id: "4",
        titulo: "Palestra de Posse Responsável",
        data: "29 OUT",
        hora: "14h",
        local: "Biblioteca Municipal",
        vagas: 40,
        tipo: "OUTRAS",
        corFundo: "#FEE08A",
      },

  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const eventosFiltrados = eventos.filter(
    (ev) => activeFilter === "TODOS" || ev.tipo === activeFilter,
  );

  const handleConfirmarPresenca = () => {
    if (!selectedEvent || selectedEvent.vagas <= 0) return;

    if (selectedEvent.id === "destaque") {
      setDestaque((prev) => ({ ...prev, vagas: prev.vagas - 1 }));
    } else {
      setEventos((prev) =>
        prev.map((ev) =>
          ev.id === selectedEvent.id ? { ...ev, vagas: ev.vagas - 1 } : ev,
        ),
      );
    }

    setToast("Presença confirmada! Te esperamos lá 🐾");
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDDD] flex flex-col font-sans text-[#571A00]">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <header className="w-full bg-[#571A00] px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/inicio")}
          className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="text-[#571A00]" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center">
            <span className="text-xl">🐾</span>
          </div>
          <div className="text-[#FFFDDD] font-bold text-lg font-serif leading-tight">
            Siga as
            <br />
            Patinhas
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 rounded-full bg-[#FEE08A] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Menu className="text-[#571A00]" />
        </button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-grow w-full max-w-[760px] mx-auto px-5 py-6 pb-28">
        <div className="bg-[#FEE08A] text-[#571A00] px-3 py-1 rounded-full text-[10px] font-bold w-fit mb-3">
          AGENDA DA COMUNIDADE
        </div>
        <h1 className="text-3xl font-bold font-serif mb-2">
          Ações perto de você
        </h1>
        <p className="text-sm mb-6">
          Encontre cuidado, vacinação, adoção e mobilização cidadã.
        </p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                activeFilter === f
                  ? "bg-[#571A00] text-[#FFFDDD]"
                  : "bg-[#FEE08A] text-[#571A00]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="h-40 bg-[#571A00]/10 animate-pulse rounded-2xl mb-8" />
        ) : (
          <div className="bg-[#AFCFFE] rounded-2xl p-4 flex gap-4 mb-8 border border-[#571A00]/20">
            <img
              src={IMAGEM_DESTAQUE}
              alt="Evento"
              className="w-24 h-24 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1">
              <div className="flex gap-2 mb-2">
                <span className="bg-[#571A00] text-[#FFFDDD] text-[8px] font-bold px-2 py-0.5 rounded">
                  DESTAQUE
                </span>
                <span className="bg-white text-[#571A00] text-[8px] font-bold px-2 py-0.5 rounded">
                  GRATUITO
                </span>
              </div>
              <h3 className="font-bold font-serif text-lg leading-tight mb-1">
                {destaque.titulo}
              </h3>
              <p className="text-[10px] mb-2">
                12 out · {destaque.hora} · {destaque.local} ·{" "}
                {destaque.vagas > 0 ? `${destaque.vagas} vagas` : "Esgotado"}
              </p>
              <button
                onClick={() => setSelectedEvent(destaque)}
                className="bg-[#571A00] text-[#FFFDDD] px-4 py-1.5 rounded-full text-xs font-bold transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif font-bold text-lg">
            PRÓXIMAS DATAS / Programação
          </h2>
          <span className="text-xs font-bold text-[#571A00]/70">
            Outubro 2026
          </span>
        </div>

        <div className="space-y-4">
          {eventosFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-[#571A00] font-medium mb-4">
                Nenhum evento encontrado nesta categoria
              </p>
              <button
                onClick={() => setActiveFilter("TODOS")}
                className="bg-[#571A00] text-[#FFFDDD] px-6 py-2 rounded-xl font-bold hover:opacity-90"
              >
                Ver todos os eventos
              </button>
            </div>
          ) : (
            eventosFiltrados.map((ev) => {
              const [dia, mes] = ev.data.split(" ");
              return (
                <div
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  style={{ backgroundColor: ev.corFundo }}
                  className="flex items-center p-4 rounded-2xl border border-[#571A00] transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <div className="bg-[#571A00] text-[#FFFDDD] text-center p-2 rounded-xl mr-4 min-w-[50px]">
                    <div className="font-bold text-lg">{dia}</div>
                    <div className="text-[10px] font-bold">{mes}</div>
                  </div>
                  <div className="flex-1">
                    <span className="text-[8px] font-bold uppercase bg-white px-2 py-0.5 rounded-full border border-[#571A00]">
                      {ev.tipo}
                    </span>
                    <h4 className="font-bold font-serif mt-1">{ev.titulo}</h4>
                    <p className="text-[10px]">
                      {ev.local} · {ev.hora}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold block">
                      {ev.vagas > 0 ? `${ev.vagas} vagas` : "Esgotado"}
                    </span>
                    <NavArrowRight className="w-5 h-5 ml-auto" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <BottomNav />

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-[#FFFDDD] border-2 border-[#571A00] p-6 rounded-3xl w-full max-w-sm relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FEE08A] flex items-center justify-center cursor-pointer"
            >
              <Xmark className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-bold uppercase bg-[#FEE08A] px-2 py-0.5 rounded-full border border-[#571A00]">
              {selectedEvent.tipo}
            </span>
            <h2 className="text-xl font-bold font-serif mt-2 mb-4">
              {selectedEvent.titulo}
            </h2>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{selectedEvent.local}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {selectedEvent.data} às {selectedEvent.hora}
                </span>
              </div>
            </div>
            <button
              onClick={handleConfirmarPresenca}
              disabled={selectedEvent.vagas <= 0}
              className="w-full bg-[#571A00] text-[#FFFDDD] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {selectedEvent.vagas > 0
                ? "Confirmar presença"
                : "Vagas esgotadas"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;
