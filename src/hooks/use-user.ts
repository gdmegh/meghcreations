
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import type { User } from "@/lib/constants";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribeFirestore = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUser({ id: doc.id, ...doc.data() } as User);
          } else {
            setUser(null);
          }
          setIsLoading(false);
        });

        return () => unsubscribeFirestore();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return { user, firebaseUser, isLoading };
}
