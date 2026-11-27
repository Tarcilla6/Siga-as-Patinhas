import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Menu,
  Heart,
  MapPin,
  Check,
  HomeSimple,
  NavArrowRight,
} from "iconoir-react";
import { Sidebar } from "../components/Sidebar";

interface AnimalDetalheDTO {
  id: string;
  name: string;
  specie: string;
  age: string;
  size: string;
  status: "DISPONÍVEL" | "EM PROCESSO";
  distance: string;
  traits: string[];
  history: string;
  orgName: string;
  orgInfo: string;
  photos: string[];
}

// TODO: Integrar com GET /api/animais/{id} e POST /api/adocoes/interesse do backend Java
export const animaisData: Record<string, AnimalDetalheDTO> = {
  amora: {
    id: "amora",
    name: "Amora",
    specie: "Cachorra",
    age: "2 anos",
    size: "Porte médio",
    status: "DISPONÍVEL",
    distance: "Vila Mariana · 8 km",
    traits: ["CARINHOSA", "SOCIÁVEL", "BRINCALHONA"],
    history:
      "Resgatada em um jardim comunitário, Amora se recuperou e hoje ama passeios tranquilos e companhia.",
    orgName: "Instituto Patas do Bairro",
    orgInfo: "Organização verificada · Responde em até 1 dia",
    photos: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    ],
  },
  nino: {
    id: "nino",
    name: "Nino",
    specie: "Gato",
    age: "10 meses",
    size: "Porte pequeno",
    status: "DISPONÍVEL",
    distance: "Pinheiros · 3 km",
    traits: ["CURIOSO", "CALMO", "DORMINHOCO"],
    history:
      "Nino foi encontrado em um dia chuvoso e agora busca um lar quentinho.",
    orgName: "Gatos & Cia",
    orgInfo: "Organização verificada · Responde em até 2 dias",
    photos: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    ],
  },
  bento: {
    id: "bento",
    name: "Bento",
    specie: "Cachorro",
    age: "5 anos",
    size: "Porte médio",
    status: "EM PROCESSO",
    distance: "Jardins · 12 km",
    traits: ["TRANQUILO", "LEAL", "CARINHOSO"],
    history:
      "Bento foi resgatado com 5 anos e hoje é um companheiro fiel que adora caminhadas calmas e muito carinho.",
    orgName: "Abrigo Amigo Fiel",
    orgInfo: "Organização verificada · Responde em até 1 dia",
    photos: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
    ],
  },
  mel: {
    id: "mel",
    name: "Mel",
    specie: "Cachorra",
    age: "1 ano",
    size: "Porte pequeno",
    status: "DISPONÍVEL",
    distance: "Moema · 4 km",
    traits: ["ALEGRE", "BRINCALHONA", "DÓCIL"],
    history:
      "Mel é uma filhote cheia de energia que adora correr e brincar com todos que encontra pelo caminho.",
    orgName: "Instituto Patas do Bairro",
    orgInfo: "Organização verificada · Responde em até 1 dia",
    photos: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
    ],
  },
  thor: {
    id: "thor",
    name: "Thor",
    specie: "Cachorro",
    age: "3 anos",
    size: "Porte grande",
    status: "DISPONÍVEL",
    distance: "Itaim Bibi · 10 km",
    traits: ["GENTIL", "INTELIGENTE", "CORAJOSO"],
    history: "Thor é um gigante gentil que adora brincar de buscar.",
    orgName: "Instituto Patas do Bairro",
    orgInfo: "Organização verificada · Responde em até 1 dia",
    photos: [
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80",
    ],
  },
};

const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#571A00] text-[#FEE08A] border border-[#FEE08A] px-6 py-3 rounded-full shadow-xl font-bold text-sm text-center">
      {message}
    </div>
  );
};

export const PerfilAnimal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const animal = animaisData[id || "amora"] || animaisData.amora;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mainPhoto, setMainPhoto] = useState(animal.photos[0]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMainPhoto(animal.photos[0]);
  }, [animal]);

  const handleFavorite = () => {
    const nextState = !isFavorited;
    setIsFavorited(nextState);
    setToast(
      nextState ? "Adicionado aos favoritos!" : "Removido dos favoritos!",
    );
  };

  const handleInterest = () => {
    setIsModalOpen(false);
    setToast(
      `Interesse em ${animal.name} registrado! A ONG entrará em contato 🐾`,
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF2] font-sans">
      <header className="bg-[#571A00] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-[#FEE08A] p-2 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="text-[#571A00]" />
        </button>
        <div className="text-center leading-tight">
          <span className="block text-[10px] text-[#FEE08A] uppercase tracking-wider font-bold">
            Siga as Patinhas
          </span>
          <h1 className="text-white font-serif font-bold text-lg">
            Perfil do animal
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="bg-[#FEE08A] p-2 rounded-full cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <Menu className="text-[#571A00]" />
        </button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="max-w-5xl mx-auto px-6 py-8 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna Esquerda: Galeria */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[#571A00]/20">
            <img
              src={mainPhoto}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-[#571A00] ${
                animal.status === "DISPONÍVEL" ? "bg-[#FEE08A]" : "bg-[#AFCFFE]"
              }`}
            >
              {animal.status}
            </span>
            <button
              type="button"
              onClick={handleFavorite}
              className="absolute bottom-4 right-4 bg-white/95 p-3 rounded-full shadow-md active:scale-125 transition cursor-pointer"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorited
                    ? "fill-[#571A00] text-[#571A00]"
                    : "text-[#571A00]"
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {animal.photos.slice(0, 2).map((photo, index) => (
              <img
                key={index}
                src={photo}
                onClick={() => setMainPhoto(photo)}
                alt={`${animal.name} foto ${index + 1}`}
                className={`rounded-2xl aspect-square object-cover cursor-pointer transition-all ${
                  mainPhoto === photo
                    ? "ring-2 ring-[#571A00] opacity-100"
                    : "opacity-75 hover:opacity-100"
                }`}
              />
            ))}
            <button
              type="button"
              onClick={() => setMainPhoto(animal.photos[2] || animal.photos[0])}
              className="bg-[#AFCFFE] rounded-2xl aspect-square flex items-center justify-center font-bold text-[#571A00] text-sm cursor-pointer hover:brightness-95 transition active:scale-95"
            >
              +4 fotos
            </button>
          </div>
        </div>

        {/* Coluna Direita: Informações */}
        <div className="lg:col-span-6 space-y-5">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#571A00]">
              {animal.name}
            </h2>
            <div className="flex items-center gap-1 text-[#571A00] text-sm font-medium shrink-0 mt-2">
              <MapPin className="w-4 h-4" /> {animal.distance}
            </div>
          </div>

          <p className="text-[#571A00] text-sm font-medium">
            {animal.specie} · {animal.age} · {animal.size} · Castrada
          </p>

          <div className="flex flex-wrap gap-2">
            {animal.traits.map((trait, index) => (
              <span
                key={trait}
                className={`px-3 py-1 rounded-full text-xs font-bold text-[#571A00] ${
                  index === 0
                    ? "bg-[#FEE08A]"
                    : index === 1
                      ? "bg-[#AFCFFE]"
                      : "bg-white border border-[#571A00]"
                }`}
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 text-[#571A00] text-sm font-medium">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4" /> Vacinas em dia
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4" /> Vive bem com cães
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg text-[#571A00] mb-1">
              História & cuidados
            </h3>
            <p className="text-sm text-[#571A00]">{animal.history}</p>
          </div>

          <div className="bg-white border border-[#571A00]/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="bg-[#FEE08A] p-2 rounded-full">
              <HomeSimple className="w-5 h-5 text-[#571A00]" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase text-[#571A00]/60">
                Responsável
              </span>
              <p className="font-bold text-[#571A00]">{animal.orgName}</p>
              <p className="text-xs text-[#571A00]/80">{animal.orgInfo}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (animal.status === "EM PROCESSO") {
                setToast("Função em desenvolvimento nesta versão MVP. Contate os desenvolvedores para mais detalhes. 🚧");
              } else {
                setIsModalOpen(true);
              }
            }}
            className="w-full bg-[#571A00] text-[#FFFDDD] py-4 rounded-full font-bold flex items-center justify-center gap-2 transition hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Heart className="w-5 h-5" />{" "}
            {animal.status === "EM PROCESSO"
              ? `Acompanhar processo do ${animal.name}`
              : `Tenho interesse na ${animal.name}`}{" "}
            <NavArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-[#571A00]/70 text-center">
            Demonstrar interesse não garante a adoção. A equipe fará uma
            conversa responsável.
          </p>
        </div>
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#FFFDF2] border-2 border-[#571A00] p-6 rounded-3xl max-w-sm w-full text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif font-bold text-xl text-[#571A00] mb-2">
              Confirmar interesse?
            </h3>
            <p className="text-sm text-[#571A00] mb-6">
              Você está prestes a manifestar interesse na adoção de{" "}
              {animal.name}.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 border border-[#571A00] rounded-full font-bold text-sm text-[#571A00] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleInterest}
                className="flex-1 py-3 bg-[#571A00] text-[#FFFDDD] rounded-full font-bold text-sm cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default PerfilAnimal;
