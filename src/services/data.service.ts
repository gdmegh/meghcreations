
// This file simulates a data service that would fetch data from a database.
// Replace the mock data and logic with your actual database queries.

import type { Product, Seller } from "@/lib/constants";

const sellersData: Seller[] = [];
  
const productsData: Product[] = [];

// Adding a delay to simulate network latency
const simulateNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getSellers(): Promise<Seller[]> {
    await simulateNetworkDelay(50);
    return sellersData;
}

export async function getSellerById(id: string): Promise<Seller | undefined> {
    await simulateNetworkDelay(50);
    return sellersData.find(s => s.id === id);
}

export async function getProducts(): Promise<Product[]> {
    await simulateNetworkDelay(50);
    return productsData;
}

export async function getProductById(id: string): Promise<Product | undefined> {
    await simulateNetworkDelay(50);
    return productsData.find(p => p.id === id);
}

export async function getProductsBySellerId(sellerId: string): Promise<Product[]> {
    await simulateNetworkDelay(50);
    return productsData.filter(p => p.sellerId === sellerId);
}

export async function getCategories(): Promise<string[]> {
    await simulateNetworkDelay(50);
    return [...new Set(productsData.map(p => p.category))];
}
