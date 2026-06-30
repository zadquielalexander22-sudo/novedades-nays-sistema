// src/services/venta.ts
import api from './api';

export interface DetalleVenta {
  id_producto: number;
  cantidad: number;
}

export interface Venta {
  id_venta?: number;
  numero_venta?: string;
  id_cliente: number;
  id_empleado?: number;
  fecha?: string;
  total?: number;
  estado?: 'pendiente' | 'completada' | 'cancelada';
  metodo_pago?: 'efectivo' | 'tarjeta' | 'transferencia' | 'otro';
  notas?: string;
  detalles: DetalleVenta[];
}

export const ventaService = {
  obtenerTodas: async (page = 1, limit = 10, estado?: string, fecha_inicio?: string, fecha_fin?: string) => {
    const response = await api.get('/ventas', {
      params: { page, limit, estado, fecha_inicio, fecha_fin }
    });
    return response.data;
  },

  obtenerPorId: async (id: number) => {
    const response = await api.get(`/ventas/${id}`);
    return response.data;
  },

  crear: async (venta: Venta) => {
    const response = await api.post('/ventas', venta);
    return response.data;
  },

  cancelar: async (id: number) => {
    const response = await api.post(`/ventas/${id}/cancelar`);
    return response.data;
  }
};
