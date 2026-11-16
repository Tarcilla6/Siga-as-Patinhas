import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar for Desktop & Mobile drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="text-xl font-bold text-white">SGP Admin</span>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="md:hidden text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <a href="#dashboard" className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium">
            Dashboard
          </a>
          <a href="#users" className="flex items-center px-4 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
            Usuários
          </a>
          <a href="#settings" className="flex items-center px-4 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
            Configurações
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link 
            to="/" 
            className="flex items-center justify-center w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors"
          >
            ← Voltar ao Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-40">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Painel Administrativo</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-700">Administrador</div>
              <div className="text-xs text-gray-500">admin@sgp.com</div>
            </div>
            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Receita Total</div>
              <div className="text-2xl font-bold text-gray-900 mt-2">R$ 45.850,00</div>
              <div className="text-xs text-emerald-600 mt-1 font-semibold">+12% este mês</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Usuários Ativos</div>
              <div className="text-2xl font-bold text-gray-900 mt-2">1.240</div>
              <div className="text-xs text-emerald-600 mt-1 font-semibold">+5% esta semana</div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sm:col-span-2 lg:col-span-1">
              <div className="text-sm font-medium text-gray-500">Conversão</div>
              <div className="text-2xl font-bold text-gray-900 mt-2">3.4%</div>
              <div className="text-xs text-rose-600 mt-1 font-semibold">-0.2% ontem</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Visão Geral do Sistema</h3>
            <div className="h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              [Gráfico de Atividades do Sistema]
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
