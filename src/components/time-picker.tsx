import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function TimePicker({ value, className, ...rest }: InputProps) {
  return (
    <Input
      type="time"
      value={value}
      className={cn(
        "border-input bg-background hover:bg-accent hover:text-accent-foreground w-fit cursor-pointer border font-normal",
        className,
      )}
      {...rest}
    />
  );
}
