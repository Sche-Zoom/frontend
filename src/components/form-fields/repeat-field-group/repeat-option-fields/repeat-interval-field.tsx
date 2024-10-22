import React from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommonFormFieldProps, RepeatFormValues } from "@/types/form";

type RequiredFormValues = Pick<RepeatFormValues, "repeat_interval">;

/** ※ 주의사항: form value 형식에 "repeat_interval" 필수 ※ */
const RepeatIntervalField = ({ form, editMode = true }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const repeatForm = form as UseFormReturn<RequiredFormValues>;

  // field value change handler
  const changeFieldHandler = (value: React.ChangeEvent | string, field: ControllerRenderProps<RequiredFormValues>) => {
    field.onChange(value);
    repeatForm.trigger(field.name); // 유효성 검사
  };

  return (
    <FormField
      name="repeat_interval"
      control={repeatForm.control}
      disabled={!editMode}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={30}
              className="w-16"
              {...field}
              onChange={(e) => changeFieldHandler(e, field)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RepeatIntervalField;
