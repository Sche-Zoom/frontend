import { ReactNode } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import RepeatEndCountField from "@/components/form-fields/repeat-field-group/repeat-end-option-fields/repeat-end-count-field";
import RepeatEndDateField from "@/components/form-fields/repeat-field-group/repeat-end-option-fields/repeat-end-date-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CommonFormFieldProps, RepeatFormValues } from "@/types/form";

type RequiredFormValues = Pick<RepeatFormValues, "repeat_end_option" | "repeat_end_count" | "repeat_end_date">;

const RadioItem = ({ children }: { children: ReactNode }) => (
  <FormItem className="flex items-center space-x-3 space-y-0">{children}</FormItem>
);

/** ※ 주의사항: form value 형식에 "repeat_end_option", "repeat_end_count", "repeat_end_date" 필수 ※ */
const RepeatEndOptionFields = ({ form, editMode = true }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const repeatForm = form as UseFormReturn<RequiredFormValues>;

  // field value change handler
  const changeFieldHandler = (value: React.ChangeEvent | string, field: ControllerRenderProps<RequiredFormValues>) => {
    field.onChange(value);
    repeatForm.trigger(field.name); // 유효성 검사
  };

  return (
    <FormField
      name="repeat_end_option"
      control={repeatForm.control}
      disabled={!editMode}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              defaultValue={field.value}
              className="flex flex-wrap items-center space-x-4"
              onValueChange={(value) => changeFieldHandler(value, field)}
              disabled={field.disabled}
            >
              <span className="mr-2 w-16 text-sm font-medium">종료 기준</span>
              {/* 없음 옵션 checkbox */}
              <RadioItem>
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel className="font-normal">없음</FormLabel>
              </RadioItem>

              {/* 종료 날짜 옵션 checkbox */}
              <RadioItem>
                {/* 체크박스 부분 */}
                <FormControl>
                  <RadioGroupItem value="end_date" />
                </FormControl>
                <FormLabel className="font-normal">종료날짜</FormLabel>

                {/* 반복 종료 날짜 date picker */}
                <RepeatEndDateField
                  form={repeatForm}
                  editMode={editMode && repeatForm.getValues().repeat_end_option === "end_date"}
                />
              </RadioItem>

              {/* 횟수 옵션 checkbox */}
              <RadioItem>
                {/* 체크박스 부분 */}
                <FormControl>
                  <RadioGroupItem value="count" />
                </FormControl>
                <FormLabel className="font-normal">횟수</FormLabel>

                {/* 반복 횟수 input 부분 */}
                <RepeatEndCountField
                  form={repeatForm}
                  editMode={editMode && repeatForm.getValues().repeat_end_option === "count"}
                />
              </RadioItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RepeatEndOptionFields;
