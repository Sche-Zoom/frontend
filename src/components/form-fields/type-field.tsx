import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SCHEDULE_TYPE } from "@/constants";
import { CommonFormFieldProps } from "@/types/form";

interface RequiredFormValues {
  type: ScheduleType;
}

/** ※ 주의사항 form value 형식에 "type" 필수 ※ */
const TypeField = ({ form }: Omit<CommonFormFieldProps, "editMode">) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const typeForm = form as UseFormReturn<RequiredFormValues>;

  return (
    <FormField
      name="type"
      control={typeForm.control}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-6 space-y-0">
          <FormLabel>구분</FormLabel>
          <FormControl>
            <Input type="hidden" {...field} />
          </FormControl>
          <span>{SCHEDULE_TYPE[field.value]}</span>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TypeField;
