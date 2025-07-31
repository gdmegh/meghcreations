
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
// You can replace the mock data in the service with your actual database calls.

export const products: Product[] = [];
export const sellers: Seller[] = [];
export const categories: string[] = [];
