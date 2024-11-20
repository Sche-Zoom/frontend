import dayjs from "dayjs";
import { ChangeEvent } from "react";
import { useController, useFormContext } from "react-hook-form";

import DateTimePicker from "@/components/date-time-picker";
import { FormValues } from "@/components/schedule/common/form-fields/basic-form-schema";
import { getDefaultFormatDate, modifyOnlyDate, modifyOnlyTime } from "@/lib/date";

export default function DateRangeField() {
  const form = useFormContext<FormValues>();
  const { start_date, end_date } = form.watch();
  const startDateController = useController<FormValues, "start_date">({ name: "start_date" });
  const endDateController = useController<FormValues, "end_date">({ name: "end_date" });

  // 날짜 변경 이벤트 핸들러
  const handleChangeDate = (type: "start_date" | "end_date", date: Date) => {
    const updatedDateTime = getDefaultFormatDate(modifyOnlyDate(form.getValues()[type], date));
    form.setValue(type, updatedDateTime);
    form.trigger(["start_date", "end_date"]); // 유효성 검사
  };

  // 시간 변경 이벤트 핸들러
  const handleChangeTime = (type: "start_date" | "end_date", e: ChangeEvent<HTMLInputElement>) => {
    const updatedDateTime = getDefaultFormatDate(modifyOnlyTime(form.getValues()[type], e.currentTarget.value));
    form.setValue(type, updatedDateTime);
    form.trigger(["start_date", "end_date"]); // 유효성 검사
  };

  // date range field 에서 발생하는 에러 메시지 종합 후 반환하는 함수
  const getDateErrorMessage = () => {
    const { start_date: startDateError, end_date: endDateError } = form.formState.errors;
    if (startDateError) return startDateError.message;
    else if (endDateError) return endDateError.message;
    else return undefined;
  };

  return (
    <div>
      <div className="mb-2 flex w-full flex-wrap items-center gap-2">
        <span className="mr-4 text-sm font-medium">시간</span>

        {/* 시작 날짜 datetime picker  */}
        {startDateController.field.disabled ? (
          // 읽기 모드
          <span className="text-sm">{dayjs(start_date).format("YYYY-MM-DD HH:mm:ss")}</span>
        ) : (
          // 수정 모드 datetime picker
          <DateTimePicker
            date={start_date}
            dateAriaLabel="시작 날짜"
            onSelectDate={(date, selectedDate) => handleChangeDate("start_date", selectedDate)}
            onChangeTime={(e) => handleChangeTime("start_date", e)}
            className={!dayjs(start_date).isBefore(end_date) ? "text-destructive hover:text-destructive" : ""}
          />
        )}

        <span>~</span>

        {/* 종료 날짜 datetime picker  */}
        {endDateController.field.disabled ? (
          // 읽기 모드
          <span className="text-sm">{dayjs(end_date).format("YYYY-MM-DD HH:mm:ss")}</span>
        ) : (
          // 수정 모드 datetime picker
          <DateTimePicker
            date={end_date}
            dateAriaLabel="종료 날짜"
            onSelectDate={(date, selectedDate) => handleChangeDate("end_date", selectedDate)}
            onChangeTime={(e) => handleChangeTime("end_date", e)}
            className={!dayjs(start_date).isBefore(end_date) ? "text-destructive hover:text-destructive" : ""}
          />
        )}
      </div>

      {/* 에러메시지 */}
      {getDateErrorMessage() && <span className="text-destructive pl-2 text-sm">{getDateErrorMessage()}</span>}
    </div>
  );
}
