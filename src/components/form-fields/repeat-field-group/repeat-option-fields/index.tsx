import React from "react";
import { UseFormReturn } from "react-hook-form";

import RepeatFrequencyField from "@/components/form-fields/repeat-field-group/repeat-option-fields/repeat-frequency-field";
import RepeatIntervalField from "@/components/form-fields/repeat-field-group/repeat-option-fields/repeat-interval-field";
import { CommonFormFieldProps, RepeatFormValues } from "@/types/form";

type RequiredFormValues = Pick<RepeatFormValues, "repeat_frequency" | "repeat_interval">;

/** ※ 주의사항: form value 형식에 "repeat_interval", "repeat_frequency" 필수 ※ */
const RepeatOptionFields = ({ form, editMode = true }: Omit<CommonFormFieldProps, "name">) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const repeatForm = form as UseFormReturn<RequiredFormValues>;

  return (
    <div className="flex items-center gap-x-2">
      <span className="mr-2 w-16 text-sm font-medium">반복 기준</span>

      {/* 반복 주기 횟수 input number */}
      <RepeatIntervalField form={repeatForm} editMode={editMode} />

      {/* 반복 주기 select */}
      <RepeatFrequencyField form={repeatForm} editMode={editMode} />
    </div>
  );
};

export default RepeatOptionFields;
