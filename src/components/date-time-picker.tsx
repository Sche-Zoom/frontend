import dayjs from "dayjs";
import { type ChangeEventHandler } from "react";
import { type SelectSingleEventHandler } from "react-day-picker";

import { DatePicker, DatePickerContent, DatePickerTrigger } from "@/components/date-picker";
import TimePicker from "@/components/time-picker";

interface Props {
  date: string | Date;
  className?: string;
  dateAriaLabel?: string;
  onSelectDate: SelectSingleEventHandler;
  onChangeTime: ChangeEventHandler<HTMLInputElement>;
}

function DateTimePicker({ date, className, dateAriaLabel, onSelectDate, onChangeTime }: Props) {
  return (
    <div className="flex items-center gap-2">
      {/* date picker(년, 월, 일) */}
      <DatePicker>
        <DatePickerTrigger aria-label={`${dateAriaLabel} 년, 월, 일 선택`} className={className}>
          {dayjs(date).format("YYYY-MM-DD")}
        </DatePickerTrigger>
        <DatePickerContent value={new Date(date)} onSelect={onSelectDate} />
      </DatePicker>

      {/* time picker */}
      <TimePicker
        value={dayjs(date).format("HH:mm")}
        aria-label={`${dateAriaLabel} 시, 분 선택`}
        onChange={onChangeTime}
        className={className}
      />
    </div>
  );
}

export default DateTimePicker;
