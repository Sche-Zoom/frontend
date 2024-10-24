import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";
import * as React from "react";
import { DayPickerSingleProps } from "react-day-picker";

import { Button, ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const DatePicker = (props: PopoverProps) => <Popover {...props} />;
DatePicker.displayName = "DatePicker";

export type DayPickerContentProps = Omit<DayPickerSingleProps, "mode"> & {
  value: Date | undefined;
  disabled?: boolean;
};

const DatePickerContent = React.forwardRef<HTMLDivElement, DayPickerContentProps>((props, ref) => {
  const { value = new Date(), onSelect, disabled = false, ...rest } = props;
  return (
    <PopoverContent className="w-auto p-0" align="start" ref={ref}>
      <Calendar mode="single" selected={value} onSelect={onSelect} {...rest} />
    </PopoverContent>
  );
});
DatePickerContent.displayName = "DatePickerContent";

const DatePickerTrigger = React.forwardRef<HTMLButtonElement, ButtonProps & { formMode?: boolean }>((props, ref) => {
  const { children, className, formMode = false, ...rest } = props;

  const trigger = (
    <Button variant={"outline"} className={cn("justify-start text-left font-normal", className)} {...rest}>
      {children}
      <CalendarIcon className="ml-2 text-black" />
    </Button>
  );
  return (
    <PopoverTrigger ref={ref} asChild>
      {formMode ? <FormControl>{trigger}</FormControl> : trigger}
    </PopoverTrigger>
  );
});
DatePickerTrigger.displayName = "DatePickerTrigger";

export { DatePicker, DatePickerContent, DatePickerTrigger };
