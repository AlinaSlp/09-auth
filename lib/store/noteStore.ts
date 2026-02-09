import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteTag } from '@/types/note';

export const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export type DraftNote = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteStore = {
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'notehub-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
