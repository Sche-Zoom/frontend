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
  getPersonalSchedules: HttpReqRes<GetPersonalSchedulesReq, GetPersonalSchedulesRes>;
  getPersonalTags: HttpReqRes<null, GetPersonalTagsRes>;
  getPersonalSummarySchedules: HttpReqRes<GetPersonalSummarySchedulesReq, GetPersonalSummarySchedulesRes>;
  getPersonalSchedule: HttpReqRes<null, GetPersonalScheduleRes>;
  modifyPersonalSchedule: HttpReqRes<ModifyPersonalScheduleReq, null>;
  modifyPersonalRepeatSchedule: HttpReqRes<ModifyPersonalRepeatScheduleReq, null>;
  deletePersonalSchedule: HttpReqRes<DeletePersonalScheduleReq, null>;
  createPersonalSchedule: HttpReqRes<CreatePersonalScheduleReq, null>;
}

// API Endpoint 정보
export const apiEndpoint: Record<keyof ApiEndpoint, ApiEndpointInfo> = {
  getPersonalSchedules: {
    url: "/api/per-schedule/list",
    method: "GET",
  },
  getPersonalTags: {
    url: "/api/per-schedule/total-tags",
    method: "GET",
  },
  getPersonalSummarySchedules: {
    url: "/api/per-schedule/summary-list",
    method: "GET",
  },
  modifyPersonalSchedule: {
    url: "/api/per-schedule",
    method: "PATCH",
  },
  modifyPersonalRepeatSchedule: {
    url: "/api/per-schedule/repeat",
    method: "PATCH",
  },
  getPersonalSchedule: {
    url: "/api/per-schedule",
    method: "GET",
  },
  deletePersonalSchedule: {
    url: "/api/per-schedule",
    method: "DELETE",
  },
  createPersonalSchedule: {
    url: "/api/per-schedule",
    method: "POST",
  },
};
