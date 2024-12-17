export const COLLECTIONS = {
  PROJECTS: 'projects',
  URLS: 'urls',
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];