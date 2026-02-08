import 'server-only';

import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export type ServerRequestOptions = {
  cookie?: string;
};

const getAuthHeaders = (options?: ServerRequestOptions) => {
  const cookieStore = cookies();
  return {
    Cookie: options?.cookie ?? cookieStore.toString(),
  };
};

export const checkSession = async (
  options?: ServerRequestOptions
): Promise<User | null> => {
  const res = await api.get('/auth/session', {
    headers: getAuthHeaders(options),
  });
  return res.data ?? null;
};

export const getMe = async (options?: ServerRequestOptions): Promise<User> => {
  const res = await api.get('/users/me', {
    headers: getAuthHeaders(options),
  });
  return res.data;
};

export const fetchNotes = async (
  params?: { page?: number; perPage?: number; search?: string; tag?: string },
  options?: ServerRequestOptions
): Promise<Note[]> => {
  const res = await api.get('/notes', {
    headers: getAuthHeaders(options),
    params,
  });
  return res.data;
};

export const fetchNoteById = async (
  id: string,
  options?: ServerRequestOptions
): Promise<Note> => {
  const res = await api.get(`/notes/${id}`, {
    headers: getAuthHeaders(options),
  });
  return res.data;
};
