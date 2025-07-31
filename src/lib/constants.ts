

// Base User, which can be a buyer or a seller
export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  role: 'buyer' | 'seller' | 'admin';
  displayName: string;
  profilePictureUrl: string;
  bio?: string;
};

// This extends User, for when we know the user is a seller
// and might have seller-specific properties.
export type Seller = User & {
    role: 'seller';
    rating?: number; // Calculated field
    totalSales?: number; // Calculated field
};

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  description?: string;
};

export type DigitalAsset = {
  id: string;
  title: string;
  priceType: 'free' | 'fixed';
  price?: number;
  fileUrl: string;
  assetType: string; // e.g., 'UI Kit', 'Icon Set', 'eBook'
  creatorId: string;
  categoryId: string;
  createdAt: Date;
  isPublished: boolean;
  description?: string;
  tags?: string[];
  previewImageUrl: string;
  displayImageUrls?: string[];
  reviews?: Review[];
};

export type Review = {
  id: string;
  assetId: string;
  reviewerId: string;
  rating: number;
  createdAt: Date;
  comment?: string;
  updatedAt?: Date;
};

// IMPORTANT: Now that authentication is set up, you must configure
// Firestore Security Rules in the Firebase console. This is crucial
// to protect your data and ensure only authorized users can perform
// actions like creating or editing products.
// You can start with rules that allow public reads but restrict
// writes to authenticated users who own the content.

export const products: DigitalAsset[] = [];
export const sellers: Seller[] = [];
export const categories: Category[] = [];
