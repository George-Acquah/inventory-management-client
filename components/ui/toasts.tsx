import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Typography } from "./typography";

export type ToastVariant = "default" | "success" | "error" | "info" | "warning";

const toastVariants = cva(
  "flex flex-col items-start relative p-4 rounded-md shadow-md transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toastCloseVariants = cva(
  "w-4 h-4 bg-neutral-100 rounded-full cursor-pointer transition-all duration-300",
  {
    variants: {
      variant: {
        default: "text-gray-800",
        success: "text-green-700",
        error: "text-red-700",
        info: "text-blue-700",
        warning: "text-yellow-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration: number; // Duration for the toast to show in milliseconds
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  variant = "default",
  duration,
  onClose,
}) => {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remainingTime = duration - elapsed;

      if (remainingTime <= 0) {
        clearInterval(interval);
        onClose();
      } else {
        const percentage = (remainingTime / duration) * 100;
        setProgress(percentage);
      }
    }, 100); // Update progress every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <div className={toastVariants({ variant })}>
      <div
        className="absolute top-0 left-0 h-1 bg-white transition-all"
        style={{ width: `${progress}%` }}
      />
      <div className="flex flex-row justify-between items-center">
        <Typography variant="span" className="p-0 mr-4">
          {message}
        </Typography>
        <XMarkIcon
          className={toastCloseVariants({ variant })}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Toast;
