import { cookies } from 'next/headers';
import axios from 'axios';
import { User } from '@/types/user';
import { Note } from '@/types/note';

const serverApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

const getAuthHeaders = () => {
  const cookieStore = cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const checkSession = async (): Promise<User | null> => {
  const res = await serverApi.get('/auth/session', {
    headers: getAuthHeaders(),
  });
  return res.data ?? null;
};

export const getMe = async (): Promise<User> => {
  const res = await serverApi.get('/users/me', {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await serverApi.get('/notes', {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await serverApi.get(`/notes/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
