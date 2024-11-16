import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/form-fields/basic-form-schema";
import RepeatEndCountField from "@/components/schedule/form-fields/repeat-field-group/repeat-end-option-fields/repeat-end-count-field";
import RepeatEndDateField from "@/components/schedule/form-fields/repeat-field-group/repeat-end-option-fields/repeat-end-date-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RadioItem = ({ children }: { children: ReactNode }) => (
  <FormItem className="flex items-center space-x-3 space-y-0">{children}</FormItem>
);

const RepeatEndOptionFields = () => {
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
};

export default RepeatEndOptionFields;
