import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommonFormFieldProps } from "@/types/form";

interface RequiredFormValues {
  title: string;
}

/** ※ 주의사항 form value 형식에 "title" 필수 ※ */
const TitleField = ({ form, editMode }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const tagsForm = form as UseFormReturn<RequiredFormValues>;

  return (
    <FormField
      name="title"
      control={tagsForm.control}
      disabled={!editMode}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>제목</FormLabel>
          <FormControl>
            <Input
              placeholder="제목"
              type="text"
              {...field}
              onBlur={() => {
                field.onBlur();
                tagsForm.trigger(field.name); // 유효성 검사
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleField;
