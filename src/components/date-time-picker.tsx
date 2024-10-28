import dayjs from "dayjs";
import { type ChangeEventHandler } from "react";
import { type SelectSingleEventHandler } from "react-day-picker";

import { DatePicker, DatePickerContent, DatePickerTrigger } from "@/components/date-picker";
import TimePicker from "@/components/time-picker";

interface Props {
  date: string | Date;
  className?: string;
  onSelectDate: SelectSingleEventHandler;
  onChangeTime: ChangeEventHandler<HTMLInputElement>;
}

function DateTimePicker({ date, className, onSelectDate, onChangeTime }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* date picker(년, 월, 일) */}
      <DatePicker>
        <DatePickerTrigger className={className}>{dayjs(date).format("YYYY-MM-DD")}</DatePickerTrigger>
        <DatePickerContent value={new Date(date)} onSelect={onSelectDate} />
      </DatePicker>

      {/* time picker */}
      <TimePicker value={dayjs(date).format("HH:mm")} onChange={onChangeTime} className={className} />
    </div>
  );
}

export default DateTimePicker;
