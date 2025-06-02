
import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Sistema de Facturación Electrónica</h2>
          <p className="text-sm text-gray-600">Compatible con SUNAT - Perú</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Usuario Admin</span>
          </div>
          
          <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
