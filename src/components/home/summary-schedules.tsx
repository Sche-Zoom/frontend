import { useSuspenseQuery } from "@tanstack/react-query";

import { getPersonalSummarySchedules } from "@/api/personal-schedule";
import { SideMenuContent, SideMenuSeparator, SideMenuTitle } from "@/components/side-menu";
import { SCHEDULE_TYPE } from "@/constants";
import { getScheduleColorVariable } from "@/lib/calendar";

interface Props {
  currentDate: string;
  checkedTagIds: number[] | null;
}

function SummarySchedules(props: Props) {
  const { checkedTagIds, currentDate } = props;
  const { data } = useSuspenseQuery({
    queryKey: ["personal_schedule_summary", "list", checkedTagIds, currentDate],
    queryFn: () => getPersonalSummarySchedules({ selected_date: currentDate, tag_ids: checkedTagIds ?? undefined }),
  });

  return (
    <SideMenuContent>
      <SideMenuTitle>일정 목록</SideMenuTitle>
      {/*  해당월의 전체 일정 목록 */}
      {data.side_schedules.map((dailySchedules) => (
        <>
          {/* 일정 시작 날짜기준 일별 일정 목록 */}
          <div key={dailySchedules.start_date} className="p-2">
            <p className="mb-2">{dailySchedules.start_date}</p>
            {/* 특정 날짜 일정 목록 */}
            {dailySchedules.schedules.map((schedule) => (
              <div
                key={schedule.id}
                className={`mb-2 border-l-4 border-[hsl(var(--schedule))] bg-[hsl(var(--schedule-background))] p-2`}
                style={getScheduleColorVariable(schedule.color)}
              >
                {schedule.title}
                <p className="text-muted-foreground flex text-sm">
                  {SCHEDULE_TYPE[schedule.type]}
                  {schedule.tag_names.map((tag) => ` · ${tag}`)}
                </p>
              </div>
            ))}
          </div>
          <SideMenuSeparator />
        </>
      ))}
    </SideMenuContent>
  );
}

export default SummarySchedules;
