export interface FilterTag {
  id: number;
  name: string;
}

export interface PerScheduleFilter {
  per_tags: FilterTag[];
  groups: {
    id: number;
    name: string;
    tags: FilterTag[];
  }[];
}

export interface GetPerScheduleReq {
  start_date: string; // ISO8601
  end_date: String; // ISO8601
  tags?: number[];
}

export interface PerSchedule {
  id: number;
  title: string;
  type: "Group" | "Personal";
  color: string;
  dates: {
    start_date: string; // ISO8601
    end_date: string; // ISO8601
  }[];
}

export interface GetPerScheduleRes {
  schedules: PerSchedule[];
}

export interface GetPerScheduleFiltersRes extends PerScheduleFilter {}
