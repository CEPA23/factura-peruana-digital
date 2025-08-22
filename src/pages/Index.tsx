
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import ClientManagement from '../components/ClientManagement';
import ProductManagement from '../components/ProductManagement';
import InvoiceCreation from '../components/InvoiceCreation';
import InvoiceHistory from '../components/InvoiceHistory';
import Reports from '../components/Reports';
import Configuration from '../components/Configuration';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clientes" element={<ClientManagement />} />
              <Route path="/productos" element={<ProductManagement />} />
              <Route path="/facturas/nueva" element={<InvoiceCreation />} />
              <Route path="/facturas/historial" element={<InvoiceHistory />} />
              <Route path="/reportes" element={<Reports />} />
              <Route path="/configuracion" element={<Configuration />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
