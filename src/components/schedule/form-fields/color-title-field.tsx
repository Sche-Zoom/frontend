import { useFormContext } from "react-hook-form";

import ColorPicker from "@/components/color-picker";
import { FormValues } from "@/components/schedule/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getScheduleColorVariable } from "@/lib/calendar";

function ColorTitleField() {
  const { control, trigger } = useFormContext<FormValues>();

  return (
    <div className="mb-2 flex w-full flex-wrap items-center gap-2">
      {/* color picker */}
      <FormField
        control={control}
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
                  trigger(field.name); // 유효성 검사
                }}
              />

              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* title input */}
      <FormField
        name="title"
        control={control}
        render={({ field }) =>
          field.disabled ? (
            <div className="flex items-center">
              <p>{field.value}</p>
            </div>
          ) : (
            <FormItem className="flex-1">
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input
                  placeholder="제목"
                  type="text"
                  {...field}
                  onBlur={() => {
                    field.onBlur();
                    trigger(field.name); // 유효성 검사
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }
      />
    </div>
  );
}

export default ColorTitleField;
