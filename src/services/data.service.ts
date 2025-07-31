// This file simulates a data service that would fetch data from a database.
// Replace the mock data and logic with your actual database queries.

import type { DigitalAsset, Seller, Category, User } from "@/lib/constants";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";


// Adding a delay to simulate network latency
const simulateNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

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
        // In a real app, you might fetch additional seller-specific data here.
        // For now, we'll just cast the user to a Seller.
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
    try {
        const categoriesCol = collection(db, 'categories');
        const categorySnapshot = await getDocs(categoriesCol);
        const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
        return categoryList;
    } catch (error) {
        console.error("Error fetching categories:", error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
    await simulateNetworkDelay(50);
    try {
        const categoryRef = doc(db, 'categories', id);
        const categorySnap = await getDoc(categoryRef);
        if (categorySnap.exists()) {
            return { id: categorySnap.id, ...categorySnap.data() } as Category;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(`Error fetching category by ID (${id}):`, error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return undefined;
    }
}
