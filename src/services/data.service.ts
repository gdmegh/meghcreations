// This file simulates a data service that would fetch data from a database.
// Replace the mock data and logic with your actual database queries.

import type { Product, Seller } from "@/lib/constants";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";


// Adding a delay to simulate network latency
const simulateNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getSellers(): Promise<Seller[]> {
    await simulateNetworkDelay(50);
    try {
        const sellersCol = collection(db, 'sellers');
        const sellerSnapshot = await getDocs(sellersCol);
        const sellerList = sellerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Seller));
        return sellerList;
    } catch (error) {
        console.error("Error fetching sellers:", error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}

export async function getSellerById(id: string): Promise<Seller | undefined> {
    await simulateNetworkDelay(50);
    try {
        const sellerRef = doc(db, 'sellers', id);
        const sellerSnap = await getDoc(sellerRef);
        if (sellerSnap.exists()) {
            return { id: sellerSnap.id, ...sellerSnap.data() } as Seller;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(`Error fetching seller by ID (${id}):`, error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return undefined;
    }
}

export async function getProducts(): Promise<Product[]> {
    await simulateNetworkDelay(50);
    try {
        const productsCol = collection(db, 'products');
        const productSnapshot = await getDocs(productsCol);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        return productList;
    } catch (error) {
        console.error("Error fetching products:", error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    await simulateNetworkDelay(50);
    try {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            return { id: productSnap.id, ...productSnap.data() } as Product;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(`Error fetching product by ID (${id}):`, error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return undefined;
    }
}

export async function getProductsBySellerId(sellerId: string): Promise<Product[]> {
    await simulateNetworkDelay(50);
    try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where("sellerId", "==", sellerId));
        const querySnapshot = await getDocs(q);
        const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        return productList;
    } catch (error) {
        console.error(`Error fetching products by seller ID (${sellerId}):`, error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}

export async function getCategories(): Promise<string[]> {
    await simulateNetworkDelay(50);
    try {
        const productsCol = collection(db, 'products');
        const productSnapshot = await getDocs(productsCol);
        const categories = new Set(productSnapshot.docs.map(doc => doc.data().category as string));
        return [...categories];
    } catch (error) {
        console.error("Error fetching categories:", error);
        console.log("This might be because you haven't created the Firestore database or set up security rules yet.");
        return [];
    }
}
