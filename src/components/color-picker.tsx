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
}

const ColorPicker = ({ value, formMode, onChange, disabled }: ColorPickerProps) => {
  const trigger = <ColorPickerTrigger value={value} />;

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

const ColorPickerTrigger = ({ value }: { value: ColorType }) => (
  <SelectTrigger className="w-32">
    <SelectValue placeholder={<ColorOption color={value} />} />
  </SelectTrigger>
);

export default ColorPicker;
