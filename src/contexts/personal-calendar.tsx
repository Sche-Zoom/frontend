import type FullCalendar from "@fullcalendar/react";
import { createContext, ReactNode, useContext, useState } from "react";

import { CalendarContextType, CalendarProvider, useCalendarContext } from "@/contexts/calendar";

// 활성화될 수 있는 전체 메뉴들의 type
export type MenuType = "summarySchedules";

interface PersonalCalendarContextType extends CalendarContextType {
  menuTab: MenuType | null;
  getIsCurrentMenu: (mode: MenuType) => boolean;
  setMenuTab: (clickMenu: MenuType) => void;
}

interface Props {
  children: ReactNode;
  calendarRef: React.RefObject<FullCalendar>;
}

export const PersonalCalendarContext = createContext<PersonalCalendarContextType | null>(null);

function InsidePersonalProvider({ children }: { children: ReactNode }) {
  // calendar 제어용 CalendarContext 호출 (CalendarContextProvider 하위에 있어야 정상적으로 context 를 호출 가능)
  const calendarContext = useCalendarContext();
  const [menuTab, setState] = useState<null | MenuType>(null);

  const getIsCurrentMenu = (mode: MenuType) => mode === menuTab;

  const setMenuTab = (clickMenu: MenuType) => {
    menuTab === clickMenu ? setState(null) : setState(clickMenu);
  };

  return (
    <PersonalCalendarContext.Provider value={{ menuTab, getIsCurrentMenu, setMenuTab, ...calendarContext }}>
      {children}
    </PersonalCalendarContext.Provider>
  );
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
