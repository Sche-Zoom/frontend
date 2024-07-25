interface HttpReqRes<T_Req = unknown, T_Res = unknown> {
  req: T_Req;
  res: T_Res;
}

interface ApiEndpointInfo {
  url: string;
  method: "GET" | "POST";
}

// API Req, Res 타입 정의
export interface ApiEndpoint {
  getPersonalSchedules: HttpReqRes<GetPersonalSchedulesReq, GetPersonalSchedulesRes>;
  getPersonalTags: HttpReqRes<null, GetPersonalTagsRes>;
  getPersonalSummarySchedules: HttpReqRes<GetPersonalSummarySchedulesReq, GetPersonalSummarySchedulesRes>;
}

// API Endpoint 정보
export const apiEndpoint: Record<keyof ApiEndpoint, ApiEndpointInfo> = {
  getPersonalSchedules: {
    url: "/api/per-schedule/view",
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
};
