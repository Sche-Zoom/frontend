import type FullCalendar from "@fullcalendar/react";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

import { CalendarContextType, CalendarProvider, useCalendarContext } from "@/contexts/calendar";

// 활성화될 수 있는 전체 메뉴들의 type
export type MenuType = "summarySchedules";
interface PersonalCalendarContextType extends CalendarContextType {
  menuTab: MenuType | null;
  changeConfirmOpen: boolean;
  scheduleChange: ScheduleChangeObject | null;
  updatedTime: string | null;
  getIsCurrentMenu: (mode: MenuType) => boolean;
  updateMenuTab: (clickMenu: MenuType) => void;
  setChangeConfirmOpen: Dispatch<SetStateAction<boolean>>;
  setScheduleChange: Dispatch<SetStateAction<ScheduleChangeObject | null>>;
  setUpdatedTime: Dispatch<SetStateAction<string | null>>;
}

interface Props {
  children: ReactNode;
  calendarRef: React.RefObject<FullCalendar>;
}

export const PersonalCalendarContext = createContext<PersonalCalendarContextType | null>(null);

function InsidePersonalProvider({ children }: { children: ReactNode }) {
  // calendar 제어용 CalendarContext 호출 (CalendarContextProvider 하위에 있어야 정상적으로 context 를 호출 가능)
  const calendarContext = useCalendarContext();

  // 개인 일정 활성화된 사이드 메뉴 state
  const [menuTab, setMenuTab] = useState<null | MenuType>(null);
  // 캘린더 view 내에서 일정 수정(resize, drop) 시 확인 모달 활성화 여부
  const [changeConfirmOpen, setChangeConfirmOpen] = useState(false);
  // 캘린더 view 내에서 일정 수정 콜백함수의 이벤트관련 argument(모달에서 사용하기 위함)
  const [scheduleChange, setScheduleChange] = useState<ScheduleChangeObject | null>(null);
  // 일정 변경된 시간 (useQuery state 로 사용해 refetch 하기 위함)
  const [updatedTime, setUpdatedTime] = useState<string | null>(null);

  const getIsCurrentMenu = (mode: MenuType) => mode === menuTab;

  const updateMenuTab = (clickMenu: MenuType) => {
    menuTab === clickMenu ? setMenuTab(null) : setMenuTab(clickMenu);
  };

  const contextValue: PersonalCalendarContextType = {
    menuTab,
    changeConfirmOpen,
    scheduleChange,
    updatedTime,
    getIsCurrentMenu,
    updateMenuTab,
    setChangeConfirmOpen,
    setScheduleChange,
    setUpdatedTime,
    ...calendarContext,
  };

  return <PersonalCalendarContext.Provider value={contextValue}>{children}</PersonalCalendarContext.Provider>;
}

export function PersonalCalendarProvider({ calendarRef, children }: Props) {
  return (
    <CalendarProvider calendarRef={calendarRef}>
      <InsidePersonalProvider>{children}</InsidePersonalProvider>
    </CalendarProvider>
  );
}

// PersonalCalendarContext 가 정상적으로 구성되지 않았을 때 예외 처리하는 context 반환하는 커스텀훅
export const usePersonalCalendarContext = () => {
  const context = useContext(PersonalCalendarContext);
  if (!context) throw new Error("usePersonalContext must be used within a PersonalCalendarContext");

  return context;
};
