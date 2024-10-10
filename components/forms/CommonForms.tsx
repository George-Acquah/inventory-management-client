"use client";
import Form, { FormField, FormItem } from "@/utils/contexts/forms.context";
import {
  FormLabel,
  FormControl,
  FormMessage,
  FormSuccess,
  FormDescription,
  FormButton,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn, FieldValues } from "react-hook-form"; // Import necessary types
import { useFormState } from "react-dom"; // Server action hook
import { groupFieldConfigs } from "@/utils/root.utils";
import { Typography } from "../ui/typography";
import React, { useCallback } from "react";

interface DynamicFormProps<T extends FieldValues, R> {
  fields: _ICommonFieldProps[]; // Define the fields as an array of common field props
  action: (
    prevState: _TActionResult<R>,
    formData: FormData
  ) => Promise<_TActionResult<R>>; // Generic form action type
  form: UseFormReturn<T>; // UseForm return type inferred for the form schema (T)
  actionType?: "create" | "update"; // Type of action ("add" or "update")
  formType?: "single" | "grouped"; // Default to 'single'
  pendingText?: string;
  label?: string;
  data?: Record<string, any>;
}

// The generic T represents form schema, and R represents action result data type
export const DynamicForm = <T extends FieldValues, R>({
  fields,
  action,
  form,
  actionType,
  formType = "single",
  pendingText = "Submitting",
  label = "Submit",
  data,
}: DynamicFormProps<T, R>) => {
  const initialState: _TActionResult<R> = {
    type: undefined,
    message: null,
  };

  const [state, formAction] = useFormState<_TActionResult<R>, FormData>(
    action,
    initialState
  );

  const groupedFieldConfigs = groupFieldConfigs(fields);
  const groupData = data ?? {};

  // Handle form submission
  const onSubmit = useCallback(
    async (formData: T) => {
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataObject.append(key, value as string); // Safe casting
        }
      });
      await formAction(formDataObject); // Server-side form action
    },
    [formAction]
  );

  // Function to render single fields
  const renderSingleFields = useCallback(
    (fields: _ICommonFieldProps[]) => (
      <>
        {fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl className="mt-1 mb-2">
                  <Input
                    {...formField}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="form-input"
                  />
                </FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
                {field.renderAfter}
              </FormItem>
            )}
          />
        ))}
      </>
    ),
    [] // Stable dependency
  );

  // Function to render grouped fields
  const renderGroupedFields = useCallback(
    () => (
      <>
        {Object.entries(groupedFieldConfigs).map(([title, fields]) => (
          <React.Fragment key={title}>
            <Typography variant="h3" className="mb-4">
              {title}
            </Typography>
            <div className="lg:grid lg:grid-cols-2 gap-4">
              {renderSingleFields(fields)}
            </div>
          </React.Fragment>
        ))}
      </>
    ),
    [groupedFieldConfigs, renderSingleFields] // Include grouped field configs
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto py-2"
      >
        {formType === "single"
          ? renderSingleFields(fields)
          : renderGroupedFields()}
        {/* Display success message */}
        {state?.type === "success" && <FormSuccess message={state.message} />}
        {/* Submit button */}
        <FormButton text={pendingText} label={label} />
      </form>
    </Form>
  );
};
