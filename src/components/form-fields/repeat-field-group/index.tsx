import React, { ReactNode } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import RepeatEndOptionFields from "@/components/form-fields/repeat-field-group/repeat-end-option-fields";
import RepeatOptionFields from "@/components/form-fields/repeat-field-group/repeat-option-fields";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { CommonFormFieldProps, RepeatFormValues } from "@/types/form";

const RadioItem = ({ children }: { children: ReactNode }) => (
  <FormItem className="flex items-center space-x-3 space-y-0">{children}</FormItem>
);

/** ※ 주의사항: form value 형식에 "is_repeat", "repeat_end_option", "repeat_interval", "repeat_frequency", "repeat_end_count", "repeat_end_date" 필수 */
const RepeatFields = ({ form, editMode }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const repeatForm = form as UseFormReturn<RepeatFormValues>;
  const { is_repeat } = repeatForm.watch();

  // value change handler
  const changeFieldHandler = (value: React.ChangeEvent | string, field: ControllerRenderProps<RepeatFormValues>) => {
    field.onChange(value);
    repeatForm.trigger(field.name); // 유효성 검사
  };

  return (
    <div className="space-y-3">
      {/* 반복 사용 여부 radio group */}
      <FormField
        name="is_repeat"
        control={repeatForm.control}
        disabled={!editMode}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* radio group control 영역 */}
              <RadioGroup
                defaultValue={field.value}
                className="flex items-center space-x-4"
                onValueChange={(value) => changeFieldHandler(value, field)}
                disabled={field.disabled}
              >
                <span className="mr-2 text-sm font-medium">반복</span>

                {/* "사용" radio button */}
                <RadioItem>
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal">사용</FormLabel>
                </RadioItem>

                {/* "사용 안함" radio button */}
                <RadioItem>
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">사용 안함</FormLabel>
                </RadioItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 종료 옵션 목록 Box : 반복 기준, 종료 기준 */}
      <div
        className={cn(
          "border-muted-foreground flex flex-col gap-y-2 rounded-lg border px-4 py-2",
          is_repeat === "no" && "hidden",
        )}
      >
        {/* 반복 옵션 fields: 반복횟수, 반복주기 */}
        <RepeatOptionFields form={repeatForm} editMode={editMode} />

        {/* 종료 기준 RadioGroup */}
        <RepeatEndOptionFields form={repeatForm} editMode={editMode} />
      </div>
    </div>
  );
};

export default RepeatFields;
