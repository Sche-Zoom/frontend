import React from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

import { FormValues } from "@/components/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RepeatOptionFields = () => {
  const form = useFormContext<FormValues>();

  const changeFieldHandler = (value: React.ChangeEvent | string, field: ControllerRenderProps<FormValues>) => {
    field.onChange(value);
    form.trigger(field.name); // 유효성 검사
  };

  return (
    <div className="flex items-center gap-x-2">
      <span className="mr-2 w-16 text-sm font-medium">반복 기준</span>

      {/* 반복 주기 횟수 input number */}
      <FormField
        name="repeat_interval"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="number"
                min={1}
                max={30}
                className="w-16"
                aria-label="반복 주기 횟수"
                {...field}
                onChange={(e) => changeFieldHandler(e, field)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 반복 주기 select */}
      <FormField
        name="repeat_frequency"
        control={form.control}
        render={({ field }) => (
          <Select
            defaultValue={field.value ?? "daily"}
            onValueChange={(value) => changeFieldHandler(value, field)}
            disabled={field.disabled}
          >
            <FormControl className="w-20">
              <SelectTrigger aria-label="반복 주기 선택">
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
    </div>
  );
};

export default RepeatOptionFields;
