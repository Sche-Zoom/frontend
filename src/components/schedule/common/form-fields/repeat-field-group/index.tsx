import React from "react";
import { useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";
import RepeatEndFields from "@/components/schedule/common/form-fields/repeat-field-group/repeat-end-fields";
import RepeatPeriodFields from "@/components/schedule/common/form-fields/repeat-field-group/repeat-period-fields";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function RepeatFieldGroup() {
  const form = useFormContext<FormValues>();
  const { is_repeat } = form.watch();

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
                <div className="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="font-normal">사용</FormLabel>
                </div>

                {/* "사용 안함" radio button */}
                <div className="flex items-center gap-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className="font-normal">사용 안함</FormLabel>
                </div>
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
        <RepeatPeriodFields />

        {/* 종료 기준 RadioGroup */}
        <RepeatEndFields />
      </div>
    </div>
  );
}
