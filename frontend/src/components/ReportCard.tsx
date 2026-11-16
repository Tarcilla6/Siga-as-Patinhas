import React from 'react';
import { Badge } from './Badge';
import { Button } from './Button';
import { ArrowRight } from 'iconoir-react';

interface ReportCardProps {
  reportId: string; // ex: "#SP-2401"
  status: string; // ex: "Em análise"
  title: string; // ex: "Animal sem abrigo adequado"
  locationAndTime: string; // ex: "Vila Mariana • Hoje, 09:42"
  onAcompanhar?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  reportId,
  status,
  title,
  locationAndTime,
  onAcompanhar
}) => {
  return (
    <div className="bg-azul rounded-2xl border border-marrom p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 max-w-md">
      <div className="flex items-center justify-between">
        <span className="font-destaque font-bold text-marrom text-sm">{reportId}</span>
        <Badge status={status} />
      </div>

      <div className="space-y-1">
        <h3 className="font-destaque font-bold text-marrom text-xl tracking-tight">{title}</h3>
        <p className="text-marrom/80 text-xs font-corpo">{locationAndTime}</p>
      </div>

      <div>
        <Button 
          variant="secondary" 
          onClick={onAcompanhar}
          className="bg-creme hover:bg-white text-marrom border-marrom font-semibold"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Acompanhar
        </Button>
      </div>
    </div>
  );
};
