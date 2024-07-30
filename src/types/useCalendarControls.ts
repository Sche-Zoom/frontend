import { CheckedState } from "@radix-ui/react-checkbox";
import { Dispatch, SetStateAction } from "react";

export interface CalendarDateState {
  startDate: string;
  endDate: string;
  currentDate: string;
}

export interface CalendarControls {
  viewType: CalendarViewType;
  checkedTagIds: number[] | null;
  currentDate: string;
  startDate: string;
  endDate: string;
  calendarTitle: string;
  setCheckedTagIds: Dispatch<SetStateAction<number[] | null>>;
  goNext: () => void;
  goPrev: () => void;
  changeView: (mode: CalendarViewType) => void;
  setTagChecked: (checked: CheckedState, id: number) => void;
  setAllSubtagsChecked: (checked: CheckedState, ids: number[]) => void;
  getTagChecked: (id: number) => boolean;
  getTagAllChecked: (ids: number[]) => boolean;
  getIsCurrentView: (mode: CalendarViewType) => boolean;
  updateSize: () => void;
}
