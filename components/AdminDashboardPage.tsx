import React, { useState } from 'react';
import { AdminSectionType, User, Order, Template, MogrtTemplate, ChromaKeyTemplate, Coupon, SimulatedTicket } from '../types';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminOverview } from './admin/AdminOverview';
import { AdminManageBroadcastTemplates } from './admin/AdminManageBroadcastTemplates';
import { AdminManageMogrts } from './admin/AdminManageMogrts';
import { AdminManageChromaKey } from './admin/AdminManageChromaKey';
import { AdminManageUsers } from './admin/AdminManageUsers';
import { AdminManageCreators } from './admin/AdminManageCreators';
import { AdminManageOrders } from './admin/AdminManageOrders';
import { AdminManageCoupons } from './admin/AdminManageCoupons';
import { AdminManageSupportTickets } from './admin/AdminManageSupportTickets';
import { SIMULATED_SUPPORT_TICKETS_DATA } from '../constants';


interface AdminDashboardPageProps {
  adminName: string;
  users: User[];
  orders: Order[];
  templates: Template[]; // Broadcast Templates
  mogrtTemplates: MogrtTemplate[];
  chromaKeyTemplates: ChromaKeyTemplate[];
  coupons: Coupon[];
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  adminName,
  users,
  orders,
  templates,
  mogrtTemplates,
  chromaKeyTemplates,
  coupons
}) => {
  const [currentSection, setCurrentSection] = useState<AdminSectionType>('overview');

  const totalTemplates = templates.length;
  const totalMogrts = mogrtTemplates.length;
  const totalChromaKey = chromaKeyTemplates.length;
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const simulatedTicketsData: SimulatedTicket[] = SIMULATED_SUPPORT_TICKETS_DATA;


  const renderSectionContent = () => {
    switch (currentSection) {
      case 'overview':
        return <AdminOverview 
                  totalTemplates={totalTemplates}
                  totalMogrts={totalMogrts}
                  totalChromaKey={totalChromaKey}
                  totalOrders={totalOrders}
                  totalUsers={totalUsers}
                  totalRevenue={totalRevenue}
                  onNavigateToSection={setCurrentSection}
                />;
      case 'manageTemplates':
        return <AdminManageBroadcastTemplates templates={templates} />;
      case 'manageMogrts':
        return <AdminManageMogrts mogrts={mogrtTemplates} />;
      case 'manageChromaKey':
        return <AdminManageChromaKey chromaKeyItems={chromaKeyTemplates} />;
      case 'manageUsers':
        return <AdminManageUsers users={users} />;
      case 'manageCreators':
        return <AdminManageCreators users={users.filter(u => u.isCreator)} />;
      case 'manageOrders':
        return <AdminManageOrders orders={orders} users={users} />;
      case 'manageCoupons':
        return <AdminManageCoupons coupons={coupons} />;
      case 'manageSupportTickets':
        return <AdminManageSupportTickets tickets={simulatedTicketsData} />;
      // Add other cases as components are built
      default:
        return <div className="p-6 bg-white rounded-lg shadow">
                 <h2 className="text-xl font-semibold text-gray-700">{currentSection}</h2>
                 <p className="mt-2 text-gray-600">Conteúdo para esta seção ainda não implementado.</p>
                 <p className="mt-1 text-xs text-gray-400">Verifique se o ID da seção <code className="bg-gray-200 p-1 rounded">{currentSection}</code> está mapeado corretamente em AdminDashboardPage.tsx e AdminSidebar.tsx.</p>
               </div>;
    }
  };

  return (
    <div id="admin-dashboard-page" className="flex min-h-screen bg-gray-100">
      <AdminSidebar currentSection={currentSection} onSetCurrentSection={setCurrentSection} />
      <main className="flex-1 p-6 md:p-10 ml-64"> {/* Added ml-64 to account for fixed sidebar width */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
          <p className="text-gray-600">Bem-vindo, <span className="font-semibold">{adminName}</span>!</p>
        </header>
        {renderSectionContent()}
      </main>
    </div>
  );
};