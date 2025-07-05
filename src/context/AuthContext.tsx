"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    User
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import axios from "axios";

type AuthContextType = {
    user: User | null;
    isAdmin: boolean;
    dbUser: DBUser | null;
    isLoading: boolean;
    isDBUserLoading: boolean;
    needsCompleteSetup: boolean;
    token: string | null;
    setLoading: (value: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getDBUser: () => Promise<DBUser>;
    setDBUser: (user: Partial<DBUser>) => Promise<DBUser>;
    refreshDBUser: () => Promise<void>;
};
type DBUser = {
    firebase_uid: string;
    name: string;
    email: string;
    phone: string;
    profile_image?: string;
    dob: string;
    gender: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [dbUser, setDbUser] = useState<DBUser | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isDBUserLoading, setIsDBUserLoading] = useState(false);
    const [needsCompleteSetup, setNeedsCompleteSetup] = useState(false);
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                setIsDBUserLoading(true);
                const token = await currentUser.getIdTokenResult();
                setIsAdmin(token.claims.admin === true);
                setToken(token.token);

                try {
                    const dbUserData = await getDBUserInternal();
                    setDbUser(dbUserData);
                    setNeedsCompleteSetup(false);
                } catch (error) {
                    setDbUser(null);
                    if (isAdmin) {
                        setNeedsCompleteSetup(false);
                    } else {
                        setNeedsCompleteSetup(true);
                    }
                } finally {
                    setIsDBUserLoading(false);
                }


            } else {
                setDbUser(null);
                setNeedsCompleteSetup(false);
                setIsDBUserLoading(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (
        name: string,
        email: string,
        password: string
    ): Promise<void> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(userCredential.user, { displayName: name });
            await sendEmailVerification(userCredential.user);
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    // Login function
    const login = async (email: string, password: string): Promise<void> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    // Login with Google
    const loginWithGoogle = async (): Promise<void> => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (error) {
            console.error("Google login failed:", error);
            throw error;
        }
    };

    const getToken = async () => {
        const token = await auth.currentUser?.getIdToken(true);
        return token;
    };

    const getDBUserInternal = async () => {
        const token = await getToken();
        const firebase_uid = auth.currentUser?.uid;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await axios.get(`${baseUrl}/user/${firebase_uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.user as DBUser;
        } catch (error) {
            console.error("Error getting DB user:", error);
            throw error;
        }
    }

    const getDBUser = async () => {
        return await getDBUserInternal();
    }

    const setDBUser = async (userObj: Partial<DBUser>) => {
        const token = await getToken();
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        // Add firebase_uid if not provided
        const userWithUID = {
            ...userObj,
            firebase_uid: auth.currentUser?.uid
        };

        try {
            const response = await axios.post(`${baseUrl}/user`, userWithUID, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newDBUser = response.data.user as DBUser;
            setDbUser(newDBUser);
            setNeedsCompleteSetup(false);
            return newDBUser;
        } catch (error) {
            console.error("Error setting DB user:", error);
            throw error;
        }
    }

    const refreshDBUser = async () => {
        if (user) {
            setIsDBUserLoading(true);
            try {
                const dbUserData = await getDBUserInternal();
                setDbUser(dbUserData);
                setNeedsCompleteSetup(false);
            } catch (error) {
                console.log("DB user doesn't exist");
                setDbUser(null);
                setNeedsCompleteSetup(true);
            } finally {
                setIsDBUserLoading(false);
            }
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error);
            throw error;
        }
    };

    // Reset password
    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error("Password reset failed:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                dbUser,
                isAdmin,
                isLoading,
                isDBUserLoading,
                needsCompleteSetup,
                token,
                setLoading,
                login,
                loginWithGoogle,
                logout,
                register,
                resetPassword,
                getDBUser,
                setDBUser,
                refreshDBUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
} 