import dayjs from "dayjs";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { DatePicker, DatePickerContent, DatePickerTrigger } from "@/components/date-picker";
import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioItem = ({ children }: { children: ReactNode }) => (
  <FormItem className="flex items-center space-x-3 space-y-0">{children}</FormItem>
);

export default function RepeatEndFields() {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      name="repeat_end_option"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              defaultValue={field.value}
              className="flex flex-wrap items-center space-x-4"
              onValueChange={(value) => {
                field.onChange(value);
                form.trigger(field.name);
              }}
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
                {/* repeat_end_date 체크박스 부분 */}
                <FormControl>
                  <RadioGroupItem value="end_date" />
                </FormControl>
                <FormLabel className="font-normal">종료날짜</FormLabel>

                {/* 반복 종료 날짜 date picker */}
                <RepeatEndDateField />
              </RadioItem>

              {/* 횟수 옵션 checkbox */}
              <RadioItem>
                {/* repeat_end_count 체크박스 부분 */}
                <FormControl>
                  <RadioGroupItem value="count" />
                </FormControl>
                <FormLabel className="font-normal">횟수</FormLabel>

                {/* 반복 횟수 input 부분 */}
                <RepeatEndCountField />
              </RadioItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const RepeatEndCountField = () => {
  const form = useFormContext<FormValues>();
  return (
    <FormField
      control={form.control}
      name="repeat_end_count"
      disabled={!(form.getValues().repeat_end_option === "count")}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={30}
              className="w-16"
              aria-label="반복 종료 횟수"
              {...field}
              onChange={(e) => {
                field.onChange(field.value);
                form.trigger(field.name);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

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
