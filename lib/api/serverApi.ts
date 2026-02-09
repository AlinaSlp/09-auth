import 'server-only';

import { headers } from 'next/headers';
import { AxiosResponse } from 'axios';
import { api } from './api';
import { User } from '@/types/user';
import { Note, NotesResponse } from '@/types/note';

export type ServerRequestOptions = {
  cookie?: string;
};

const getAuthHeaders = async (options?: ServerRequestOptions) => {
  if (options?.cookie) return options.cookie;
  const h = await headers();
  return h.get('cookie') ?? '';
};

// ===== Notes (SERVER) =====
export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
};

export async function fetchNotesServer(
  params: FetchNotesParams,
  opts?: ServerRequestOptions
): Promise<FetchNotesResponse> {
  const cookie = await getAuthHeaders(opts);
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
    headers: { cookie },
  });
  return data;
}

export async function fetchNoteByIdServer(
  id: string,
  opts?: ServerRequestOptions
): Promise<Note> {
  const cookie = await getAuthHeaders(opts);
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { cookie },
  });
  return data;
}

// ===== Auth/User (SERVER) =====

export async function checkSessionServer(
  opts?: ServerRequestOptions
): Promise<AxiosResponse<User | null>> {
  const cookie = await getAuthHeaders(opts);
  return api.get<User | null>('/auth/session', {
    headers: { cookie },
  });
}

export async function getMeServer(opts?: ServerRequestOptions): Promise<User> {
  const cookie = await getAuthHeaders(opts);
  const { data } = await api.get<User>('/users/me', {
    headers: { cookie },
  });
  return data;
}
