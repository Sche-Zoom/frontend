interface HttpReqRes<T_Req = unknown, T_Res = unknown> {
  req: T_Req;
  res: T_Res;
}

interface ApiEndpointInfo {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  withCredentials?: boolean;
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
  login: HttpReqRes<LoginReq, null>;
  signup: HttpReqRes<SignupReq, null>;
  checkId: HttpReqRes<CheckIdReq, CheckIdRes>;
  checkEmail: HttpReqRes<CheckEmailReq, CheckEmailRes>;
}

// API Endpoint 정보
export const apiEndpoint: Record<keyof ApiEndpoint, ApiEndpointInfo> = {
  getSchedules: {
    url: "/api/schedule/list",
    method: "GET",
    withCredentials: true,
  },
  getScheduleTags: {
    url: "/api/schedule/total-tags",
    method: "GET",
    withCredentials: true,
  },
  getSummarySchedules: {
    url: "/api/schedule/summary-list",
    method: "GET",
    withCredentials: true,
  },
  modifySchedule: {
    url: "/api/schedule",
    method: "PATCH",
    withCredentials: true,
  },
  modifyRepeatSchedule: {
    url: "/api/schedule/repeat",
    method: "PATCH",
    withCredentials: true,
  },
  getSchedule: {
    url: "/api/schedule",
    method: "GET",
    withCredentials: true,
  },
  deleteSchedule: {
    url: "/api/schedule",
    method: "DELETE",
    withCredentials: true,
  },
  createSchedule: {
    url: "/api/schedule",
    method: "POST",
    withCredentials: true,
  },
  login: {
    url: "/api/auth/login",
    method: "POST",
    withCredentials: true,
  },
  signup: {
    url: "/api/auth/signup",
    method: "POST",
  },
  checkId: {
    url: "/api/auth/check-id",
    method: "POST",
  },
  checkEmail: {
    url: "/api/auth/check-email",
    method: "POST",
  },
};
