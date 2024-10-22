import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommonFormFieldProps, RepeatFormValues } from "@/types/form";

type RequiredFormValues = Pick<RepeatFormValues, "repeat_end_option" | "repeat_end_count">;

/** ※ 주의사항: form value 형식에 "repeat_end_option", "repeat_end_count" 필수 ※ */
const RepeatEndCountField = ({ form, editMode = true }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const repeatForm = form as UseFormReturn<RequiredFormValues>;

  const changeFieldHandler = (value: React.ChangeEvent | string, field: ControllerRenderProps<RequiredFormValues>) => {
    field.onChange(value);
    repeatForm.trigger(field.name); // 유효성 검사
  };

  return (
    <FormField
      control={repeatForm.control}
      name="repeat_end_count"
      disabled={!(editMode && repeatForm.getValues().repeat_end_option === "count")}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={30}
              className="w-16"
              {...field}
              onChange={(e) => changeFieldHandler(e, field)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RepeatEndCountField;
