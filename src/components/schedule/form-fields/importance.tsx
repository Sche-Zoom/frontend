import { useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IMPORTANCE_TYPE } from "@/constants";

const ImportanceField = () => {
  const { control, trigger } = useFormContext<FormValues>();

  return (
    <FormField
      name="importance"
      control={control}
      render={({ field }) => {
        const { value, onChange, disabled } = field;
        return field.disabled ? (
          <div className="flex items-center">
            <span className="mr-4 text-sm font-medium">중요도</span>
            <p className="text-sm">{IMPORTANCE_TYPE[field.value]}</p>
          </div>
        ) : (
          <FormItem className="flex items-center space-x-6 space-y-0">
            <FormLabel>중요도</FormLabel>
            <Select
              defaultValue={value ?? "medium"}
              disabled={disabled}
              onValueChange={(value) => {
                onChange(value);
                trigger(field.name); // 유효성 검사
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
