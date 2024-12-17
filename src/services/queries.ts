import { query, collection, orderBy, where, QueryConstraint } from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from './collections';

export const createProjectsQuery = () => {
  const constraints: QueryConstraint[] = [
    orderBy('createdAt', 'desc')
  ];

  return query(
    collection(db, COLLECTIONS.PROJECTS),
    ...constraints
  );
};

export const createProjectUrlsQuery = (projectId: string) => {
  const constraints: QueryConstraint[] = [
    where('projectId', '==', projectId),
    orderBy('createdAt', 'desc')
  ];

  return query(
    collection(db, COLLECTIONS.URLS),
    ...constraints
  );
};