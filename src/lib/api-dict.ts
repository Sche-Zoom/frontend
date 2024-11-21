interface HttpReqRes<T_Req = unknown, T_Res = unknown> {
  req: T_Req;
  res: T_Res;
}

interface ApiEndpointInfo {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
}

// API Req, Res 타입 정의
export interface ApiEndpoint {
  getSchedules: HttpReqRes<GetSchedulesReq, GetSchedulesRes>;
  getScheduleTags: HttpReqRes<null, GetScheduleTagsRes>;
  getSummarySchedules: HttpReqRes<GetSummarySchedulesReq, GetSummarySchedulesRes>;
  getSchedule: HttpReqRes<null, GetScheduleRes>;
  modifySchedule: HttpReqRes<ModifyScheduleReq, null>;
  modifyRepeatSchedule: HttpReqRes<ModifyRepeatScheduleReq, null>;
  deleteSchedule: HttpReqRes<DeleteScheduleReq, null>;
  createSchedule: HttpReqRes<CreateScheduleReq, null>;
}

// API Endpoint 정보
export const apiEndpoint: Record<keyof ApiEndpoint, ApiEndpointInfo> = {
  getSchedules: {
    url: "/api/schedule/list",
    method: "GET",
  },
  getScheduleTags: {
    url: "/api/schedule/total-tags",
    method: "GET",
  },
  getSummarySchedules: {
    url: "/api/schedule/summary-list",
    method: "GET",
  },
  modifySchedule: {
    url: "/api/schedule",
    method: "PATCH",
  },
  modifyRepeatSchedule: {
    url: "/api/schedule/repeat",
    method: "PATCH",
  },
  getSchedule: {
    url: "/api/schedule",
    method: "GET",
  },
  deleteSchedule: {
    url: "/api/schedule",
    method: "DELETE",
  },
  createSchedule: {
    url: "/api/schedule",
    method: "POST",
  },
};
