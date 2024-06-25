interface FilterTag {
  id: number;
  name: string;
}

interface PerScheduleFilter {
  per_tags: FilterTag[];
  groups: {
    id: number;
    name: string;
    tags: FilterTag[];
  }[];
}

interface GetPerScheduleReq {
  start_date: string; // ISO8601
  end_date: String; // ISO8601
  tags?: number[];
}

interface PerSchedule {
  id: number;
  title: string;
  type: "Group" | "Personal";
  color: string;
  dates: {
    start_date: string; // ISO8601
    end_date: string; // ISO8601
  }[];
}

interface GetPerScheduleRes {
  schedules: PerSchedule[];
}

interface GetPerScheduleFiltersRes extends PerScheduleFilter {}
