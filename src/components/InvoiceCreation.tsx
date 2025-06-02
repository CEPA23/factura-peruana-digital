
import React, { useState } from 'react';
import { Plus, Minus, Calculator, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InvoiceCreation = () => {
  const [invoiceType, setInvoiceType] = useState('FACTURA');
  const [selectedClient, setSelectedClient] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, productCode: '', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const clients = [
    { id: 1, name: 'Empresa ABC S.A.C.', document: '20123456789' },
    { id: 2, name: 'Juan Pérez García', document: '12345678' },
    { id: 3, name: 'Comercial XYZ S.R.L.', document: '20987654321' }
  ];

  const products = [
    { code: 'PROD001', name: 'Laptop Dell Inspiron 15', price: 2500.00 },
    { code: 'SERV001', name: 'Consultoría TI', price: 150.00 },
    { code: 'PROD002', name: 'Mouse Inalámbrico', price: 45.00 }
  ];

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      productCode: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const removeItem = (id) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'productCode' && value) {
          const product = products.find(p => p.code === value);
          if (product) {
            updatedItem.description = product.name;
            updatedItem.unitPrice = product.price;
          }
        }
        
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const invoiceData = {
      type: invoiceType,
      client: selectedClient,
      items: invoiceItems,
      subtotal,
      igv,
      total,
      date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Factura creada:', invoiceData);
    alert('Factura creada exitosamente y enviada a SUNAT');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nueva Factura Electrónica</h1>
        <p className="text-gray-600 mt-2">Crea un nuevo comprobante electrónico</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Invoice Header */}
        <Card>
          <CardHeader>
            <CardTitle>Información del Comprobante</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="invoiceType">Tipo de Comprobante</Label>
                <Select value={invoiceType} onValueChange={setInvoiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FACTURA">Factura</SelectItem>
                    <SelectItem value="BOLETA">Boleta de Venta</SelectItem>
                    <SelectItem value="NOTA_CREDITO">Nota de Crédito</SelectItem>
                    <SelectItem value="NOTA_DEBITO">Nota de Débito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="series">Serie</Label>
                <Input
                  id="series"
                  value={invoiceType === 'FACTURA' ? 'F001' : 'B001'}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  value="00001237"
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name} - {client.document}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Detalle de Productos/Servicios</CardTitle>
              <Button type="button" onClick={addItem} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoiceItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-2">
                    <Label>Código</Label>
                    <Select
                      value={item.productCode}
                      onValueChange={(value) => updateItem(item.id, 'productCode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Código" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.code} value={product.code}>
                            {product.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-4">
                    <Label>Descripción</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Descripción del producto/servicio"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label>Cantidad</Label>
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label>Precio Unit.</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <Label>Total</Label>
                    <Input
                      value={`S/ ${item.total.toFixed(2)}`}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      disabled={invoiceItems.length === 1}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoice Totals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-w-sm ml-auto">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IGV (18%):</span>
                <span>S/ {igv.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Guardar Borrador
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Send className="mr-2 h-4 w-4" />
            Emitir y Enviar a SUNAT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceCreation;
