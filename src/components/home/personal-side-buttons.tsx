import { ClipboardList } from "lucide-react";
import React, { useEffect } from "react";

import { SideMenuButtonItem, SideMenuButtons } from "@/components/side-menu";
import { usePersonalCalendarContext } from "@/contexts/personal-calendar";

export default function PersonalSideButtons() {
  const { menuTab, getIsCurrentMenu, updateMenuTab, updateSize } = usePersonalCalendarContext();

  useEffect(() => {
    updateSize();
  }, [menuTab, updateSize]);

  return (
    <SideMenuButtons>
      <SideMenuButtonItem
        primary={getIsCurrentMenu("summarySchedules")}
        onClick={() => updateMenuTab("summarySchedules")}
      >
        <ClipboardList size={24} />
      </SideMenuButtonItem>
    </SideMenuButtons>
  );
}
