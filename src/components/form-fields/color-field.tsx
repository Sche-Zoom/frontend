import { useFormContext } from "react-hook-form";

import ColorPicker from "@/components/color-picker";
import { FormValues } from "@/components/form-fields/basic-form-schema";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getScheduleColorVariable } from "@/lib/calendar";

const ColorField = () => {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => {
        const { value, onChange, disabled } = field;

        return field.disabled ? (
          // 읽기 모드
          <div
            className="mr-2 size-4 rounded-full bg-[hsl(var(--schedule))]"
            style={getScheduleColorVariable(field.value)}
          />
        ) : (
          // 수정 모드 form field
          <FormItem>
            <FormLabel>색상</FormLabel>
            <ColorPicker
              formMode
              value={value ?? "pink"}
              disabled={disabled}
              aria-label="일정 색상 선택"
              onChange={(value) => {
                onChange(value);
                form.trigger(field.name); // 유효성 검사
              }}
            />

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ColorField;
