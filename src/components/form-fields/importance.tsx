import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IMPORTANCE_TYPE } from "@/constants";
import { CommonFormFieldProps } from "@/types/form";

interface RequiredFormValues {
  importance: ScheduleImportanceType;
}

/** ※ 주의사항 form value 형식에 "importance" 필수 ※ */
const ImportanceField = ({ form, editMode }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const importanceForm = form as UseFormReturn<RequiredFormValues>;

  return (
    <FormField
      name="importance"
      control={importanceForm.control}
      disabled={!editMode}
      render={({ field }) => {
        const { value, onChange, disabled } = field;
        return (
          <FormItem className="flex items-center space-x-6 space-y-0">
            <FormLabel>중요도</FormLabel>
            <Select
              defaultValue={value ?? "medium"}
              disabled={disabled}
              onValueChange={(value) => {
                onChange(value);
                importanceForm.trigger(field.name); // 유효성 검사
              }}
            >
              <FormControl>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={IMPORTANCE_TYPE[value ?? "medium"]} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.entries(IMPORTANCE_TYPE).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ImportanceField;
