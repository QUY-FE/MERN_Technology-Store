"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import AuthModal from "#/components/Common/AuthModal";

export type AuthView = "login" | "register" | "forgot";

type AuthModalContextValue = {
  openAuth: (view?: AuthView, onSuccess?: () => void) => void;
  closeAuth: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<AuthView>("login");
  const [isOpen, setIsOpen] = useState(false);
  const [instance, setInstance] = useState(0);
  const onSuccessRef = useRef<(() => void) | undefined>(undefined);

  const openAuth = useCallback((nextView: AuthView = "login", onSuccess?: () => void) => {
    onSuccessRef.current = onSuccess;
    setInstance((current) => current + 1);
    setView(nextView);
    setIsOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsOpen(false);
    onSuccessRef.current = undefined;
  }, []);

  const completeAuth = useCallback(() => {
    const onSuccess = onSuccessRef.current;
    closeAuth();
    onSuccess?.();
  }, [closeAuth]);

  return (
    <AuthModalContext.Provider value={{ openAuth, closeAuth }}>
      {children}
      <AuthModal
        key={instance}
        isOpen={isOpen}
        view={view}
        onViewChange={setView}
        onClose={closeAuth}
        onSuccess={completeAuth}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal phải được dùng trong AuthModalProvider");
  return context;
}
