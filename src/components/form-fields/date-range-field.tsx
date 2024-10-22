import dayjs from "dayjs";
import { ChangeEventHandler } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { UseFormReturn } from "react-hook-form";

import { DatePicker, DatePickerContent, DatePickerTrigger } from "@/components/date-picker";
import TimePicker from "@/components/time-picker";
import { FormControl, FormField, FormItemGroup } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getDefaultFormatDate, modifyOnlyDate, modifyOnlyTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import { CommonFormFieldProps } from "@/types/form";

interface RequiredFormValues {
  start_date: string;
  end_date: string;
}

/** ※ 주의사항: form value 형식에 "start_date", "end_date" 필수 ※ */
const DateRangeField = ({ form, editMode }: CommonFormFieldProps) => {
  // 구현에 필수적인 form value 형태로 form type 고정 (실제 form field 구조와 별개)
  const dateRangeForm = form as UseFormReturn<RequiredFormValues>;

  const { start_date, end_date } = dateRangeForm.watch();

  // 유효한 date range 확인 함수
  const getIsValidDateRange = () => dayjs(start_date).isBefore(end_date);

  // 시작 날짜 변경 이벤트 핸들러
  const handleChangeStartDate: SelectSingleEventHandler = (date, triggerDate) => {
    const updatedDateTime = getDefaultFormatDate(modifyOnlyDate(start_date, triggerDate));
    dateRangeForm.setValue("start_date", updatedDateTime);
    dateRangeForm.trigger(["start_date", "end_date"]); // 유효성 검사
  };

  // 종료 날짜 변경 이벤트 핸들러
  const handleChangeEndDate: SelectSingleEventHandler = (date, triggerDate) => {
    const updatedDateTime = getDefaultFormatDate(modifyOnlyDate(end_date, triggerDate));
    dateRangeForm.setValue("end_date", updatedDateTime);
    dateRangeForm.trigger(["start_date", "end_date"]); // 유효성 검사
  };

  // 시작 시간 변경 이벤트 핸들러
  const handleChangeStartTime: ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedDateTime = getDefaultFormatDate(modifyOnlyTime(start_date, e.currentTarget.value));
    dateRangeForm.setValue("start_date", updatedDateTime);
    dateRangeForm.trigger(["start_date", "end_date"]); // 유효성 검사
  };

  // 종료 시간 변경 이벤트 핸들러
  const handleChangeEndTime: ChangeEventHandler<HTMLInputElement> = (e) => {
    const updatedDateTime = getDefaultFormatDate(modifyOnlyTime(end_date, e.currentTarget.value));
    dateRangeForm.setValue("end_date", updatedDateTime);
    dateRangeForm.trigger(["start_date", "end_date"]); // 유효성 검사
  };

  // date range field 에서 발생하는 에러 메시지 종합 후 반환하는 함수
  const getDateErrorMessage = () => {
    const { start_date: startDateError, end_date: endDateError } = dateRangeForm.formState.errors;
    if (startDateError) return startDateError.message;
    else if (endDateError) return endDateError.message;
    else return undefined;
  };

  return (
    <div>
      <FormItemGroup className="mb-2 flex flex-wrap gap-y-2">
        <p className="mr-4 text-sm font-medium">시간</p>

        {/* 시작 시간날짜 실제 데이터 */}
        <FormField
          name="start_date"
          render={({ field }) => (
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
          )}
        />

        {/* 시작 날짜(년, 월, 일) 변경 */}
        <DatePicker>
          <DatePickerTrigger
            disabled={!editMode}
            className={cn(!getIsValidDateRange() && "text-destructive hover:text-destructive")}
          >
            {dayjs(start_date).format("YYYY-MM-DD")}
          </DatePickerTrigger>
          <DatePickerContent value={new Date(start_date)} disabled={!editMode} onSelect={handleChangeStartDate} />
        </DatePicker>

        {/* 시작 시간 변경(시, 분) */}
        <TimePicker
          value={dayjs(start_date).format("HH:mm")}
          disabled={!editMode}
          onChange={handleChangeStartTime}
          className={cn(!getIsValidDateRange() && "text-destructive hover:text-destructive")}
        />

        <span>~</span>

        {/* 종료 시간날짜 실제 데이터 */}
        <FormField
          name="end_date"
          render={({ field }) => (
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
          )}
        />

        {/* 종료 날짜(년, 월, 일) 변경 */}
        <DatePicker>
          <DatePickerTrigger
            disabled={!editMode}
            className={cn(!getIsValidDateRange() && "text-destructive hover:text-destructive")}
          >
            {dayjs(end_date).format("YYYY-MM-DD")}
          </DatePickerTrigger>
          <DatePickerContent value={new Date(end_date)} disabled={!editMode} onSelect={handleChangeEndDate} />
        </DatePicker>

        {/* 종료 시간 변경(시, 분) */}
        <TimePicker
          value={dayjs(end_date).format("HH:mm")}
          disabled={!editMode}
          className={cn(!getIsValidDateRange() && "text-destructive hover:text-destructive")}
          onChange={handleChangeEndTime}
        />
      </FormItemGroup>

      {/* 에러메시지 */}
      {getDateErrorMessage() && <span className="text-destructive pl-2 text-sm">{getDateErrorMessage()}</span>}
    </div>
  );
};

export default DateRangeField;
