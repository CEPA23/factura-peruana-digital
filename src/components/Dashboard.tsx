
import React from 'react';
import { FileText, Users, Package, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      icon: FileText,
      label: 'Facturas Emitidas',
      value: '1,247',
      change: '+12%',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      label: 'Clientes Activos',
      value: '89',
      change: '+5%',
      color: 'bg-green-500'
    },
    {
      icon: Package,
      label: 'Productos',
      value: '156',
      change: '+8%',
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'Ventas del Mes',
      value: 'S/ 45,230',
      change: '+15%',
      color: 'bg-orange-500'
    }
  ];

  const recentInvoices = [
    { number: 'F001-00001234', client: 'Empresa ABC S.A.C.', amount: 'S/ 2,500.00', status: 'Aceptada', date: '15/06/2025' },
    { number: 'F001-00001235', client: 'Comercial XYZ S.R.L.', amount: 'S/ 1,800.00', status: 'Enviada', date: '15/06/2025' },
    { number: 'B001-00000156', client: 'Juan Pérez García', amount: 'S/ 350.00', status: 'Aceptada', date: '14/06/2025' },
    { number: 'F001-00001236', client: 'Industrias DEF S.A.', amount: 'S/ 5,200.00', status: 'Observada', date: '14/06/2025' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aceptada': return 'bg-green-100 text-green-800';
      case 'Enviada': return 'bg-blue-100 text-blue-800';
      case 'Observada': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Resumen general del sistema de facturación</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Facturas Recientes</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium">Ver todas</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Número</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Monto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((invoice, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-blue-600">{invoice.number}</td>
                  <td className="py-3 px-4 text-gray-900">{invoice.client}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{invoice.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUNAT Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Estado SUNAT</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conexión con SUNAT:</span>
              <span className="text-green-600 font-medium">Activa</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Última sincronización:</span>
              <span className="text-gray-900">15/06/2025 14:30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Certificado digital:</span>
              <span className="text-green-600 font-medium">Válido</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Alertas Pendientes</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">2 facturas con observaciones pendientes de corrección</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">Certificado digital vence en 45 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
