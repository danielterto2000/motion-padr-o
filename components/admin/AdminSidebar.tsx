import React from 'react';
import { AdminSectionType, AdminNavItem } from '../../types';
import { ADMIN_NAV_ITEMS } from '../../constants';

interface AdminSidebarProps {
  currentSection: AdminSectionType;
  onSetCurrentSection: (section: AdminSectionType) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentSection, onSetCurrentSection }) => {
  return (
    <aside className="w-64 bg-gray-800 text-gray-100 p-4 space-y-2 flex flex-col fixed top-20 left-0 h-[calc(100vh-5rem)] shadow-lg z-40"> {/* Adjust top to navbar height */}
      <nav className="flex-grow">
        {ADMIN_NAV_ITEMS.map((item: AdminNavItem) => (
          <button
            key={item.id}
            onClick={() => onSetCurrentSection(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150
              ${currentSection === item.id 
                ? 'bg-gray-900 text-white shadow-inner' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            aria-current={currentSection === item.id ? 'page' : undefined}
          >
            <i className={`${item.icon} fa-fw w-5 text-center`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
         <button
            onClick={() => alert("Logout do admin (simulação)")} // Replace with actual logout eventually
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
          >
            <i className="fas fa-sign-out-alt fa-fw w-5 text-center"></i>
            <span>Sair (Admin)</span>
          </button>
      </div>
    </aside>
  );
};