
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  FileText, 
  History, 
  BarChart3,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Clientes', path: '/clientes' },
    { icon: Package, label: 'Productos', path: '/productos' },
    { icon: FileText, label: 'Nueva Factura', path: '/facturas/nueva' },
    { icon: History, label: 'Historial', path: '/facturas/historial' },
    { icon: BarChart3, label: 'Reportes', path: '/reportes' },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white w-64 min-h-screen shadow-xl">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-xl font-bold">SUNAT Facturación</h1>
        <p className="text-blue-200 text-sm mt-1">Sistema Electrónico</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 hover:bg-blue-700 transition-colors duration-200 ${
                  isActive ? 'bg-blue-700 border-r-4 border-blue-300' : ''
                }`
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
