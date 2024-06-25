import apiRequest from "@/lib/api";

// 개인 일정(개인 일정 + 본인 참가 그룹 일정) 조회
export async function getPerSchedule(req: GetPerScheduleReq): Promise<GetPerScheduleRes> {
  return apiRequest("getPerSchedule", req);
}

//개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
export async function getScheduleTags(): Promise<GetPerScheduleFiltersRes> {
  return apiRequest("getScheduleTags", null);
}
