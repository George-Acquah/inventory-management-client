import * as React from "react";
import { cn } from "@/utils/classes.utils";
import { useFormField } from "@/utils/contexts/forms.context";

type InputProps =
  | {
      type: "text" | "email" | "password" | "number" | "radio";
      placeholder?: string;
    }
  | { type: "select"; options?: { value: string | number; label: string }[] } // Make options optional
  | { type: "textarea"; placeholder?: string };
interface CommonProps {
  className?: string;
}

// Input Component
const Input = React.forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  InputProps & CommonProps
>(({ className, type, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { error, formItemId } = useFormField();

  const renderSelect = () => {
    const { options } = props as {
      options: { value: string | number; label: string }[];
    };
    return (
      <select
        id={formItemId}
        className={cn(
          "block w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white rounded-md px-3 py-2",
          error
            ? "border-2 border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
            : "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
          className
        )}
        ref={ref as React.Ref<HTMLSelectElement>}
        {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const renderTextarea = () => (
    <textarea
      id={formItemId}
      className={cn(
        "block w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white rounded-md px-3 py-2",
        error
          ? "border-2 border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
          : "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
        className
      )}
      ref={ref as React.Ref<HTMLTextAreaElement>}
      {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  );

  const renderInput = () => (
    <input
      type={type}
      id={formItemId}
      autoComplete="on"
      aria-label={formItemId}
      className={cn(
        `flex h-10 w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-neutral-400 dark:placeholder:text-neutral-600 
            focus-visible:outline-none transition duration-300 ease-in-out
            disabled:cursor-not-allowed disabled:opacity-50`,
        error
          ? "border-2 border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
          : "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
          
        className
      )}
      ref={ref as React.Ref<HTMLInputElement>}
      {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  );

  const renderDifferentInputs = () => {
    // Render input field based on type
    switch (type) {
      case "select":
        return renderSelect();
      case "textarea":
        return renderTextarea();
      default:
        return renderInput();
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-[2px] rounded-lg transition-all duration-300 ${
        isHovered ? (error ? "bg-red-500" : "bg-blue-500") : "bg-transparent"
      }`}
    >
      {renderDifferentInputs()}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
