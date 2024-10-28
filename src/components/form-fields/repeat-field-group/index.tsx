import React, { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";

import { FormValues } from "@/components/form-fields/form-schema";
import RepeatEndOptionFields from "@/components/form-fields/repeat-field-group/repeat-end-option-fields";
import RepeatOptionFields from "@/components/form-fields/repeat-field-group/repeat-option-fields";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { REPEAT_FREQUENCY_TYPE } from "@/constants";
import { cn } from "@/lib/utils";

const RadioItem = ({ children }: { children: ReactNode }) => (
  <FormItem className="flex items-center gap-x-3 space-y-0">{children}</FormItem>
);

const RepeatFields = () => {
  const form = useFormContext<FormValues>();
  const { is_repeat, repeat_interval, repeat_frequency, repeat_end_option, repeat_end_date, repeat_end_count } =
    form.watch();
  const isRepeatController = useController<FormValues, "is_repeat">({ name: "is_repeat" });

  isRepeatController.field.disabled;

  const repeatEndOption = {
    end_date: `~ ${repeat_end_date}`,
    count: `${repeat_end_count} 번 반복`,
    none: "없음",
  };

  return (
    <div className="space-y-3">
      {/* 반복 사용 여부 radio group */}
      <FormField
        name="is_repeat"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* radio group control 영역 */}
              <RadioGroup
                defaultValue={field.value}
                className="flex items-center gap-x-4"
                disabled={field.disabled}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.trigger(field.name);
                }}
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
        <RepeatOptionFields />

        {/* 종료 기준 RadioGroup */}
        <RepeatEndOptionFields />
      </div>

      {/* 읽기모드 */}
      {isRepeatController.field.disabled && (
        <div className="flex items-center">
          <span className="mr-4 text-sm font-medium">반복</span>

          {is_repeat ? (
            <div className="flex items-center gap-x-4">
              <span className="text-muted-foreground text-sm font-medium">반복 주기</span>
              <p className="text-sm">
                {repeat_interval} {REPEAT_FREQUENCY_TYPE[repeat_frequency as RepeatFrequencyType]}
              </p>

              <span className="text-muted-foreground ml-4 text-sm font-medium">종료 기준</span>
              <p className="text-sm">{repeatEndOption[repeat_end_option as "end_date" | "none" | "count"]}</p>
            </div>
          ) : (
            "없음"
          )}
        </div>
      )}
    </div>
  );
};

export default RepeatFields;
