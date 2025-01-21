"use client";

import dynamic from "next/dynamic";
import React, { useCallback, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod"; // Import Zod type for better type inference
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardDocumentIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ModalBody, ModalContent, ModalTrigger } from "../ui/modal";
import { Typography } from "../ui/typography";
import { cn } from "@/utils/classes.utils";
import { DeleteBtn } from "./buttons";

interface _ITableModal<
  TSchema extends ZodType<any, any>,
  T = _TableRowType,
  R = _TEntityType
> extends _ITableBase<R> {
  type: "create" | "update" | "delete";
  schema?: TSchema;
  id?: string;
  data?: T;
  trigger?: React.ReactNode;
  className?: string;
  deleteAction?: any;
  table?: boolean;
}

// Loading component for lazy-loaded forms
const Loading = () => (
  <div className="min-h-[30vh] flex flex-col justify-center items-center">
    <Typography variant="h2">Loading...</Typography>
    <Typography variant="p">Please wait</Typography>
  </div>
);

// Dynamically load different forms
const TeamsForm = dynamic(
  () => import("../forms/tableForms").then((mod) => mod.TeamsForm),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

const ProjectsForm = dynamic(
  () => import("../forms/tableForms").then((mod) => mod.ProjectsForm),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

const CreateItemsForm = dynamic(
  () => import("../forms/tableForms").then((mod) => mod.CreateItemsForm),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

const forms: {
  [key: string]: (
    type: "create" | "update",
    form: UseFormReturn<any>,
    data?: any,
    id?: string
  ) => JSX.Element;
} = {
  team: (type, form, data, id = undefined) => (
    <TeamsForm type={type} form={form} data={data} id={id} />
  ),
  project: (type, form, data, id = undefined) => (
    <ProjectsForm type={type} form={form} data={data} id={id} />
  ),
  item: (type, form, data, id = undefined) => (
    <CreateItemsForm type={type} form={form} data={data} id={id} />
  ),
};

// FormModal Component with generic typing
const FormModal = <TSchema extends ZodType<any, any>>({
  entityType,
  type,
  data,
  id,
  schema,
  trigger,
  className,
  deleteAction,
  table
}: _ITableModal<TSchema, _TableRowType, keyof typeof forms>) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-blue-200 dark:bg-blue-300"
      : type === "update"
      ? "bg-lamaSky"
        : "bg-neutral-400 dark:bg-zinc-500 ";
  
  const form = useForm<z.infer<TSchema>>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues:
      type === "update" && data ? (data as z.infer<TSchema>) : undefined,
  });

  // Reset the form whenever the `data` changes (e.g., between create and update)
  useEffect(() => {
    if (type === "update" && data) {
      form.reset(data); // Reset form with updated data if it's in update mode
    } else {
      form.reset(); // Clear the form for creation mode
    }
  }, [data, id, type, form]);

  // Icon rendering logic
  const renderIcon = () => {
    switch (type) {
      case "create":
        return <PlusIcon className="w-6 h-6 text-white" />;
      case "update":
        return <PencilSquareIcon className="w-6 h-6 text-white" />;
      case "delete":
        return <TrashIcon className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  // Form rendering logic
  const renderForm = useCallback(() => {
    if (type === "delete" && id) {
      return (
        <div className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this{" "}
            {entityType}?
          </span>
          <DeleteBtn action={deleteAction} label="Delete" id={id} table={table} className="flex justify-center items-center" />
        </div>
      );
    }

    if (type === "create" || type === "update") {
      const FormComponent = forms[entityType]; // Get the correct form component dynamically
      if (FormComponent) {
        return FormComponent(type, form, data, id); // Render form with dynamic entity, form, and data
      }
      return (
        <div className="min-h-[30vh] flex flex-col justify-center items-center">
          <Typography variant="h2">Form not found!</Typography>
          <Typography variant="p">
            Please close this form and try again
          </Typography>
          <ClipboardDocumentIcon className="w-12 h-12 mt-8" />
        </div>
      );
    }

    return <h1>Invalid Action</h1>;
  }, [entityType, type, data, id, form, deleteAction, table]);

  return (
    <>
      <ModalTrigger
        modalKey={`${String(entityType)}-${type}-${id}`}
        className={cn(
          `${
            trigger ? "" : `${bgColor} ${size}`
          }  p-2 flex items-center justify-center rounded-full`,
          className
        )}
      >
        {trigger ?? renderIcon()}
      </ModalTrigger>
      <ModalBody
        modalKey={`${String(entityType)}-${type}-${id}`}
        className={`md:max-w-[50%] 2xl:max-w-[40%] ${
          type === "delete" ? "md:min-h-[20%] h-10rem" : ""
        }`}
      >
        <ModalContent className="md:px-1">{renderForm()}</ModalContent>
      </ModalBody>
    </>
  );
};

export default FormModal;
