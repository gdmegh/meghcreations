
// This file simulates a data service that would fetch data from a database.
// Replace the mock data and logic with your actual database queries.

import type { DigitalAsset, Seller, Category, User } from "@/lib/constants";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

// Adding a delay to simulate network latency
const simulateNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Mock data storage
let mockCategories: Category[] = [
    { id: 'cat-1', name: 'UI Kits', createdAt: new Date() },
    { id: 'cat-2', name: 'Icons', createdAt: new Date() },
    { id: 'cat-3', name: 'Website Templates', createdAt: new Date() },
    { id: 'cat-4', name: 'Landing Pages', parentId: 'cat-3', createdAt: new Date() },
];

export async function getSellers(): Promise<Seller[]> {
    await simulateNetworkDelay(50);
    try {
        const sellersCol = collection(db, 'users');
        const q = query(sellersCol, where("role", "==", "seller"));
        const sellerSnapshot = await getDocs(q);
        const sellerList = sellerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Seller));
        return sellerList;
    } catch (error) {
        console.error("Error fetching sellers:", error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}

export async function getUserById(id: string): Promise<User | undefined> {
    await simulateNetworkDelay(50);
    try {
        const userRef = doc(db, 'users', id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return { id: userSnap.id, ...userSnap.data() } as User;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(`Error fetching user by ID (${id}):`, error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return undefined;
    }
}

export async function getSellerById(id: string): Promise<Seller | undefined> {
    const user = await getUserById(id);
    if (user && user.role === 'seller') {
        return user as Seller;
    }
    return undefined;
}

export async function getProducts(): Promise<DigitalAsset[]> {
    await simulateNetworkDelay(50);
    try {
        const productsCol = collection(db, 'digital_assets');
        const productSnapshot = await getDocs(productsCol);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DigitalAsset));
        return productList;
    } catch (error) {
        console.error("Error fetching products:", error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}

export async function getProductById(id: string): Promise<DigitalAsset | undefined> {
    await simulateNetworkDelay(50);
    try {
        const productRef = doc(db, 'digital_assets', id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            return { id: productSnap.id, ...productSnap.data() } as DigitalAsset;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(`Error fetching product by ID (${id}):`, error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return undefined;
    }
}

export async function getProductsBySellerId(sellerId: string): Promise<DigitalAsset[]> {
    await simulateNetworkDelay(50);
    try {
        const productsRef = collection(db, 'digital_assets');
        const q = query(productsRef, where("creatorId", "==", sellerId));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DigitalAsset));
        return productList;
    } catch (error) {
        console.error(`Error fetching products by seller ID (${sellerId}):`, error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}

export async function getCategories(): Promise<Category[]> {
    await simulateNetworkDelay(50);
    // In a real app, this would fetch from Firestore.
    // We return a copy to prevent direct mutation of the mock data.
    return [...mockCategories];
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
    await simulateNetworkDelay(50);
    return mockCategories.find(c => c.id === id);
}

export async function addCategory(categoryData: { name: string; parentId?: string }): Promise<Category> {
    await simulateNetworkDelay(100);
    const newCategory: Category = {
        id: `cat-${Date.now()}`,
        createdAt: new Date(),
        ...categoryData,
    };
    mockCategories.push(newCategory);
    return newCategory;
}

export async function updateCategory(id: string, categoryData: { name: string; parentId?: string }): Promise<Category | undefined> {
    await simulateNetworkDelay(100);
    const categoryIndex = mockCategories.findIndex(c => c.id === id);
    if (categoryIndex > -1) {
        mockCategories[categoryIndex] = {
            ...mockCategories[categoryIndex],
            ...categoryData,
        };
        return mockCategories[categoryIndex];
    }
    return undefined;
}

export async function deleteCategory(id: string): Promise<void> {
    await simulateNetworkDelay(100);
    mockCategories = mockCategories.filter(c => c.id !== id);
}
