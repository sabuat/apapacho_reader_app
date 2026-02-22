import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ReadingProgress {
  bookId: string;
  currentChapter: number;
  progress: number;
  lastRead: string;
}

const STORAGE_KEY = "reading_progress";

export function useReadingProgress() {
  const [progress, setProgress] = useState<ReadingProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Load progress from storage
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading reading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (bookId: string, chapter: number, totalChapters: number) => {
    try {
      const newProgress: ReadingProgress = {
        bookId,
        currentChapter: chapter,
        progress: chapter / totalChapters,
        lastRead: new Date().toISOString(),
      };

      const updated = progress.filter((p) => p.bookId !== bookId);
      updated.push(newProgress);
      setProgress(updated);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving reading progress:", error);
    }
  };

  const getProgress = (bookId: string): ReadingProgress | undefined => {
    return progress.find((p) => p.bookId === bookId);
  };

  const clearProgress = async (bookId?: string) => {
    try {
      if (bookId) {
        const updated = progress.filter((p) => p.bookId !== bookId);
        setProgress(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } else {
        setProgress([]);
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error clearing reading progress:", error);
    }
  };

  return {
    progress,
    loading,
    saveProgress,
    getProgress,
    clearProgress,
  };
}
