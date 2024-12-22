"use client";

import { ReactNode } from "react";
import { SubmitErrorHandler, SubmitHandler, useFormContext } from "react-hook-form";

import {
  ColorTitleField,
  DateRangeField,
  DescriptionField,
  ImportanceField,
  RepeatFieldGroup,
  TagsField,
} from "@/components/schedule/common/form-fields";
import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";

interface ScheduleFormProps {
  children: ReactNode;
  onSubmit: SubmitHandler<FormValues>;
  onSubmitError?: SubmitErrorHandler<FormValues>;
}

export default function ScheduleForm({ children, onSubmit, onSubmitError }: ScheduleFormProps) {
  const form = useFormContext<FormValues>();
  return (
    <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="box-border flex w-full flex-col gap-y-4">
      <ColorTitleField />
      <DateRangeField />
      <DescriptionField />
      <TagsField />
      <ImportanceField />
      <RepeatFieldGroup />
      {children}
    </form>
  );
}
