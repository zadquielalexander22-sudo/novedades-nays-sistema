// src/components/Productos.tsx
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { productoService, Producto } from '../services/producto';
import { FiPlus, FiEdit2, FiTrash2, FiAlertTriangle } from 'react-icons/fi';

const Productos: React.FC = () => {
  const [page, setPage] = useState(1);
  const [buscar, setBuscar] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useQuery(
    ['productos', page, buscar],
    () => productoService.obtenerTodos(page, 10, buscar),
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: stockBajo } = useQuery(
    'stock-bajo',
    () => productoService.obtenerStockBajo()
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await productoService.eliminar(id);
        alert('Producto eliminado');
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Productos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          <FiPlus /> <span>Nuevo Producto</span>
        </button>
      </div>

      {stockBajo && stockBajo.productos?.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6 flex items-start space-x-3">
          <FiAlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-800">Stock Bajo</h3>
            <p className="text-yellow-700">{stockBajo.productos.length} productos con stock bajo</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Nuevo Producto</h2>
          {/* Formulario aquí */}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Precio</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Categoría</th>
                <th className="px-6 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.productos?.map((producto: any) => (
                <tr key={producto.id_producto} className="border-t">
                  <td className="px-6 py-3">{producto.nombre}</td>
                  <td className="px-6 py-3">${producto.precio}</td>
                  <td className="px-6 py-3">
                    <span className={producto.stock <= producto.stock_minimo ? 'text-red-600 font-semibold' : ''}>
                      {producto.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3">{producto.Categoria?.nombre}</td>
                  <td className="px-6 py-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(producto.id_producto)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Productos;
