import { supabase } from '@/lib/supabase';

export interface Book {
  id: number;
  title: string;
  author: string;
  slug?: string;
  description?: string | null;
  published: boolean;
  cover_url?: string | null;
}

export interface Chapter {
  id: number;
  book_id: number;
  chapter_number: number;
  title: string;
  content: string;
}

const backendApiUrl = process.env.EXPO_PUBLIC_BACKEND_API_URL;

async function fetchFromBackend<T>(path: string): Promise<T | null> {
  if (!backendApiUrl) return null;

  const response = await fetch(`${backendApiUrl}${path}`);
  if (!response.ok) {
    throw new Error(`Falha na API: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getPublishedBooks(): Promise<Book[]> {
  const fromBackend = await fetchFromBackend<Book[]>('/books?published=true');
  if (fromBackend) return fromBackend;

  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('published', true)
    .order('id', { ascending: false });

  if (error) throw error;
  return (data ?? []) as Book[];
}

export async function getBookById(bookId: number): Promise<Book | null> {
  const fromBackend = await fetchFromBackend<Book>(`/books/${bookId}`);
  if (fromBackend) return fromBackend;

  const { data, error } = await supabase.from('books').select('*').eq('id', bookId).single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data as Book;
}

export async function getChapterByNumber(bookId: number, chapterNumber: number): Promise<Chapter | null> {
  const fromBackend = await fetchFromBackend<Chapter>(`/books/${bookId}/chapters/${chapterNumber}`);
  if (fromBackend) return fromBackend;

  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('book_id', bookId)
    .eq('chapter_number', chapterNumber)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data as Chapter;
}

export async function getChapterCount(bookId: number): Promise<number> {
  const fromBackend = await fetchFromBackend<{ count: number }>(`/books/${bookId}/chapters/count`);
  if (fromBackend) return fromBackend.count;

  const { count, error } = await supabase
    .from('chapters')
    .select('*', { count: 'exact', head: true })
    .eq('book_id', bookId);

  if (error) throw error;
  return count ?? 0;
}
