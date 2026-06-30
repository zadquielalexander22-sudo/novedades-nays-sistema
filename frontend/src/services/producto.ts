// src/services/producto.ts
import api from './api';

export interface Producto {
  id_producto?: number;
  nombre: string;
  descripcion?: string;
  id_categoria: number;
  precio: number;
  stock: number;
  stock_minimo?: number;
  sku?: string;
  activo?: boolean;
}

export const productoService = {
  obtenerTodos: async (page = 1, limit = 10, buscar = '', id_categoria?: number) => {
    const response = await api.get('/productos', {
      params: { page, limit, buscar, id_categoria }
    });
    return response.data;
  },

  obtenerPorId: async (id: number) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  obtenerStockBajo: async () => {
    const response = await api.get('/productos/stock-bajo');
    return response.data;
  },

  crear: async (producto: Producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  actualizar: async (id: number, producto: Producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  eliminar: async (id: number) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  }
};
