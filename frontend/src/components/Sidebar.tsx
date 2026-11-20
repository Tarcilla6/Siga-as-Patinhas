import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Xmark,
  User,
  EditPencil,
  Settings,
  Accessibility,
  ShieldCheck,
  ChatBubble,
  HelpCircle,
  RefreshDouble,
  LogOut,
  NavArrowRight,
} from 'iconoir-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  perfilAtivo?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  perfilAtivo = 'Responsável · ONG Patas do Bem',
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Perfil Pessoal', path: '/perfil' },
    { icon: EditPencil, label: 'Editar meu perfil', path: '/editar-perfil' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
    { icon: Accessibility, label: 'Acessibilidade', path: '/acessibilidade' },
    { icon: ShieldCheck, label: 'Privacidade', path: '/privacidade' },
    { icon: ChatBubble, label: 'FAQ', path: '/faq' },
    { icon: HelpCircle, label: 'Suporte', path: '/suporte' },
    { icon: RefreshDouble, label: 'Trocar de conta', path: '/login' },
    { icon: LogOut, label: 'Sair', path: '/' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] sm:w-[360px] bg-creme z-50 transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-destaque text-2xl font-bold text-marrom">Minha conta</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-marrom/10 transition-colors"
            >
              <Xmark className="w-6 h-6 text-marrom" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://ui-avatars.com/api/?name=Marina+Souza&background=571A00&color=FFFDDD"
                alt="Marina Souza"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-destaque font-bold text-lg text-marrom">Marina Souza</h3>
                <p className="text-sm text-marrom/80">{perfilAtivo}</p>
              </div>
            </div>
            <div className="bg-azul text-marrom text-xs font-bold px-3 py-1.5 rounded-full self-start">
              ONG PATAS DO BEM · ATIVA
            </div>
          </div>

          {/* Menu List */}
          <nav className="flex-grow space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isFirst = index === 0;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-4 transition-all duration-200 group ${
                    isFirst
                      ? 'bg-amarelo rounded-2xl'
                      : 'hover:bg-marrom/5 rounded-2xl'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <Icon className="w-6 h-6 text-marrom" />
                    <span className="font-corpo font-medium text-marrom">{item.label}</span>
                  </div>
                  <NavArrowRight className="w-5 h-5 text-marrom opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-marrom/10 text-center">
            <p className="text-xs text-marrom/60 font-corpo">
              Siga as Patinhas • Uma rede que protege
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};
