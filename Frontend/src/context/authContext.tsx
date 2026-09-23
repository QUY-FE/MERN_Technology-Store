"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { auth, googleProvider } from "#/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import type { User, AuthContextType } from "#/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const formattedUser: User = {
            id: firebaseUser.uid,
            username: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
          };
          setUser(formattedUser);

          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(formattedUser));
          }
        } else {
          setUser(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem("user");
          }
        }
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Đăng nhập với Google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Chào mừng bạn đến với QN Shop!");
    } catch (error) {
      toast.error( "Đăng nhập Google thất bại!");
      throw error;
    }
  };

  // Đăng nhập
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message ||  "Đăng nhập thất bại!");
      throw error;
    }
  };

  // Đăng ký
  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (username) await updateProfile(user, { displayName: username });
      const formattedUser: User = {
        id: user.uid,
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      setUser(formattedUser);
      localStorage.setItem("user", JSON.stringify(formattedUser));
      toast.success("Đăng ký thành công!");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Đăng ký thất bại!");
      throw error;
    }
  };

  // Đăng xuất
  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Đăng xuất thất bại!");
    }
  };

  // Reset mật khẩu
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Kiểm tra email để đặt lại mật khẩu!");
    } catch (error) {
      
      const err = error as Error;
      toast.error(err.message || "Không thể gửi email khôi phục!");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        registerUser,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được dùng trong AuthProvider");
  return context;
};
