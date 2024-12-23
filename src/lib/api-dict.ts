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
  login: HttpReqRes<LoginReq, LoginRes>;
  signup: HttpReqRes<SignupReq, null>;
  checkId: HttpReqRes<CheckIdReq, CheckIdRes>;
  checkEmail: HttpReqRes<CheckEmailReq, CheckEmailRes>;
  findId: HttpReqRes<FindIdReq, FindIdRes>;
  sendEmailCode: HttpReqRes<SendEmailCodeReq, null>;
  verifyEmailCode: HttpReqRes<VerifyEmailCodeReq, VerifyEmailCodeRes>;
  sendPwCode: HttpReqRes<SendPwCodeReq, SendPwCodeRes>;
  verifyPwCode: HttpReqRes<VerifyPwCodeReq, VerifyPwCodeRes>;
  resetPw: HttpReqRes<ResetPwReq, null>;
  getMyInfo: HttpReqRes<null, LoginRes>;
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
  findId: {
    url: "/api/auth/find-id",
    method: "POST",
  },
  sendEmailCode: {
    url: "/api/auth/email/code",
    method: "POST",
  },
  verifyEmailCode: {
    url: "/api/auth/email/verify-code",
    method: "POST",
  },
  sendPwCode: {
    url: "/api/auth/password/code",
    method: "POST",
  },
  verifyPwCode: {
    url: "/api/auth/password/verify-code",
    method: "POST",
  },
  resetPw: {
    url: "/api/auth/password/",
    method: "POST",
  },
  getMyInfo: {
    url: "/api/users/me",
    method: "GET",
    withCredentials: true,
  },
};
