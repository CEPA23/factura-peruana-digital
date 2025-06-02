
import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Users, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-06-15');

  // Sample data for charts
  const salesData = [
    { date: '01/06', facturas: 12000, boletas: 4500 },
    { date: '02/06', facturas: 15000, boletas: 3200 },
    { date: '03/06', facturas: 8000, boletas: 5100 },
    { date: '04/06', facturas: 22000, boletas: 2800 },
    { date: '05/06', facturas: 18000, boletas: 4200 },
    { date: '06/06', facturas: 25000, boletas: 3800 },
    { date: '07/06', facturas: 19000, boletas: 4600 }
  ];

  const clientSalesData = [
    { name: 'Empresa ABC S.A.C.', value: 25000, percentage: 35 },
    { name: 'Comercial XYZ S.R.L.', value: 18000, percentage: 25 },
    { name: 'Industrias DEF S.A.', value: 15000, percentage: 21 },
    { name: 'Tech Solutions', value: 8000, percentage: 11 },
    { name: 'Otros', value: 6000, percentage: 8 }
  ];

  const productSalesData = [
    { name: 'Laptop Dell Inspiron 15', quantity: 45, revenue: 112500 },
    { name: 'Consultoría TI', quantity: 120, revenue: 18000 },
    { name: 'Mouse Inalámbrico', quantity: 200, revenue: 9000 },
    { name: 'Monitor 24"', quantity: 30, revenue: 15000 },
    { name: 'Teclado Mecánico', quantity: 85, revenue: 6800 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const handleExportExcel = () => {
    console.log('Exportando a Excel:', { reportType, startDate, endDate });
    alert('Exportando reporte a Excel...');
  };

  const handleExportPDF = () => {
    console.log('Exportando a PDF:', { reportType, startDate, endDate });
    alert('Exportando reporte a PDF...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes y Análisis</h1>
        <p className="text-gray-600 mt-2">Analiza el rendimiento de tu negocio con reportes detallados</p>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Configuración del Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Ventas por Período</SelectItem>
                <SelectItem value="clients">Ventas por Cliente</SelectItem>
                <SelectItem value="products">Ventas por Producto</SelectItem>
                <SelectItem value="taxes">Resumen de Impuestos</SelectItem>
              </SelectContent>
            </Select>
            
            <div>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleExportExcel} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <Button onClick={handleExportPDF} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ventas Totales</p>
                <p className="text-2xl font-bold text-gray-900">S/ 72,000</p>
                <p className="text-sm text-green-600">+15% vs mes anterior</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Facturas Emitidas</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-blue-600">+8% vs mes anterior</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clientes Activos</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-sm text-purple-600">+12% vs mes anterior</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Productos Vendidos</p>
                <p className="text-2xl font-bold text-gray-900">480</p>
                <p className="text-sm text-orange-600">+5% vs mes anterior</p>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {reportType === 'sales' && (
        <Card>
          <CardHeader>
            <CardTitle>Ventas Diarias por Tipo de Comprobante</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`S/ ${value}`, '']} />
                <Bar dataKey="facturas" fill="#3B82F6" name="Facturas" />
                <Bar dataKey="boletas" fill="#10B981" name="Boletas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {reportType === 'clients' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Ventas por Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clientSalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clientSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`S/ ${value}`, 'Ventas']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientSalesData.map((client, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.percentage}% del total</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">S/ {client.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === 'products' && (
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Producto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Producto</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Cantidad</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Ingresos</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">% del Total</th>
                  </tr>
                </thead>
                <tbody>
                  {productSalesData.map((product, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                      <td className="py-3 px-4 text-gray-600">{product.quantity}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">S/ {product.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(product.revenue / 112500) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {((product.revenue / 112500) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === 'taxes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de IGV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Imponible:</span>
                  <span className="font-medium">S/ 61,017.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">IGV (18%):</span>
                  <span className="font-medium">S/ 10,983.00</span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-medium">Total Ventas:</span>
                  <span className="font-bold text-lg">S/ 72,000.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comprobantes por Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aceptadas:</span>
                  <span className="font-medium text-green-600">142 (91%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Enviadas:</span>
                  <span className="font-medium text-blue-600">8 (5%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Observadas:</span>
                  <span className="font-medium text-yellow-600">4 (3%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Anuladas:</span>
                  <span className="font-medium text-red-600">2 (1%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;
