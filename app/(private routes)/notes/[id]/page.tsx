import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteByIdServer, getMeServer } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    await getMeServer();
  } catch {
    redirect('/sign-in');
  }

  const note = await fetchNoteByIdServer(id);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
  const description =
    note.content?.trim().length === 0
      ? 'View note details in NoteHub.'
      : note.content.slice(0, 160);

  return {
    title: `Note: ${note.title}`,
    description,
    alternates: { canonical: `${baseUrl}/notes/${id}` },
    openGraph: {
      title: `Note: ${note.title}`,
      description,
      url: `${baseUrl}/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  try {
    await getMeServer();
  } catch {
    redirect('/sign-in');
  }

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
