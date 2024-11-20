import { SelectValue } from "@radix-ui/react-select";
import { useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { COLORS } from "@/constants";
import { getScheduleColorVariable } from "@/lib/calendar";

export default function ColorTitleField() {
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
              <Select defaultValue={value} onValueChange={onChange} disabled={disabled}>
                <FormControl>
                  <SelectTrigger className="w-32" aria-label="일정 색상 선택">
                    <SelectValue placeholder={<ColorOption color={value} />} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent collisionPadding={{ left: 0 }}>
                  {COLORS.map((color) => (
                    <SelectItem key={color} value={color}>
                      <ColorOption color={color} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            // 읽기 모드
            <div className="flex items-center">
              <p>{field.value}</p>
            </div>
          ) : (
            // 수정 모드 form field
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

const ColorOption = ({ color }: { color: ColorType }) => (
  <div className="flex items-center gap-2">
    <div className="size-4 rounded-full bg-[hsl(var(--schedule))]" style={getScheduleColorVariable(color)} />
    {color}
  </div>
);
