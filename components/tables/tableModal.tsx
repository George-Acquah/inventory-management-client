"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
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

interface _ITableModal<
  TSchema extends ZodType<any, any>,
  T = _TableRowType,
  R = _TEntityType
> extends _ITableBase<R> {
  type: "create" | "update" | "delete";
  schema: TSchema;
  id?: string;
  data?: T;
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

const forms: {
  [key: string]: (
    type: "create" | "update",
    form: UseFormReturn<any>,
    data?: any
  ) => JSX.Element;
} = {
  team: (type, form, data) => <TeamsForm type={type} form={form} data={data} />,
  project: (type, form, data) => (
    <ProjectsForm type={type} form={form} data={data} />
  ),
};

// FormModal Component with generic typing
const FormModal = <TSchema extends ZodType<any, any>>({
  entityType,
  type,
  data,
  id,
  schema, // schema is now passed in as a prop
}: _ITableModal<TSchema, _TableRowType, keyof typeof forms>) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-blue-200 dark:bg-blue-300"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-neutral-400 dark:bg-zinc-500";

  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: type === "update" && data ? (data as z.infer<TSchema>) : undefined,

  });

  // Reset the form whenever the `data` changes (e.g., between create and update)
  useEffect(() => {
    if (type === "update" && data) {
      form.reset(data); // Reset form with updated data if it's in update mode
    } else {
      form.reset(); // Clear the form for creation mode
    }
  }, [data, type, form]);

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
        <form className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this{" "}
            {entityType}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    }

    if (type === "create" || type === "update") {
      const FormComponent = forms[entityType]; // Get the correct form component dynamically
      if (FormComponent) {
        return FormComponent(type, form, data); // Render form with dynamic entity, form, and data
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
  }, [entityType, type, data, id, form]);

  return (
    <>
      <ModalTrigger
        modalKey={`${String(entityType)}-${type}`}
        className={`${size} p-0 flex items-center justify-center rounded-full ${bgColor}`}
      >
        {renderIcon()}
      </ModalTrigger>
      <ModalBody modalKey={`${String(entityType)}-${type}`}>
        <ModalContent>{renderForm()}</ModalContent>
      </ModalBody>
    </>
  );
};

export default FormModal;
