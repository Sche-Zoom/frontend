import FullCalendar from "@fullcalendar/react";
import { ClipboardList } from "lucide-react";
import React, { RefObject, useContext, useEffect } from "react";

import { SideMenuButtonItem, SideMenuButtons } from "@/components/side-menu";
import { PersonalSideMenuContext } from "@/contexts/personal-side-menu";
import useCalendarControls from "@/hooks/useCalendarControls ";

interface Props {
  calendarRef: RefObject<FullCalendar>;
}

export default function PersonalSideButtons({ calendarRef }: Props) {
  const { menuTab, getIsCurrentMenu, setMenuTab } = useContext(PersonalSideMenuContext);
  const { updateSize } = useCalendarControls(calendarRef);

  useEffect(() => {
    updateSize();
  }, [menuTab, updateSize]);

  return (
    <SideMenuButtons>
      <SideMenuButtonItem primary={getIsCurrentMenu("summarySchedules")} onClick={() => setMenuTab("summarySchedules")}>
        <ClipboardList size={24} />
      </SideMenuButtonItem>
    </SideMenuButtons>
  );
}
