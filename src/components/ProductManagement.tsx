
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      code: 'PROD001',
      name: 'Laptop Dell Inspiron 15',
      description: 'Laptop para oficina con procesador Intel i5',
      price: 2500.00,
      unit: 'UNIDAD',
      igvType: 'GRAVADO',
      category: 'Tecnología'
    },
    {
      id: 2,
      code: 'SERV001',
      name: 'Consultoría TI',
      description: 'Servicio de consultoría en tecnología',
      price: 150.00,
      unit: 'HORA',
      igvType: 'GRAVADO',
      category: 'Servicios'
    },
    {
      id: 3,
      code: 'PROD002',
      name: 'Mouse Inalámbrico',
      description: 'Mouse inalámbrico ergonómico',
      price: 45.00,
      unit: 'UNIDAD',
      igvType: 'GRAVADO',
      category: 'Accesorios'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    price: '',
    unit: 'UNIDAD',
    igvType: 'GRAVADO',
    category: ''
  });

  const units = [
    'UNIDAD', 'KILOGRAMO', 'METRO', 'LITRO', 'CAJA', 'HORA', 'DIA', 'MES'
  ];

  const igvTypes = [
    'GRAVADO', 'EXONERADO', 'INAFECTO', 'EXPORTACION'
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price)
    };
    
    if (editingProduct) {
      setProducts(products.map(product =>
        product.id === editingProduct.id
          ? { ...productData, id: editingProduct.id }
          : product
      ));
    } else {
      setProducts([...products, { ...productData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      price: '',
      unit: 'UNIDAD',
      igvType: 'GRAVADO',
      category: ''
    });
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      price: product.price.toString()
    });
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
          <p className="text-gray-600 mt-2">Administra tu catálogo de productos y servicios</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Código</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="PROD001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Tecnología"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="name">Nombre del Producto/Servicio</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Precio Unitario (S/)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unidad de Medida</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="igvType">Tipo de Afectación IGV</Label>
                <Select value={formData.igvType} onValueChange={(value) => setFormData({...formData, igvType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {igvTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {editingProduct ? 'Actualizar' : 'Guardar'}
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
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Código</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Producto/Servicio</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Precio</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Unidad</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">IGV</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <span className="font-medium text-gray-900">{product.code}</span>
                      <div className="text-xs text-gray-500">{product.category}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">S/ {product.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-600">{product.unit}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.igvType === 'GRAVADO' ? 'bg-green-100 text-green-800' :
                      product.igvType === 'EXONERADO' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.igvType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
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

export default ProductManagement;
