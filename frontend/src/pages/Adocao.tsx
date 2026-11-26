import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Menu,
  Search,
  FilterList,
  Heart,
  NavArrowDown,
} from 'iconoir-react';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';

interface Animal {
  id: number;
  nome: string;
  especie: string;
  idade: string;
  porte: 'Pequeno' | 'Médio' | 'Grande';
  caracteristica: string;
  distancia: number;
  status: 'DISPONÍVEL' | 'EM PROCESSO';
  foto: string;
}

const animaisMock: Animal[] = [
  { id: 1, nome: 'Amora', especie: 'Cachorra', idade: '2 anos', porte: 'Médio', caracteristica: 'Dócil', distancia: 8, status: 'DISPONÍVEL', foto: 'https://images.unsplash.com/photo-1583511655857' },
  { id: 2, nome: 'Nino', especie: 'Gato', idade: '10 meses', porte: 'Pequeno', caracteristica: 'Sociável', distancia: 3, status: 'DISPONÍVEL', foto: 'https://images.unsplash.com/photo-1514888286974' },
  { id: 3, nome: 'Bento', especie: 'Cachorro', idade: '5 anos', porte: 'Médio', caracteristica: 'Tranquilo', distancia: 12, status: 'EM PROCESSO', foto: 'https://images.unsplash.com/photo-1548199973' },
  { id: 4, nome: 'Mel', especie: 'Cachorra', idade: '1 ano', porte: 'Pequeno', caracteristica: 'Energética', distancia: 4, status: 'DISPONÍVEL', foto: 'https://images.unsplash.com/photo-1589941013453' },
  { id: 5, nome: 'Thor', especie: 'Cachorro', idade: '3 anos', porte: 'Grande', caracteristica: 'Protetor', distancia: 10, status: 'DISPONÍVEL', foto: 'https://images.unsplash.com/photo-1537151608828' },
];

export const Adocao: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [especieFiltro, setEspecieFiltro] = useState<'Todos' | 'Cachorro' | 'Gato'>('Todos');
  const [porteFiltro, setPorteFiltro] = useState<'Todos' | 'Pequeno' | 'Médio' | 'Grande'>('Todos');
  const [statusFiltro, setStatusFiltro] = useState<'Todos' | 'DISPONÍVEL' | 'EM PROCESSO'>('Todos');
  const [filtroFavoritos, setFiltroFavoritos] = useState(false);
  const [ordenacao, setOrdenacao] = useState<'Recentes' | 'Próximos'>('Recentes');
  const [showPorteFiltros, setShowPorteFiltros] = useState(false);

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const resetarFiltros = () => {
    setEspecieFiltro('Todos');
    setPorteFiltro('Todos');
    setStatusFiltro('Todos');
    setFiltroFavoritos(false);
    setSearchTerm('');
  };

  const animaisFiltrados = useMemo(() => {
    let filtrados = animaisMock.filter((a) => {
      const matchSearch = (a.nome + a.especie + a.caracteristica).toLowerCase().includes(searchTerm.toLowerCase());
      const matchEspecie = especieFiltro === 'Todos' || (especieFiltro === 'Cachorro' ? a.especie.toLowerCase().includes('cachorro') : a.especie.toLowerCase().includes('gato'));
      const matchPorte = porteFiltro === 'Todos' || a.porte === porteFiltro;
      const matchStatus = statusFiltro === 'Todos' || a.status === statusFiltro;
      const matchFavoritos = !filtroFavoritos || favoritos.includes(a.id);
      return matchSearch && matchEspecie && matchPorte && matchStatus && matchFavoritos;
    });

    if (ordenacao === 'Próximos') {
      filtrados.sort((a, b) => a.distancia - b.distancia);
    } else {
      filtrados.sort((a, b) => b.id - a.id);
    }

    return filtrados;
  }, [animaisMock, searchTerm, especieFiltro, porteFiltro, statusFiltro, filtroFavoritos, ordenacao, favoritos]);

  const pillClass = (active: boolean) => 
    `px-4 py-2 rounded-full text-xs font-bold transition-colors ${active ? 'bg-[#571A00] text-white' : 'bg-[#AFCFFE]/20 text-[#571A00]'}`;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />


      <header className="flex justify-between items-center p-4">
        <button onClick={() => navigate(-1)}><ArrowLeft className="text-[#571A00]" /></button>
        <button onClick={() => setIsSidebarOpen(true)}><Menu className="text-[#571A00]" /></button>
      </header>

      <main className="px-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="bg-[#FEE08A] text-[#571A00] text-[10px] font-bold px-3 py-1 rounded-full">ADOÇÃO RESPONSÁVEL</span>
            <h1 className="text-2xl font-bold text-[#571A00] mt-2 font-serif">Encontre sua patinha</h1>
          </div>
          <button 
            onClick={() => setFiltroFavoritos(!filtroFavoritos)}
            className={`${filtroFavoritos ? 'bg-[#571A00] text-white' : 'bg-[#AFCFFE] text-[#571A00]'} text-xs font-bold px-3 py-2 rounded-full`}
          >
            {favoritos.length} FAVORITOS
          </button>
        </div>

        <div className="relative flex items-center mb-6 gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nome, espécie ou características"
            className="w-full pl-12 pr-4 py-3 rounded-full border border-[#571A00]/20 bg-white"
          />
          <Search className="absolute left-4 text-[#571A00]" />
          <button onClick={() => setShowPorteFiltros(!showPorteFiltros)} className="p-3 bg-[#FEE08A] rounded-full text-[#571A00]">
            <FilterList />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {(['Todos', 'Cachorro', 'Gato'] as const).map(e => (
            <button key={e} onClick={() => setEspecieFiltro(e)} className={pillClass(especieFiltro === e)}>{e.toUpperCase()}</button>
          ))}
          <button onClick={() => setStatusFiltro(statusFiltro === 'DISPONÍVEL' ? 'Todos' : 'DISPONÍVEL')} className={pillClass(statusFiltro === 'DISPONÍVEL')}>DISPONÍVEIS</button>
        </div>
        
        {showPorteFiltros && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(['Todos', 'Pequeno', 'Médio', 'Grande'] as const).map(p => (
              <button key={p} onClick={() => setPorteFiltro(p)} className={pillClass(porteFiltro === p)}>PORTE {p.toUpperCase()}</button>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center text-xs text-[#571A00] mb-6 font-bold">
          <span>{animaisFiltrados.length} animais encontrados</span>
          <button onClick={() => setOrdenacao(ordenacao === 'Recentes' ? 'Próximos' : 'Recentes')} className="flex items-center gap-1">
            Mais {ordenacao === 'Recentes' ? 'recentes' : 'próximos'} <NavArrowDown className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {animaisFiltrados.length > 0 ? (
            animaisFiltrados.map((animal) => (
              <div key={animal.id} className="bg-white p-3 rounded-3xl border border-[#571A00]/20 flex gap-4">
                <div className="relative w-24 h-24 shrink-0">
                  <img src={animal.foto} className="w-full h-full object-cover rounded-2xl" alt={animal.nome} />
                  <button onClick={() => toggleFavorito(animal.id)} className={`absolute top-1 right-1 p-1 rounded-full bg-white/80 transition-transform ${favoritos.includes(animal.id) ? 'scale-110' : ''}`}>
                    <Heart className={`w-5 h-5 ${favoritos.includes(animal.id) ? 'fill-red-500 text-red-500' : 'text-[#571A00]'}`} />
                  </button>
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#571A00] text-lg">{animal.nome}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${animal.status === 'DISPONÍVEL' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{animal.status}</span>
                    </div>
                    <p className="text-xs text-[#571A00]/70">{animal.especie} • {animal.idade} • {animal.porte} • {animal.distancia} km</p>
                  </div>
                  <button className="px-4 py-1.5 rounded-full text-xs font-bold border border-[#571A00]/20 text-[#571A00]">
                    {animal.status === 'DISPONÍVEL' ? 'Conhecer' : 'Acompanhar'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-[#571A00] font-bold mb-4">Nenhum animal encontrado com esses filtros.</p>
              <button onClick={resetarFiltros} className="bg-[#571A00] text-white px-6 py-2 rounded-full font-bold">Limpar todos os filtros</button>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
