import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { getPersonalSummarySchedules } from "@/api/personal-schedule";
import BasicLoader from "@/components/basic-loader";
import ErrorBoundary from "@/components/error-boundary";
import { Separator } from "@/components/ui/separator";
import { SCHEDULE_TYPE } from "@/constants";
import { useCalendarContext } from "@/contexts/calendar";
import { getScheduleColorVariable } from "@/lib/calendar";

export default function CalendarSideMenu() {
  const { menuTab } = useCalendarContext();

  if (menuTab === null) return;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <aside className={"border-box hidden h-full w-72 border p-4 lg:inline-block"}>
            <BasicLoader />
          </aside>
        }
      >
        {/* 월단위 일정 요약 사이드메뉴  */}
        {menuTab === "summarySchedules" && <SummarySchedules />}
      </Suspense>
    </ErrorBoundary>
  );
}

const SummarySchedules = () => {
  const { checkedTagIds, currentDate } = useCalendarContext();

  const router = useRouter();

  const { data } = useSuspenseQuery({
    queryKey: ["personal_schedule_summary", "list", checkedTagIds, currentDate],
    queryFn: () =>
      getPersonalSummarySchedules({ selected_date: currentDate, ...(checkedTagIds && { tag_ids: checkedTagIds }) }),
  });

  return (
    <aside className={"border-box hidden h-full w-72 border p-4 lg:inline-block"}>
      <h3 className="mb-2 text-sm">일정 목록</h3>
      {/*  해당월의 전체 일정 목록 */}
      {data.side_schedules.map((dailySchedules) => (
        <>
          {/* 일정 시작 날짜기준 일별 일정 목록 */}
          <div key={dailySchedules.start_date} className="p-2">
            <p className="mb-2 text-sm">{dailySchedules.start_date}</p>
            {/* 특정 날짜 일정 목록 */}
            {dailySchedules.schedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`mb-2 border-l-4 border-[hsl(var(--schedule))] bg-[hsl(var(--schedule-background))] p-2`}
                style={getScheduleColorVariable(schedule.color)}
                onClick={() => router.push(`/schedule/${schedule.id}`)}
              >
                <h4 className="mb-1 text-sm">{schedule.title}</h4>
                <p className="text-muted-foreground flex text-xs">
                  {SCHEDULE_TYPE[schedule.type]}
                  {schedule.tag_names.length > 0 && ` | ${schedule.tag_names.join(" · ")}`}
                </p>
              </div>
            ))}
          </div>
          <Separator className="mb-2" />
        </>
      ))}
    </aside>
  );
};
