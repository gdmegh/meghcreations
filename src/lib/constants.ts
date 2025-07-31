
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  sellerId: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  features: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
};

export type Seller = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  rating: number;
  totalSales: number;
};

// This file is now primarily for type definitions.
// The data has been moved to src/services/data.service.ts
// to simulate a dynamic data fetching architecture.

// IMPORTANT: Now that authentication is set up, you must configure
// Firestore Security Rules in the Firebase console. This is crucial
// to protect your data and ensure only authorized users can perform
// actions like creating or editing products.
// You can start with rules that allow public reads but restrict
// writes to authenticated users who own the content.

export const products: Product[] = [];
export const sellers: Seller[] = [];
export const categories: string[] = [];
