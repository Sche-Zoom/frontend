interface PersonalScheduleDetail extends ScheduleDetail {
  type: ScheduleType;
}

interface PersonalSummarySchedule {
  start_date: string; // ISO8601 (YYYY-MM-DD)
  schedules: {
    id: number;
    end_date: string; // ISO8601 (YYYY-MM-DD)
    title: string;
    type: ScheduleType;
    color: ColorType;
    tag_names: string[];
  }[];
}

interface PersonalSchedule {
  id: number;
  title: string;
  type: ScheduleType;
  color: ColorType;
  dates: {
    start_date: string; // ISO8601
    end_date: string; // ISO8601
  }[];
}