import React from 'react';
import { AdminSectionType } from '../../types';

interface AdminOverviewProps {
  totalTemplates: number;
  totalMogrts: number;
  totalChromaKey: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  onNavigateToSection: (section: AdminSectionType) => void;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
  action?: () => void;
  actionLabel?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass, action, actionLabel }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${colorClass} transition-all hover:shadow-xl hover:scale-105`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${colorClass.replace('border-', 'bg-').replace('-500', '-100')}`}>
        <i className={`${icon} ${colorClass.replace('border-', 'text-').replace('bg-', 'text-')} text-2xl`}></i>
      </div>
    </div>
    {action && actionLabel && (
        <button 
            onClick={action}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
            {actionLabel} <i className="fas fa-arrow-right text-xs ml-1"></i>
        </button>
    )}
  </div>
);

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  totalTemplates,
  totalMogrts,
  totalChromaKey,
  totalOrders,
  totalUsers,
  totalRevenue,
  onNavigateToSection
}) => {
  const stats = [
    { title: 'Templates Broadcast', value: totalTemplates, icon: 'fas fa-tv', colorClass: 'border-blue-500', action: () => onNavigateToSection('manageTemplates'), actionLabel: "Gerenciar Templates" },
    { title: 'Mockups .MOGRT', value: totalMogrts, icon: 'fas fa-film', colorClass: 'border-indigo-500', action: () => onNavigateToSection('manageMogrts'), actionLabel: "Gerenciar .MOGRTs" },
    { title: 'Cenários ChromaKey', value: totalChromaKey, icon: 'fas fa-video', colorClass: 'border-teal-500', action: () => onNavigateToSection('manageChromaKey'), actionLabel: "Gerenciar Chroma Key" },
    { title: 'Total de Pedidos', value: totalOrders, icon: 'fas fa-receipt', colorClass: 'border-green-500', action: () => onNavigateToSection('manageOrders'), actionLabel: "Ver Pedidos" },
    { title: 'Usuários Cadastrados', value: totalUsers, icon: 'fas fa-users', colorClass: 'border-yellow-500', action: () => onNavigateToSection('manageUsers'), actionLabel: "Gerenciar Usuários" },
    { title: 'Receita Total (Simulada)', value: `R$ ${totalRevenue.toFixed(2).replace('.',',')}`, icon: 'fas fa-dollar-sign', colorClass: 'border-pink-500', action: () => onNavigateToSection('reportsAnalytics'), actionLabel: "Ver Relatórios" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(stat => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <button onClick={() => onNavigateToSection('manageTemplates')} className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-blue-700 font-medium transition-colors">
                <i className="fas fa-plus-circle mr-2"></i> Adicionar Novo Template Broadcast
            </button>
            <button onClick={() => onNavigateToSection('manageCoupons')} className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-blue-700 font-medium transition-colors">
                <i className="fas fa-tags mr-2"></i> Criar Novo Cupom de Desconto
            </button>
            <button onClick={() => onNavigateToSection('siteSettings')} className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-blue-700 font-medium transition-colors">
                <i className="fas fa-cog mr-2"></i> Configurações Gerais do Site
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Atividade Recente (Simulação)</h3>
            <ul className="space-y-3 text-sm">
                <li className="p-2 bg-green-50 text-green-700 rounded-md">Novo Pedido #ORD-12346 de Usuário Exemplo.</li>
                <li className="p-2 bg-blue-50 text-blue-700 rounded-md">Novo Usuário 'joana.silva@email.com' cadastrado.</li>
                <li className="p-2 bg-yellow-50 text-yellow-700 rounded-md">Template 'Indicadores Modernos' visualizado 15 vezes hoje.</li>
                <li className="p-2 bg-purple-50 text-purple-700 rounded-md">Novo criador 'ArteDigitalPro' aprovado.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};