import { ClipboardList } from "lucide-react";
import React, { useEffect } from "react";

import { SideMenuButtonItem, SideMenuButtons } from "@/components/side-menu";
import { useCalendarContext } from "@/contexts/calendar";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

export default function PersonalSideButtons() {
  const { menuTab, getIsCurrentMenu, setMenuTab } = usePersonalCalendarContext();
  const { updateSize } = useCalendarContext();

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
