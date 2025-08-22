import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const Configuration = () => {
  const [companyInfo, setCompanyInfo] = useState({
    ruc: '',
    regime: '',
    businessName: '',
    commercialName: '',
    address: '',
    phone: '',
    email: ''
  });

  const [accountingConfig, setAccountingConfig] = useState({
    fiscalYear: new Date().getFullYear().toString(),
    currency: 'PEN',
    costingMethod: 'PROMEDIO',
    decimals: '2',
    autoSalesEntries: false,
    autoPurchaseEntries: false,
    validateEntries: true
  });

  const [sunatConnection, setSunatConnection] = useState({
    status: 'Inactivo',
    environment: 'BETA',
    solUser: '',
    lastSync: '2024-08-22 10:30:00',
    autoSend: false,
    autoSync: false,
    emailNotifications: true
  });

  const [electronicInvoicing, setElectronicInvoicing] = useState({
    nextInvoiceNumber: 1,
    nextReceiptNumber: 1,
    includeQR: true,
    showBankDetails: false,
    autoEmailPDF: false
  });

  const [notifications, setNotifications] = useState({
    taxDueReminders: true,
    rejectedInvoiceAlerts: true,
    dailySalesReport: false,
    backupReminders: true,
    notificationEmail: ''
  });

  const [backup, setBackup] = useState({
    frequency: 'WEEKLY',
    lastBackup: '2024-08-20 15:45:00'
  });

  const invoiceSeries = [
    { type: 'Facturas', series: 'F001', status: 'Activa' },
    { type: 'Boletas', series: 'B001', status: 'Activa' },
    { type: 'Notas de Crédito', series: 'FC01', status: 'Inactiva' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tarjeta 1: Información de la Empresa */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <CardTitle className="text-xl text-blue-900">Información de la Empresa</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ruc">RUC</Label>
                <Input 
                  id="ruc" 
                  value={companyInfo.ruc}
                  onChange={(e) => setCompanyInfo({...companyInfo, ruc: e.target.value})}
                  placeholder="20123456789"
                />
              </div>
              <div>
                <Label htmlFor="regime">Régimen Tributario</Label>
                <Select value={companyInfo.regime} onValueChange={(value) => setCompanyInfo({...companyInfo, regime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar régimen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GENERAL">Régimen General</SelectItem>
                    <SelectItem value="RUS">RUS</SelectItem>
                    <SelectItem value="RER">RER</SelectItem>
                    <SelectItem value="MYPE">MYPE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="businessName">Razón Social</Label>
              <Input 
                id="businessName" 
                value={companyInfo.businessName}
                onChange={(e) => setCompanyInfo({...companyInfo, businessName: e.target.value})}
                placeholder="Mi Empresa S.A.C."
              />
            </div>
            
            <div>
              <Label htmlFor="commercialName">Nombre Comercial</Label>
              <Input 
                id="commercialName" 
                value={companyInfo.commercialName}
                onChange={(e) => setCompanyInfo({...companyInfo, commercialName: e.target.value})}
                placeholder="Mi Empresa"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Dirección Fiscal</Label>
              <Textarea 
                id="address" 
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                placeholder="Av. Principal 123, Lima"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                  placeholder="01-1234567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                  placeholder="empresa@ejemplo.com"
                />
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Actualizar información
            </Button>
          </CardContent>
        </Card>

        {/* Tarjeta 2: Configuración Contable */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <CardTitle className="text-xl text-green-900">Configuración Contable</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fiscalYear">Ejercicio Contable Actual</Label>
                <Select value={accountingConfig.fiscalYear} onValueChange={(value) => setAccountingConfig({...accountingConfig, fiscalYear: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currency">Moneda Funcional</Label>
                <Select value={accountingConfig.currency} onValueChange={(value) => setAccountingConfig({...accountingConfig, currency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PEN">Soles (PEN)</SelectItem>
                    <SelectItem value="USD">Dólares (USD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="costingMethod">Método de Costeo</Label>
                <Select value={accountingConfig.costingMethod} onValueChange={(value) => setAccountingConfig({...accountingConfig, costingMethod: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROMEDIO">Promedio Ponderado</SelectItem>
                    <SelectItem value="FIFO">FIFO</SelectItem>
                    <SelectItem value="LIFO">LIFO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="decimals">Decimales en Importes</Label>
                <Select value={accountingConfig.decimals} onValueChange={(value) => setAccountingConfig({...accountingConfig, decimals: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 decimales</SelectItem>
                    <SelectItem value="2">2 decimales</SelectItem>
                    <SelectItem value="3">3 decimales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoSales" 
                  checked={accountingConfig.autoSalesEntries}
                  onCheckedChange={(checked) => setAccountingConfig({...accountingConfig, autoSalesEntries: !!checked})}
                />
                <Label htmlFor="autoSales">Generar asientos automáticos de ventas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoPurchase" 
                  checked={accountingConfig.autoPurchaseEntries}
                  onCheckedChange={(checked) => setAccountingConfig({...accountingConfig, autoPurchaseEntries: !!checked})}
                />
                <Label htmlFor="autoPurchase">Generar asientos automáticos de compras</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="validateEntries" 
                  checked={accountingConfig.validateEntries}
                  onCheckedChange={(checked) => setAccountingConfig({...accountingConfig, validateEntries: !!checked})}
                />
                <Label htmlFor="validateEntries">Validar descuadre en asientos</Label>
              </div>
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Guardar configuración
            </Button>
          </CardContent>
        </Card>

        {/* Tarjeta 3: Conexión SUNAT */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <CardTitle className="text-xl text-blue-900">Conexión SUNAT</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Estado de Conexión</Label>
              <Badge variant={sunatConnection.status === 'Activo' ? 'default' : 'secondary'}>
                {sunatConnection.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="environment">Ambiente SUNAT</Label>
                <Select value={sunatConnection.environment} onValueChange={(value) => setSunatConnection({...sunatConnection, environment: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRODUCCION">Producción</SelectItem>
                    <SelectItem value="BETA">Beta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="solUser">Usuario SOL</Label>
                <Input 
                  id="solUser" 
                  value={sunatConnection.solUser}
                  onChange={(e) => setSunatConnection({...sunatConnection, solUser: e.target.value})}
                  placeholder="Usuario SOL"
                />
              </div>
            </div>
            
            <div>
              <Label>Última Sincronización de Tipos de Cambio</Label>
              <Input value={sunatConnection.lastSync} readOnly className="bg-gray-50" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoSend" 
                  checked={sunatConnection.autoSend}
                  onCheckedChange={(checked) => setSunatConnection({...sunatConnection, autoSend: !!checked})}
                />
                <Label htmlFor="autoSend">Envío automático de comprobantes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoSync" 
                  checked={sunatConnection.autoSync}
                  onCheckedChange={(checked) => setSunatConnection({...sunatConnection, autoSync: !!checked})}
                />
                <Label htmlFor="autoSync">Sincronización automática de tipos de cambio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="emailNotifications" 
                  checked={sunatConnection.emailNotifications}
                  onCheckedChange={(checked) => setSunatConnection({...sunatConnection, emailNotifications: !!checked})}
                />
                <Label htmlFor="emailNotifications">Notificar rechazos por email</Label>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Probar conexión
            </Button>
          </CardContent>
        </Card>

        {/* Tarjeta 4: Facturación Electrónica */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <CardTitle className="text-xl text-purple-900">Facturación Electrónica</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">Series de Facturación</Label>
              <div className="space-y-2">
                {invoiceSeries.map((series, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{series.type} - {series.series}</span>
                    <Badge variant={series.status === 'Activa' ? 'default' : 'secondary'}>
                      {series.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nextInvoice">Próximo Número de Factura</Label>
                <Input 
                  id="nextInvoice" 
                  type="number"
                  value={electronicInvoicing.nextInvoiceNumber}
                  onChange={(e) => setElectronicInvoicing({...electronicInvoicing, nextInvoiceNumber: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="nextReceipt">Próximo Número de Boleta</Label>
                <Input 
                  id="nextReceipt" 
                  type="number"
                  value={electronicInvoicing.nextReceiptNumber}
                  onChange={(e) => setElectronicInvoicing({...electronicInvoicing, nextReceiptNumber: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm font-medium">Configuración de PDF</Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeQR" 
                  checked={electronicInvoicing.includeQR}
                  onCheckedChange={(checked) => setElectronicInvoicing({...electronicInvoicing, includeQR: !!checked})}
                />
                <Label htmlFor="includeQR">Incluir código QR</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="showBankDetails" 
                  checked={electronicInvoicing.showBankDetails}
                  onCheckedChange={(checked) => setElectronicInvoicing({...electronicInvoicing, showBankDetails: !!checked})}
                />
                <Label htmlFor="showBankDetails">Mostrar detalles bancarios</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="autoEmailPDF" 
                  checked={electronicInvoicing.autoEmailPDF}
                  onCheckedChange={(checked) => setElectronicInvoicing({...electronicInvoicing, autoEmailPDF: !!checked})}
                />
                <Label htmlFor="autoEmailPDF">Enviar PDF automáticamente por email</Label>
              </div>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Actualizar series
            </Button>
          </CardContent>
        </Card>

        {/* Tarjeta 5: Notificaciones */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="text-xl text-gray-900">Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="taxDueReminders" 
                  checked={notifications.taxDueReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, taxDueReminders: !!checked})}
                />
                <Label htmlFor="taxDueReminders">Notificar vencimientos tributarios</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rejectedInvoiceAlerts" 
                  checked={notifications.rejectedInvoiceAlerts}
                  onCheckedChange={(checked) => setNotifications({...notifications, rejectedInvoiceAlerts: !!checked})}
                />
                <Label htmlFor="rejectedInvoiceAlerts">Alertas de facturas rechazadas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dailySalesReport" 
                  checked={notifications.dailySalesReport}
                  onCheckedChange={(checked) => setNotifications({...notifications, dailySalesReport: !!checked})}
                />
                <Label htmlFor="dailySalesReport">Resumen diario de ventas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="backupReminders" 
                  checked={notifications.backupReminders}
                  onCheckedChange={(checked) => setNotifications({...notifications, backupReminders: !!checked})}
                />
                <Label htmlFor="backupReminders">Recordatorios de backup</Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="notificationEmail">Email para Notificaciones</Label>
              <Input 
                id="notificationEmail" 
                type="email"
                value={notifications.notificationEmail}
                onChange={(e) => setNotifications({...notifications, notificationEmail: e.target.value})}
                placeholder="notificaciones@empresa.com"
              />
            </div>
            
            <Button className="w-full bg-black hover:bg-gray-800 text-white">
              Guardar preferencias
            </Button>
          </CardContent>
        </Card>

        {/* Tarjeta 6: Respaldos y Seguridad */}
        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
            <CardTitle className="text-xl text-orange-900">Respaldos y Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="backupFrequency">Frecuencia de Backup Automático</Label>
              <Select value={backup.frequency} onValueChange={(value) => setBackup({...backup, frequency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DAILY">Diario</SelectItem>
                  <SelectItem value="WEEKLY">Semanal</SelectItem>
                  <SelectItem value="MONTHLY">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Último Backup Realizado</Label>
              <Input value={backup.lastBackup} readOnly className="bg-gray-50" />
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Descargar backup manual
              </Button>
              <Button variant="outline" className="w-full">
                Restaurar desde backup
              </Button>
            </div>
            
            <div className="text-xs text-gray-600 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
              <strong>Nota:</strong> Se recomienda realizar backups antes de cada cierre mensual.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Configuration;