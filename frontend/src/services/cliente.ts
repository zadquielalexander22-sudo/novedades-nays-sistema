// src/services/cliente.ts
import api from './api';

export interface Cliente {
  id_cliente?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  telefono: string;
  email?: string;
  ine: string;
  direccion?: string;
  activo?: boolean;
}

export const clienteService = {
  obtenerTodos: async (page = 1, limit = 10, buscar = '') => {
    const response = await api.get('/clientes', {
      params: { page, limit, buscar }
    });
    return response.data;
  },

  obtenerPorId: async (id: number) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },

  crear: async (cliente: Cliente) => {
    const response = await api.post('/clientes', cliente);
    return response.data;
  },

  actualizar: async (id: number, cliente: Cliente) => {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  },

  eliminar: async (id: number) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  }
};
