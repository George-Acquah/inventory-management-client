import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  ControllerProps,
} from "react-hook-form";
import { cn } from "../classes.utils";

interface _IFormFieldContextProps {
  name: string;
}

interface _IFormItemContextProps {
  id: string;
}

// Use correct typing for FormField
type FormFieldProps = _IFormFieldContextProps &
  Omit<ControllerProps, "name" | "control">;

const Form = FormProvider;

const FormFieldContext = React.createContext<
  _IFormFieldContextProps | undefined
>(undefined);
const FormItemContext = React.createContext<_IFormItemContextProps | undefined>(
  undefined
);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

// Updated FormField component
const FormField: React.FC<FormFieldProps> = ({
  name,
  rules,
  defaultValue= '',
  render,
  ...controllerProps
}) => {
  const { control } = useFormContext();

  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={render}
        {...controllerProps} // Pass only valid Controller props
      />
    </FormFieldContext.Provider>
  );
};

export { useFormField, FormItem, FormField };
export default Form;