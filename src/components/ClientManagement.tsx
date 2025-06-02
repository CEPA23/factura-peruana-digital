
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ClientManagement = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      type: 'RUC',
      document: '20123456789',
      name: 'Empresa ABC S.A.C.',
      email: 'facturacion@empresaabc.com',
      address: 'Av. Principal 123, Lima',
      phone: '01-4567890'
    },
    {
      id: 2,
      type: 'DNI',
      document: '12345678',
      name: 'Juan Pérez García',
      email: 'juan.perez@email.com',
      address: 'Jr. Los Olivos 456, Lima',
      phone: '987654321'
    },
    {
      id: 3,
      type: 'RUC',
      document: '20987654321',
      name: 'Comercial XYZ S.R.L.',
      email: 'ventas@comercialxyz.com',
      address: 'Calle Comercio 789, Lima',
      phone: '01-9876543'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    type: 'RUC',
    document: '',
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      setClients(clients.map(client =>
        client.id === editingClient.id
          ? { ...formData, id: editingClient.id }
          : client
      ));
    } else {
      setClients([...clients, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'RUC',
      document: '',
      name: '',
      email: '',
      address: '',
      phone: ''
    });
    setEditingClient(null);
    setIsModalOpen(false);
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-600 mt-2">Administra tu base de datos de clientes</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="type">Tipo de Documento</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RUC">RUC</SelectItem>
                    <SelectItem value="DNI">DNI</SelectItem>
                    <SelectItem value="CE">Carnet de Extranjería</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="document">Número de Documento</Label>
                <Input
                  id="document"
                  value={formData.document}
                  onChange={(e) => setFormData({...formData, document: e.target.value})}
                  placeholder={formData.type === 'RUC' ? '20123456789' : '12345678'}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="name">
                  {formData.type === 'RUC' ? 'Razón Social' : 'Nombre Completo'}
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {editingClient ? 'Actualizar' : 'Guardar'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre o documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Documento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Teléfono</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium text-gray-900">{client.document}</span>
                      <div className="text-xs text-gray-500">{client.type}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.address}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{client.email}</td>
                  <td className="py-3 px-4 text-gray-600">{client.phone}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(client)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
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

export default ClientManagement;
