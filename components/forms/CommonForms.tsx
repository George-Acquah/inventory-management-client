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
import { extractImagesFromData, groupFieldConfigs } from "@/utils/root.utils";
import { Typography } from "../ui/typography";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/classes.utils";
import { FileUpload } from "../fileUpload";
import { useModal } from "@/utils/contexts/modal.context";

interface DynamicFormProps<T extends FieldValues, R> {
  fields: _ICommonFieldProps[]; // Define the fields as an array of common field props
  action: any;
  form: UseFormReturn<T>; // UseForm return type inferred for the form schema (T)
  actionType?: "create" | "update"; // Type of action ("add" or "update")
  formType?: "single" | "grouped"; // Default to 'single'
  pendingText?: string;
  label?: string;
  data?: Record<string, any>;
  className?: string;
  includeFiles?: boolean;
  id?: string;
  isModal?: boolean;
  entity?: string;
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
  className,
  includeFiles,
  id,
  isModal,
  entity
}: DynamicFormProps<T, R>) => {
  const initialState: _TActionResult<R> = {
    type: undefined,
    message: null,
  };

  const resolvedAction =
    actionType === "update" && id ? action.bind(null, id) : action;
  const [state, formAction] = useFormState(
    resolvedAction,
    initialState
  ) as unknown as any;

  const { setOpen } = useModal();

  const imageUrls = data ? extractImagesFromData(data) : [];
  
  const [files, setFiles] = includeFiles
    ? useState<File[]>([])
    : [[], () => {}];

  const handleFileUpload = useCallback(
    (newFiles: File[]) => {
      if (includeFiles) {
        setFiles(newFiles);
      }
    },
    [includeFiles]
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const groupedFieldConfigs = groupFieldConfigs(fields);
  const groupData = data ?? {};

  const onSubmit = useCallback(
    async (formData: T) => {
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataObject.append(key, value as string); // Safe casting
        }
      });
      
       if (includeFiles) {
         files.forEach((file) => {
           console.log('FILE TO SUBMIT: ', file);
           formDataObject.append("files", file);
         });
       }

      await formAction(formDataObject);
    },
    [formAction, files, includeFiles, entity, actionType]
  );

  useEffect(() => {
    if (state?.type === "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        if (isModal && entity) {
          setOpen(`${entity}-${actionType}`, false);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

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
                    options={
                      field.type === "select" ? field.options : undefined
                    }
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
    []
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
            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4">
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
        className="w-full max-w-xl mx-auto py-2"
      >
        {showSuccess && state?.type === "success" && (
          <FormSuccess message={state?.message!} />
        )}
        {formType === "single"
          ? renderSingleFields(fields)
          : renderGroupedFields()}

        {includeFiles && (
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} initialUrls={imageUrls} />
          </div>
        )}
        <FormButton
          text={pendingText}
          label={label}
          className={cn("", className)}
        />
      </form>
    </Form>
  );
};