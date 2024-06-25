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
  getPerSchedule: HttpReqRes<GetPerScheduleReq, GetPerScheduleRes>;
  getScheduleTags: HttpReqRes<null, GetPerScheduleFiltersRes>;
}

// API Endpoint 정보
export const apiEndpoint: Record<keyof ApiEndpoint, ApiEndpointInfo> = {
  getPerSchedule: {
    url: "/api/per-schedule/view",
    method: "POST",
  },
  getScheduleTags: {
    url: "/api/per-schedule/total-tags",
    method: "GET",
  },
};
