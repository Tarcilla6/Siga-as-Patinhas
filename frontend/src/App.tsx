import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeCompartilhada from './pages/HomeCompartilhada';
import Eventos from './pages/Eventos';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginOngCuidador from './pages/LoginOngCuidador';
import { CadastroCidadao } from './pages/CadastroCidadao';
import CadastroOng from './pages/CadastroOng';
import CadastroGoverno from './pages/CadastroGoverno';
import { CadastroEscolha } from './pages/CadastroEscolha';
import { CadastroCuidador } from './pages/CadastroCuidador';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<HomeCompartilhada />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/cuidado" element={<LoginOngCuidador />} />
        <Route path="/cadastro" element={<CadastroEscolha />} />
        <Route path="/cadastro/cidadao" element={<CadastroCidadao />} />
        <Route path="/cadastro/cuidador" element={<CadastroCuidador />} />
        <Route path="/cadastro/ong" element={<CadastroOng />} />
        <Route path="/cadastro/governo" element={<CadastroGoverno />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
