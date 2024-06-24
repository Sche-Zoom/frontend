import { GetPerScheduleFiltersRes, GetPerScheduleReq, GetPerScheduleRes } from "@/types/api/per-schedule";

// 개인 일정(개인 일정 + 본인 참가 그룹 일정) 조회
export async function getPerSchedule(req: GetPerScheduleReq): Promise<GetPerScheduleRes> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/per-schedule/view`, { method: "post" });

  // 정상 처리 되지 않은 경우 오류 발생
  if (!res.ok) throw new Error("정상적으로 데이터를 불러오지 못했습니다.");

  return res.json();
}

//개인 일정 필터링 내용 조회 (개인 일정 태그 목록 + 그룹 목록 및 각 그룹별 태그 목록)
export async function getPerScheduleFilters(): Promise<GetPerScheduleFiltersRes> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/per-schedule/total_tags`);

  // 정상 처리 되지 않은 경우 오류 발생
  if (!res.ok) throw new Error("정상적으로 데이터를 불러오지 못했습니다.");

  return res.json();
}
