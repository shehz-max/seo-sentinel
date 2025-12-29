"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

interface UserData {
    credits: number;
    plan: string;
    totalChecks: number;
    singleChecksToday: number;
    bulkDomainsToday: number;
    lastResetDate: string; // YYYY-MM-DD format
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithEmail: (email: string, pass: string) => Promise<void>;
    signupWithEmail: (email: string, pass: string, name: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    canCheckSingle: () => boolean;
    canCheckBulk: (count: number) => boolean;
    remainingSingleChecks: () => number;
    remainingBulkDomains: () => number;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    loginWithGoogle: async () => { },
    loginWithEmail: async () => { },
    signupWithEmail: async () => { },
    resetPassword: async () => { },
    logout: async () => { },
    canCheckSingle: () => false,
    canCheckBulk: () => false,
    remainingSingleChecks: () => 0,
    remainingBulkDomains: () => 0,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        let unsubDoc: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            // Clean up old listener if exists
            if (unsubDoc) {
                unsubDoc();
                unsubDoc = null;
            }

            setUser(firebaseUser);

            if (firebaseUser && db) {
                const userDocRef = doc(db, "users", firebaseUser.uid);

                try {
                    const userDoc = await getDoc(userDocRef);
                    const today = new Date().toISOString().split('T')[0];

                    if (!userDoc.exists()) {
                        // Create new user with all tracking fields
                        const initialData = {
                            credits: 10,
                            plan: "Free",
                            totalChecks: 0,
                            singleChecksToday: 0,
                            bulkDomainsToday: 0,
                            lastResetDate: today
                        };
                        await setDoc(userDocRef, initialData);
                        setUserData(initialData);
                    } else {
                        const data = userDoc.data() as UserData;

                        // Check if we need to reset daily limits
                        if (data.lastResetDate !== today) {
                            const resetData = {
                                ...data,
                                singleChecksToday: 0,
                                bulkDomainsToday: 0,
                                lastResetDate: today
                            };
                            await setDoc(userDocRef, resetData, { merge: true });
                            setUserData(resetData);
                        }
                    }

                    // Real-time listener for user data updates
                    unsubDoc = onSnapshot(userDocRef, (doc) => {
                        if (doc.exists()) {
                            setUserData(doc.data() as UserData);
                        }
                    });
                    setLoading(false);
                } catch (error) {
                    console.error("Firestore error:", error);
                    setLoading(false);
                }
            } else {
                setUserData(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubDoc) unsubDoc();
        };
    }, []);

    const loginWithGoogle = async () => {
        if (!auth) return;
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error: any) {
            console.error("Popup login failed, trying redirect...", error);
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                try {
                    const { signInWithRedirect } = await import("firebase/auth");
                    const provider = new GoogleAuthProvider();
                    await signInWithRedirect(auth, provider);
                } catch (redirectError) {
                    console.error("Redirect login failed", redirectError);
                }
            }
        }
    };

    const loginWithEmail = async (email: string, pass: string) => {
        if (!auth) return;
        await signInWithEmailAndPassword(auth, email, pass);
    };

    const signupWithEmail = async (email: string, pass: string, name: string) => {
        if (!auth) return;
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        if (result.user) {
            await updateProfile(result.user, { displayName: name });
        }
    };

    const resetPassword = async (email: string) => {
        if (!auth) return;
        await sendPasswordResetEmail(auth, email);
    }

    const logout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Helper methods for rate limiting
    const canCheckSingle = () => {
        if (!user) return false; // Guests handled separately
        return true; // Authenticated users have unlimited single checks
    };

    const canCheckBulk = (count: number) => {
        if (!user || !userData) return false;
        const remaining = 50 - (userData.bulkDomainsToday || 0); // Limit updated to 50
        return remaining >= count;
    };

    const remainingSingleChecks = () => {
        return user ? Infinity : 0; // Unlimited for authenticated
    };

    const remainingBulkDomains = () => {
        if (!userData) return 0;
        return Math.max(0, 50 - (userData.bulkDomainsToday || 0));
    };

    return (
        <AuthContext.Provider value={{
            user,
            userData,
            loading,
            loginWithGoogle,
            loginWithEmail,
            signupWithEmail,
            resetPassword,
            logout,
            canCheckSingle,
            canCheckBulk,
            remainingSingleChecks,
            remainingBulkDomains
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
