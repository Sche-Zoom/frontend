"use client";

import FullCalendar from "@fullcalendar/react";
import { RefObject, Suspense } from "react";

import BasicLoader from "@/components/basic-loader";
import {
  CalendarHeader,
  CalendarHeaderContent,
  CalendarHeaderTitle,
  CalendarNext,
  CalendarPrev,
  CalendarViewButton,
} from "@/components/calendar/calendar-header";
import ErrorBoundary from "@/components/error-boundary";
import CalendarContent from "@/components/home/calendar-content";
import CalendarFilter from "@/components/home/calendar-filter";
import PersonalSideMenu from "@/components/home/personal-side-menu";
import { SideMenuContent } from "@/components/side-menu";
import useCalendarControls from "@/hooks/useCalendarControls ";

interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function PersonalCalendar({ calendarRef }: Props) {
  // const calendarRef = useRef<FullCalendar>(null);

  // 캘린더 정보 및 제어를 위한 커스텀 훅 호출
  const {
    checkedTagIds,
    startDate,
    endDate,
    calendarTitle,
    currentDate,
    viewType,
    setCheckedTagIds,
    goPrev,
    goNext,
    getTagChecked,
    getTagAllChecked,
    setTagChecked,
    setAllSubtagsChecked,
    changeView,
    getIsCurrentView,
  } = useCalendarControls(calendarRef);

  return (
    <div className="flex flex-1">
      {/* 캘린더 전체 */}
      <div className="flex w-full flex-col p-4">
        {/* 캘린더 조작을 위한 header 부분 */}
        <CalendarHeader>
          <CalendarHeaderContent>
            {/* 캘린더 view 이동 버튼 */}
            <CalendarPrev onClick={goPrev} />
            <CalendarNext onClick={goNext} />

            {/* 필터링을 위한 태그 체크박스 목록 */}
            <ErrorBoundary>
              <Suspense>
                <CalendarFilter
                  checkedTagIds={checkedTagIds}
                  startDate={startDate}
                  endDate={endDate}
                  getTagChecked={getTagChecked}
                  getTagAllChecked={getTagAllChecked}
                  setCheckedTagIds={setCheckedTagIds}
                  setTagChecked={setTagChecked}
                  setAllSubtagsChecked={setAllSubtagsChecked}
                />
              </Suspense>
            </ErrorBoundary>

            {/* 캘린더 title */}
            <CalendarHeaderTitle>{calendarTitle}</CalendarHeaderTitle>
          </CalendarHeaderContent>

          {/* view 모드 변경 버튼 목록 */}
          <CalendarHeaderContent>
            <CalendarViewButton primary={getIsCurrentView("dayGridMonth")} onClick={() => changeView("dayGridMonth")}>
              월
            </CalendarViewButton>
            <CalendarViewButton primary={getIsCurrentView("timeGridWeek")} onClick={() => changeView("timeGridWeek")}>
              주
            </CalendarViewButton>
            <CalendarViewButton primary={getIsCurrentView("timeGridDay")} onClick={() => changeView("timeGridDay")}>
              일
            </CalendarViewButton>
          </CalendarHeaderContent>
        </CalendarHeader>

        <ErrorBoundary>
          <Suspense fallback={<BasicLoader />}>
            {/* 실제 일정이 노출될 content 부분 */}
            <CalendarContent
              calendarRef={calendarRef}
              currentDate={currentDate}
              viewType={viewType}
              checkedTagIds={checkedTagIds}
              startDate={startDate}
              endDate={endDate}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* 사이드 메뉴 */}
      <ErrorBoundary>
        <Suspense
          fallback={
            <SideMenuContent>
              <BasicLoader />
            </SideMenuContent>
          }
        >
          <PersonalSideMenu currentDate={currentDate} checkedTagIds={checkedTagIds} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
