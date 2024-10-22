import dayjs from "dayjs";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { DatePicker, DatePickerContent, DatePickerTrigger } from "@/components/date-picker";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CommonFormFieldProps, RepeatFormValues } from "@/types/form";

type RequiredFormValues = Pick<RepeatFormValues, "repeat_end_option" | "repeat_end_date">;

/** ※ 주의사항: form value 형식에 "repeat_end_option", "repeat_end_date" 필수 ※ */
const RepeatEndDateField = ({ form, editMode = true }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const repeatForm = form as UseFormReturn<RequiredFormValues>;

  const changeFieldHandler = (value: React.ChangeEvent | string, field: ControllerRenderProps<RequiredFormValues>) => {
    field.onChange(value);
    repeatForm.trigger(field.name); // 유효성 검사
  };

  return (
    <FormField
      control={repeatForm.control}
      name="repeat_end_date"
      disabled={!(editMode && repeatForm.getValues().repeat_end_option === "end_date")}
      render={({ field }) => {
        const { value, onChange } = field;
        const dateValue = value ? new Date(value) : undefined;
        return (
          <FormItem>
            <DatePicker>
              <DatePickerTrigger formMode={true} {...field}>
                {value ? dayjs(value).format("YYYY-MM-DD") : "---- -- --"}
              </DatePickerTrigger>
              <DatePickerContent
                value={dateValue}
                disabled={field.disabled}
                onSelect={(value) => changeFieldHandler(dayjs(value).format("YYYY-MM-DD"), field)}
              />
            </DatePicker>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RepeatEndDateField;
