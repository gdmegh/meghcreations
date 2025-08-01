
// This file simulates a data service that would fetch data from a database.
// Replace the mock data and logic with your actual database queries.

import type { DigitalAsset, Seller, User } from "@/lib/constants";
import { db, storage } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Adding a delay to simulate network latency
const simulateNetworkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Helper function to upload a file and get its URL
async function uploadFileAndGetURL(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}


export async function addProduct(productData: Omit<DigitalAsset, 'id' | 'createdAt' | 'isPublished' | 'previewImageUrl' | 'fileUrl'> & { previewImage: File }): Promise<DigitalAsset> {
    await simulateNetworkDelay(100);
    
    let previewImageUrl = `https://placehold.co/600x400.png`;
    if (productData.previewImage) {
        const filePath = `product-images/${productData.creatorId}/${Date.now()}-${productData.previewImage.name}`;
        previewImageUrl = await uploadFileAndGetURL(productData.previewImage, filePath);
    }

    const newProductData = {
        title: productData.title,
        tags: productData.tags,
        price: productData.price,
        description: productData.description,
        priceType: productData.priceType,
        assetType: productData.assetType,
        creatorId: productData.creatorId,
        isPublished: true,
        createdAt: new Date(),
        previewImageUrl,
        fileUrl: "mock/file.zip",
    };
    
    const docRef = await addDoc(collection(db, "digital_assets"), newProductData);
    
    return {
        id: docRef.id,
        ...newProductData,
    };
}


export async function getSellers(): Promise<Seller[]> {
    await simulateNetworkDelay(50);
    try {
        const sellersCol = collection(db, 'users');
        const q = query(sellersCol, where("role", "in", ["seller", "admin"]));
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
        return undefined;
    }
}

export async function updateUser(userId: string, data: { displayName?: string, bio?: string, profilePictureFile?: File }): Promise<void> {
    const userRef = doc(db, "users", userId);
    const updateData: { [key: string]: any } = {};

    if (data.displayName) updateData.displayName = data.displayName;
    if (data.bio) updateData.bio = data.bio;

    if (data.profilePictureFile) {
        const filePath = `profile-pictures/${userId}/${data.profilePictureFile.name}`;
        const photoURL = await uploadFileAndGetURL(data.profilePictureFile, filePath);
        updateData.profilePictureUrl = photoURL;
    }

    await updateDoc(userRef, updateData);
}


export async function getSellerById(id: string): Promise<Seller | undefined> {
    const user = await getUserById(id);
    if (user && (user.role === 'seller' || user.role === 'admin')) {
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
        return [];
    }
}
