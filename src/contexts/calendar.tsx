import type FullCalendar from "@fullcalendar/react";
import { createContext, ReactNode, useContext } from "react";

import useCalendarControls from "@/hooks/useCalendarControls ";
import { CalendarControls } from "@/types/useCalendarControls";

export interface CalendarContextType extends CalendarControls {}

interface Props {
  calendarRef: React.RefObject<FullCalendar>;
  children: ReactNode;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ calendarRef, children }: Props) {
  const controls = useCalendarControls(calendarRef);
  return <CalendarContext.Provider value={controls}>{children}</CalendarContext.Provider>;
}

// CalendarContext 가 정상적으로 구성되지 않았을 때 예외 처리하는 context 반환하는 커스텀훅
export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("useCalendarContext must be used within a CalendarContext");

  return context;
};
