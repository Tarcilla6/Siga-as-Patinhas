import React from 'react';

export interface BadgeProps {
  status: 'disponivel' | 'em-analise' | 'equipe-acionada' | 'concluido' | ' gratuito' | 'gratuito' | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const formatStatus = (st: string) => {
    switch (st.toLowerCase()) {
      case 'disponivel':
        return 'DISPONÍVEL';
      case 'em-analise':
      case 'em análise':
        return 'EM ANÁLISE';
      case 'equipe-acionada':
      case 'equipe acionada':
        return 'EQUIPE ACIONADA';
      case 'concluido':
      case 'concluído':
        return 'CONCLUÍDO';
      case 'gratuito':
      case ' gratuito':
        return 'GRATUITO';
      default:
        return st.toUpperCase();
    }
  };

  let colorStyles = "bg-amarelo text-marrom border-marrom";

  const lower = status.toLowerCase().trim();
  if (lower === 'em-analise' || lower === 'em análise') {
    colorStyles = "bg-amarelo text-marrom border-marrom";
  } else if (lower === 'equipe-acionada' || lower === 'equipe acionada') {
    colorStyles = "bg-azul text-marrom border-marrom";
  } else if (lower === 'concluido' || lower === 'concluído') {
    colorStyles = "bg-marrom text-creme border-marrom";
  } else if (lower === 'gratuito') {
    colorStyles = "bg-creme text-marrom border-marrom shadow-sm";
  } else if (lower === 'disponivel' || lower === 'disponível') {
    colorStyles = "bg-amarelo text-marrom border-marrom";
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colorStyles} ${className}`}>
      {formatStatus(status)}
    </span>
  );
};
