// ToastProvider.tsx
import Toast, { ToastVariant } from "@/components/ui/toasts";
import React, { createContext, useContext, useState, useCallback } from "react";

interface ToastContextType {
  showToast: (message: string, duration: number, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; duration: number; variant?: ToastVariant }[]
    >([]);
  const [idCounter, setIdCounter] = useState(0);

  const showToast = useCallback(
    (message: string, duration: number, variant: ToastVariant = "default") => {
      const newToast = { id: idCounter, duration, message, variant };
      setToasts((prev) => [...prev, newToast]);
      setIdCounter((prev) => prev + 1);

      // Auto-dismiss toast after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, duration);
    },
    [idCounter]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
        <div className="toast__container space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              duration={toast.duration}
              variant={toast.variant}
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            />
          ))}
        </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
