import { UseFormReturn } from "react-hook-form";

interface CommonFormFieldProps<T = any> {
  form: UseFormReturn<T>;
  editMode: boolean;
}

interface RepeatFormValues {
  is_repeat: "yes" | "no";
  repeat_end_option?: "end_date" | "none" | "count";
  repeat_interval?: number;
  repeat_frequency?: RepeatIntervalType;
  repeat_end_count?: number;
  repeat_end_date?: string;
}
