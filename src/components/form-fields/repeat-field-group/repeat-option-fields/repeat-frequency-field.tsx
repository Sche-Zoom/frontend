import React from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { FormControl, FormField } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommonFormFieldProps, RepeatFormValues } from "@/types/form";

type RequiredFormValues = Pick<RepeatFormValues, "repeat_frequency">;

/** ※ 주의사항: form value 형식에 "repeat_frequency" 필수 ※ */
const RepeatFrequencyField = ({ form, editMode = true }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const repeatForm = form as UseFormReturn<RequiredFormValues>;

  // field value change handler
  const changeFieldHandler = (value: React.ChangeEvent | string, field: ControllerRenderProps<RequiredFormValues>) => {
    field.onChange(value);
    repeatForm.trigger(field.name); // 유효성 검사
  };

  return (
    <FormField
      name="repeat_frequency"
      control={repeatForm.control}
      disabled={!editMode}
      render={({ field }) => (
        <Select
          defaultValue={field.value ?? "daily"}
          onValueChange={(value) => changeFieldHandler(value, field)}
          disabled={field.disabled}
        >
          <FormControl className="w-20">
            <SelectTrigger>
              <SelectValue placeholder={field.value} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="weekly">주</SelectItem>
            <SelectItem value="daily">일</SelectItem>
            <SelectItem value="monthly">월</SelectItem>
            <SelectItem value="yearly">년</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default RepeatFrequencyField;
