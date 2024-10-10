'use client'
import { ProjectsFormInput, TeamsFormInput } from "@/schemas";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { DynamicForm } from "./CommonForms";
import { teamsAction } from "@/lib/actions";
import { teamFields, projectFields } from "@/data/forms.data";

interface _ITableFormProps<T extends FieldValues> {
  type: "create" | "update";
  data?: T;
  form: UseFormReturn<T>; // Passed down from the modal
}

export const TeamsForm: React.FC<_ITableFormProps<TeamsFormInput>> = ({ type, data, form }) => {
  return (
    <DynamicForm<TeamsFormInput, any>
      fields={teamFields}
      form={form}
      actionType={type}
      formType="grouped"
      label={type === "create" ? "Create Team" : "Update Team"}
      pendingText="Submitting..."
      data={data}
      action={teamsAction}
    />
  );
};

export const ProjectsForm: React.FC<_ITableFormProps<ProjectsFormInput>> = ({
  type,
  data,
  form,
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
      action={teamsAction}
    />
  );
};