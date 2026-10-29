import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { promises } from '@/data/politten';

const storageKey = 'politten:followed-promises';
const promiseIds = new Set(promises.map((promise) => promise.id));
type FollowedPromisesContextValue = {
  followedIds: string[];
  isReady: boolean;
  toggleFollow: (promiseId: string) => void;
};
const FollowedPromisesContext = createContext<FollowedPromisesContextValue | null>(null);

export function FollowedPromisesProvider({ children }: { children: ReactNode }) {
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFollowedIds([...new Set(parsed.filter((id): id is string => typeof id === 'string' && promiseIds.has(id)))]);
        }
      }
    } catch {
      setFollowedIds([]);
    }
    setIsReady(true);

    const syncFromStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      try {
        const parsed: unknown = event.newValue ? JSON.parse(event.newValue) : [];
        setFollowedIds(Array.isArray(parsed) ? [...new Set(parsed.filter((id): id is string => typeof id === 'string' && promiseIds.has(id)))] : []);
      } catch {
        setFollowedIds([]);
      }
    };
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, []);

  const toggleFollow = useCallback((promiseId: string) => {
    if (!promiseIds.has(promiseId)) return;
    setFollowedIds((current) => {
      const next = current.includes(promiseId)
        ? current.filter((id) => id !== promiseId)
        : [...current, promiseId];
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Keep the in-memory list usable if browser storage is unavailable.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ followedIds, isReady, toggleFollow }), [followedIds, isReady, toggleFollow]);
  return <FollowedPromisesContext.Provider value={value}>{children}</FollowedPromisesContext.Provider>;
}

export function useFollowedPromises() {
  const context = useContext(FollowedPromisesContext);
  if (!context) throw new Error('useFollowedPromises must be used within FollowedPromisesProvider');
  return context;
}
