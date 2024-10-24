import { EventInput } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal";

// 개인 일정에서 사용될 추가 정보 객체 type
export interface PersonalScheduleExtendedProps {
  isRepeat: boolean;
  type: ScheduleType;
  scheduleId: number;
}
// 개인 일정 입력 추가에 사용될 객체
export interface PersonalScheduleInput extends EventInput {
  extendedProps: PersonalScheduleExtendedProps;
}

export interface PersonalScheduleEvent extends EventImpl {
  extendedProps: PersonalScheduleExtendedProps;
}
