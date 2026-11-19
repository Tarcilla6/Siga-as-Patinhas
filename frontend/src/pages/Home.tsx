import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFDDD] text-[#571A00] flex flex-col items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-[420px] bg-[#FFFDDD] flex flex-col justify-center px-4 sm:px-6 py-6 relative">
        
        {/* Topo / Logo */}
        <div className="flex flex-col items-center">
          <div className="w-[240px] sm:w-[280px] max-w-full flex items-center justify-center mb-4 sm:mb-5">
            <img 
              src="/logo.svg" 
              alt="Siga as Patinhas Logo" 
              className="w-full h-auto object-contain drop-shadow-md"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.innerHTML = '<span class="font-destaque font-bold text-4xl sm:text-5xl text-[#571A00]">🐾 Siga as Patinhas</span>';
                }
              }}
            />
          </div>

          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#AFCFFE] border border-[#571A00]/20 mb-4 shadow-sm">
            <span className="font-corpo font-bold text-xs uppercase tracking-wider text-[#571A00]">
              UMA REDE QUE PROTEGE
            </span>
          </div>

          <div className="text-center space-y-2 px-2">
            <h1 className="font-destaque font-bold text-3xl sm:text-4xl text-[#571A00] leading-tight">
              Seja Bem-vindo!
            </h1>
            <p className="font-corpo text-sm md:text-base text-[#571A00]/90 leading-relaxed max-w-[360px] mx-auto" style={{ fontFamily: 'Montserrat Alternates, sans-serif' }}>
              Entre para cuidar, conectar e transformar a vida dos animais da sua cidade.
            </p>
          </div>
        </div>

        {/* Ações centrais e inferiores */}
        <div className="flex flex-col space-y-4 sm:space-y-5 w-full pt-6">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#571A00] text-white font-corpo font-bold text-base shadow-lg hover:bg-[#683117] transition-all transform active:scale-95 flex items-center justify-center cursor-pointer"
          >
            Entrar
          </button>

          <div className="flex flex-col items-center space-y-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="font-corpo font-semibold text-sm text-[#571A00] hover:underline cursor-pointer"
            >
              Entre com visitante
            </button>

            <div className="text-center">
              <span className="font-corpo text-xs text-[#571A00]/70">Entre com</span>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full bg-white border border-[#571A00]/30 shadow-sm flex items-center justify-center gap-2 hover:bg-[#FFF] hover:border-[#571A00] transition-all cursor-pointer"
                title="Entrar com Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z" />
                </svg>
                <span className="font-corpo font-semibold text-xs text-[#571A00]">Google</span>
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full bg-white border border-[#571A00]/30 shadow-sm flex items-center justify-center gap-2 hover:bg-[#FFF] hover:border-[#571A00] transition-all cursor-pointer"
                title="Entrar com Facebook"
              >
                <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-corpo font-semibold text-xs text-[#571A00]">Facebook</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <p className="font-corpo text-xs text-[#571A00]">
              Ainda não faz parte?{' '}
              <button 
                onClick={() => navigate('/cadastro')}
                className="font-bold underline hover:text-[#683117] transition-colors cursor-pointer"
              >
                Criar cadastro
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;



