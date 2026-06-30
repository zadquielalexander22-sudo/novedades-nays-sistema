// src/components/Dashboard.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiTrendingUp, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { title: 'Ventas Hoy', value: '0', icon: FiShoppingCart, color: 'bg-blue-500' },
    { title: 'Clientes', value: '5', icon: FiUsers, color: 'bg-green-500' },
    { title: 'Productos', value: '5', icon: FiPackage, color: 'bg-yellow-500' },
    { title: 'Ingresos', value: '$0', icon: FiTrendingUp, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{usuario?.nombre}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              <FiLogOut /> <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <button
              onClick={() => navigate('/clientes')}
              className="text-gray-700 hover:text-purple-600 font-semibold"
            >
              Clientes
            </button>
            <button
              onClick={() => navigate('/productos')}
              className="text-gray-700 hover:text-purple-600 font-semibold"
            >
              Productos
            </button>
            <button
              onClick={() => navigate('/ventas')}
              className="text-gray-700 hover:text-purple-600 font-semibold"
            >
              Ventas
            </button>
          </div>
        </div>
      </nav>

      {/* Stats */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-full text-white`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
