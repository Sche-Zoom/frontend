import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

import { DatePicker, DatePickerContent, DatePickerTrigger } from "@/components/date-picker";
import { FormValues } from "@/components/form-fields/basic-form-schema";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

const RepeatEndDateField = () => {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      control={form.control}
      name="repeat_end_date"
      disabled={!(form.getValues().repeat_end_option === "end_date")}
      render={({ field }) => {
        const { value, onChange } = field;
        const dateValue = value ? new Date(value) : undefined;
        return (
          <FormItem>
            <DatePicker>
              <DatePickerTrigger formMode={true} aria-label="반복 종료 날짜 선택" {...field}>
                {value ? dayjs(value).format("YYYY-MM-DD") : "---- -- --"}
              </DatePickerTrigger>
              <DatePickerContent
                value={dateValue}
                disabled={field.disabled}
                onSelect={(value) => {
                  field.onChange(dayjs(value).format("YYYY-MM-DD"));
                  form.trigger(field.name);
                }}
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
