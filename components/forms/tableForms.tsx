'use client'
import { CreateItemSchemaType, ProjectsFormInput, TeamsFormInput } from "@/schemas";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { DynamicForm } from "./CommonForms";
import { createItem, teamsAction, updateItem } from "@/lib/actions";
import { teamFields, projectFields, createItemFields } from "@/data/forms.data";

interface _ITableFormProps<T extends FieldValues> {
  type: "create" | "update";
  data?: T;
  id?: string;
  form: UseFormReturn<T>;
}

export const TeamsForm: React.FC<_ITableFormProps<TeamsFormInput>> = ({ type, data, form, id }) => {
  return (
    <DynamicForm<TeamsFormInput, any>
      fields={teamFields}
      form={form}
      actionType={type}
      formType="grouped"
      label={type === "create" ? "Create Team" : "Update Team"}
      pendingText="Submitting..."
      data={data}
      id={type === "create" ? undefined : id}
      action={teamsAction}
      className="mt-4"
    />
  );
};

export const ProjectsForm: React.FC<_ITableFormProps<ProjectsFormInput>> = ({
  type,
  data,
  form,
  id,
}) => {
  return (
    <DynamicForm<ProjectsFormInput, any>
      fields={projectFields}
      form={form}
      actionType={type}
      formType="grouped"
      label={type === "create" ? "Create Project" : "Update Project"}
      pendingText="Submitting..."
      data={data}
      id={type === "create" ? undefined : id}
      action={teamsAction}
      className="mt-4"
    />
  );
};


export const CreateItemsForm: React.FC<_ITableFormProps<CreateItemSchemaType>> = ({
  type,
  data,
  form,
  id,
}) => {
  return (
    <DynamicForm<CreateItemSchemaType, any>
      fields={createItemFields}
      form={form}
      actionType={type}
      formType="grouped"
      label={type === "create" ? "Create Item" : "Update Item"}
      pendingText="Submitting..."
      data={data}
      id={type === 'create' ? undefined : id}
      action={
        type === "create"
          ? (createItem as unknown as any)
          : (updateItem as unknown as any)
      }
      className="mt-4"
      includeFiles={true}
      isModal={true}
      entity="item"
    />
  );
};