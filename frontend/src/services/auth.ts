// src/services/auth.ts
import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Usuario {
  id_usuario: number;
  email: string;
  nombre: string;
  rol: 'admin' | 'vendedor' | 'gerente';
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    return response.data;
  },

  registro: async (data: any) => {
    const response = await api.post('/auth/registro', data);
    return response.data;
  },

  perfil: async () => {
    const response = await api.get('/auth/perfil');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  getUsuarioActual: (): Usuario | null => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
};
