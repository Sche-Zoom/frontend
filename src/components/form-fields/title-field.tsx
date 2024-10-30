import { useController, useFormContext } from "react-hook-form";

import { FormValues } from "@/components/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const TitleField = () => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const { control, trigger } = useFormContext<FormValues>();
  const { field } = useController<FormValues, "title">({ name: "title" });

  return (
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
  );
};

export default TitleField;
