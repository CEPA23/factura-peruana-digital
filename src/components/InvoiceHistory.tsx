
import React, { useState } from 'react';
import { Search, Download, Eye, FileText, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const InvoiceHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [typeFilter, setTypeFilter] = useState('TODOS');

  const invoices = [
    {
      id: 1,
      number: 'F001-00001234',
      type: 'FACTURA',
      client: 'Empresa ABC S.A.C.',
      clientDoc: '20123456789',
      date: '15/06/2025',
      amount: 2950.00,
      status: 'ACEPTADA',
      sunatCode: 'CDR-001234'
    },
    {
      id: 2,
      number: 'F001-00001235',
      type: 'FACTURA',
      client: 'Comercial XYZ S.R.L.',
      clientDoc: '20987654321',
      date: '15/06/2025',
      amount: 2124.00,
      status: 'ENVIADA',
      sunatCode: 'TICKET-567890'
    },
    {
      id: 3,
      number: 'B001-00000156',
      type: 'BOLETA',
      client: 'Juan Pérez García',
      clientDoc: '12345678',
      date: '14/06/2025',
      amount: 413.00,
      status: 'ACEPTADA',
      sunatCode: 'CDR-001235'
    },
    {
      id: 4,
      number: 'F001-00001236',
      type: 'FACTURA',
      client: 'Industrias DEF S.A.',
      clientDoc: '20111222333',
      date: '14/06/2025',
      amount: 6136.00,
      status: 'OBSERVADA',
      sunatCode: 'OBS-001236'
    },
    {
      id: 5,
      number: 'NC01-00000001',
      type: 'NOTA_CREDITO',
      client: 'Empresa ABC S.A.C.',
      clientDoc: '20123456789',
      date: '13/06/2025',
      amount: -500.00,
      status: 'ACEPTADA',
      sunatCode: 'CDR-001237'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACEPTADA': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ENVIADA': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'OBSERVADA': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'ANULADA': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACEPTADA': return 'bg-green-100 text-green-800';
      case 'ENVIADA': return 'bg-blue-100 text-blue-800';
      case 'OBSERVADA': return 'bg-yellow-100 text-yellow-800';
      case 'ANULADA': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'FACTURA': return 'bg-blue-100 text-blue-800';
      case 'BOLETA': return 'bg-green-100 text-green-800';
      case 'NOTA_CREDITO': return 'bg-orange-100 text-orange-800';
      case 'NOTA_DEBITO': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientDoc.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'TODOS' || invoice.status === statusFilter;
    const matchesType = typeFilter === 'TODOS' || invoice.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDownloadPDF = (invoice) => {
    console.log('Descargando PDF para:', invoice.number);
    alert(`Descargando PDF de ${invoice.number}`);
  };

  const handleDownloadXML = (invoice) => {
    console.log('Descargando XML para:', invoice.number);
    alert(`Descargando XML de ${invoice.number}`);
  };

  const handleViewInvoice = (invoice) => {
    console.log('Visualizando factura:', invoice.number);
    alert(`Visualizando ${invoice.number}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Historial de Comprobantes</h1>
        <p className="text-gray-600 mt-2">Consulta y gestiona todos tus comprobantes electrónicos</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por número, cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de comprobante" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos los tipos</SelectItem>
              <SelectItem value="FACTURA">Facturas</SelectItem>
              <SelectItem value="BOLETA">Boletas</SelectItem>
              <SelectItem value="NOTA_CREDITO">Notas de Crédito</SelectItem>
              <SelectItem value="NOTA_DEBITO">Notas de Débito</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos los estados</SelectItem>
              <SelectItem value="ACEPTADA">Aceptada</SelectItem>
              <SelectItem value="ENVIADA">Enviada</SelectItem>
              <SelectItem value="OBSERVADA">Observada</SelectItem>
              <SelectItem value="ANULADA">Anulada</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex space-x-2">
            <Input type="date" className="flex-1" />
            <Input type="date" className="flex-1" />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-green-600">
            {filteredInvoices.filter(i => i.status === 'ACEPTADA').length}
          </div>
          <div className="text-sm text-gray-600">Aceptadas</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-blue-600">
            {filteredInvoices.filter(i => i.status === 'ENVIADA').length}
          </div>
          <div className="text-sm text-gray-600">Enviadas</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {filteredInvoices.filter(i => i.status === 'OBSERVADA').length}
          </div>
          <div className="text-sm text-gray-600">Observadas</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-2xl font-bold text-gray-900">
            S/ {filteredInvoices.reduce((sum, inv) => sum + Math.abs(inv.amount), 0).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Total Período</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Comprobante</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fecha</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Monto</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">SUNAT</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-blue-600">{invoice.number}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(invoice.type)}`}>
                        {invoice.type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{invoice.client}</div>
                      <div className="text-sm text-gray-500">{invoice.clientDoc}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{invoice.date}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    S/ {Math.abs(invoice.amount).toFixed(2)}
                    {invoice.amount < 0 && <span className="text-red-500"> (NC)</span>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(invoice.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-gray-600">{invoice.sunatCode}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewInvoice(invoice)}
                        title="Ver comprobante"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(invoice)}
                        title="Descargar PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadXML(invoice)}
                        title="Descargar XML"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;
