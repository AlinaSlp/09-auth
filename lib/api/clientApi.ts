import { api } from './api';
import { User } from '@/types/user';
import { Note, NotesResponse } from '@/types/note';

/* ---------- AUTH ---------- */
export const register = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get('/auth/session');
  return res.data ?? null;
};

/* ---------- USER ---------- */
export const getMe = async (): Promise<User> => {
  const res = await api.get('/users/me');
  return res.data;
};

export const updateMe = async (data: { username: string }): Promise<User> => {
  const res = await api.patch('/users/me', data);
  return res.data;
};

/* ---------- NOTES ---------- */
export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
  perPage?: number;
}): Promise<NotesResponse> => {
  const res = await api.get('/notes', {
    params: {
      perPage: params?.perPage ?? 12,
      ...params,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
