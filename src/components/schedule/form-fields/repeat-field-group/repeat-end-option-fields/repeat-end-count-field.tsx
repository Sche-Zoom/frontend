import { useFormContext } from "react-hook-form";

import { FormValues } from "@/components/schedule/form-fields/basic-form-schema";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const RepeatEndCountField = () => {
  const form = useFormContext<FormValues>();

  return (
    <FormField
      control={form.control}
      name="repeat_end_count"
      disabled={!(form.getValues().repeat_end_option === "count")}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              min={1}
              max={30}
              className="w-16"
              aria-label="반복 종료 횟수"
              {...field}
              onChange={(e) => {
                field.onChange(field.value);
                form.trigger(field.name);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RepeatEndCountField;
