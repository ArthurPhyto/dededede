import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './constants';

class FirebaseService {
  private static instance: FirebaseService;
  private app: FirebaseApp;
  private db: Firestore;

  private constructor() {
    this.app = initializeApp(FIREBASE_CONFIG);
    this.db = getFirestore(this.app);
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public getDb(): Firestore {
    return this.db;
  }

  public getApp(): FirebaseApp {
    return this.app;
  }
}

export const firebaseService = FirebaseService.getInstance();
export const db = firebaseService.getDb();