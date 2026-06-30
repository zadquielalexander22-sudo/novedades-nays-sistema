// src/components/Clientes.tsx
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { clienteService, Cliente } from '../services/cliente';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const Clientes: React.FC = () => {
  const [page, setPage] = useState(1);
  const [buscar, setBuscar] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);

  const { data, isLoading } = useQuery(
    ['clientes', page, buscar],
    () => clienteService.obtenerTodos(page, 10, buscar),
    { staleTime: 5 * 60 * 1000 }
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await clienteService.eliminar(id);
        alert('Cliente eliminado');
      } catch (error) {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          <FiPlus /> <span>Nuevo Cliente</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">{editando ? 'Editar' : 'Nuevo'} Cliente</h2>
          {/* Formulario aquí */}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar cliente..."
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
                <th className="px-6 py-3 text-left">Teléfono</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.clientes?.map((cliente: Cliente) => (
                <tr key={cliente.id_cliente} className="border-t">
                  <td className="px-6 py-3">{cliente.nombre} {cliente.apellido_paterno}</td>
                  <td className="px-6 py-3">{cliente.telefono}</td>
                  <td className="px-6 py-3">{cliente.email || '-'}</td>
                  <td className="px-6 py-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.id_cliente!)}
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

export default Clientes;
