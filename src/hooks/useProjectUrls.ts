import { useState, useEffect } from 'react';
import { onSnapshot, Timestamp } from 'firebase/firestore';
import { RandomURL } from '../types';
import { createProjectUrlsQuery } from '../services/queries';

export function useProjectUrls(projectId: string | undefined) {
  const [urls, setUrls] = useState<RandomURL[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setUrls([]);
      setIsLoading(false);
      return;
    }

    const urlsQuery = createProjectUrlsQuery(projectId);

    const unsubscribe = onSnapshot(
      urlsQuery,
      (snapshot) => {
        const urlsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate() 
            : new Date();
            
          return {
            id: doc.id,
            ...data,
            createdAt,
          };
        }) as RandomURL[];
        
        setUrls(urlsData);
        setIsLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error loading URLs:', error);
        setError(error as Error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  return { urls, isLoading, error };
}