import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommonFormFieldProps } from "@/types/form";

interface RequiredFormValues {
  description: string;
}

/** ※ 주의사항 form value 형식에 "description" 필수 ※ */
const DescriptionField = ({ form, editMode }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const descriptionForm = form as UseFormReturn<RequiredFormValues>;

  return (
    <FormField
      name="description"
      control={descriptionForm.control}
      disabled={!editMode}
      render={({ field }) => (
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
                descriptionForm.trigger(field.name); // 유효성 검사
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
