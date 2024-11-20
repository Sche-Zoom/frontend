import { useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionField() {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      name="description"
      control={form.control}
      render={({ field }) =>
        field.disabled ? (
          // 읽기 모드
          <Textarea value={field.value} rows={4} disabled className="resize-none" />
        ) : (
          // 수정 모드 form field
          <FormItem>
            <FormLabel>설명</FormLabel>
            <FormControl>
              <Textarea
                placeholder={field.value}
                className="resize-none"
                maxLength={200}
                {...field}
                onBlur={() => {
                  field.onBlur();
                  form.trigger(field.name); // 유효성 검사
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }
    />
  );
}
