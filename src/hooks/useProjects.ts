import { useState, useEffect } from 'react';
import { onSnapshot, Timestamp } from 'firebase/firestore';
import { Project } from '../types';
import { createProjectsQuery } from '../services/queries';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const projectsQuery = createProjectsQuery();

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const projectsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate() 
            : new Date();
            
          return {
            id: doc.id,
            ...data,
            createdAt,
          };
        }) as Project[];
        
        setProjects(projectsData);
        setIsLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Error loading projects:', error);
        setError(error as Error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { projects, isLoading, error };
}