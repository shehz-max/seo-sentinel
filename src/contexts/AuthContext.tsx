import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

interface UserData {
    credits: number;
    plan: string;
    totalChecks: number;
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    loading: true,
    loginWithGoogle: async () => { },
    logout: async () => { },
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

                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists()) {
                    const initialData = { credits: 10, plan: "Free", totalChecks: 0 };
                    await setDoc(userDocRef, initialData);
                    setUserData(initialData);
                }

                unsubDoc = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        setUserData(doc.data() as UserData);
                    }
                });
                setLoading(false);
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
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userData, loading, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
