import { UseFormReturn } from "react-hook-form";

import ColorPicker from "@/components/color-picker";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CommonFormFieldProps } from "@/types/form";

interface RequiredFormValues {
  color: ColorType;
}

/** ※ 주의사항: form value 형식에 "color" 필수 */
const ColorField = ({ form, editMode = true }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const colorForm = form as UseFormReturn<RequiredFormValues>;

  return (
    <FormField
      name="color"
      control={colorForm.control}
      disabled={!editMode}
      render={({ field }) => {
        const { value, onChange, disabled } = field;
        return (
          <FormItem>
            <FormLabel>색상</FormLabel>
            <ColorPicker
              formMode
              value={value ?? "pink"}
              disabled={disabled}
              onChange={(value) => {
                onChange(value);
                colorForm.trigger(field.name); // 유효성 검사
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
