import { SelectValue } from "@radix-ui/react-select";

import { FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { COLORS } from "@/constants";
import { getScheduleColorVariable } from "@/lib/calendar";

interface ColorPickerProps {
  value: ColorType;
  disabled?: boolean;
  formMode: boolean;
  onChange: (value: string) => void;
  "aria-label"?: string;
}

const ColorPicker = (props: ColorPickerProps) => {
  const { value, formMode, onChange, disabled } = props;
  const trigger = <ColorPickerTrigger value={value} aria-label={props["aria-label"]} />;

  return (
    <Select defaultValue={value} onValueChange={onChange} disabled={disabled}>
      {/* color picker 버튼 부분 */}
      {formMode ? <FormControl>{trigger}</FormControl> : trigger}

      {/* color option 목록 부분 */}
      <SelectContent collisionPadding={{ left: 0 }}>
        {COLORS.map((color) => (
          <SelectItem key={color} value={color}>
            <ColorOption color={color} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ColorOption = ({ color }: { color: ColorType }) => (
  <div className="flex items-center gap-2">
    <div className="size-4 rounded-full bg-[hsl(var(--schedule))]" style={getScheduleColorVariable(color)} />
    {color}
  </div>
);

const ColorPickerTrigger = (props: { value: ColorType; "aria-label"?: string }) => (
  <SelectTrigger className="w-32" aria-label={props["aria-label"]}>
    <SelectValue placeholder={<ColorOption color={props.value} />} />
  </SelectTrigger>
);

export default ColorPicker;
