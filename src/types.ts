import { Timestamp } from 'firebase/firestore';

export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  location?: string;
  language: string;
  createdAt: Timestamp | Date;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  title: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  description: string;
  image: string;
  location: string;
  createdAt: Timestamp | Date;
}

export interface MarketPrice {
  id: string;
  crop: string;
  price: number;
  location: string;
  unit: string;
  updatedAt: Timestamp | Date;
}

export interface Fertilizer {
  id: string;
  name: string;
  type: string;
  timing: string;
  description: string;
  benefits: string[];
  crops: string[];
  image?: string;
}

export interface Machinery {
  id: string;
  name: string;
  type: string;
  description: string;
  priceRange: string;
  image: string;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: Timestamp | Date;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: Timestamp | Date;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}
