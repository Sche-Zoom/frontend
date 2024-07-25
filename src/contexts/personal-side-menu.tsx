// src/contexts/UserContext.js
import React, { createContext, ReactNode, useState } from "react";

export type MenuType = "summarySchedules";

// 타입 정의
interface ContextType {
  menuTab: MenuType | null;
  getIsCurrentMenu: (mode: MenuType) => boolean;
  setMenuTab: (clickMenu: MenuType) => void;
}

// 기본값 정의
const defaultValue: ContextType = {
  menuTab: null,
  getIsCurrentMenu: () => false,
  setMenuTab: () => {},
};

interface Props {
  children: ReactNode;
}

export const PersonalSideMenuContext = createContext<ContextType>(defaultValue);

export const PersonalSideMenuProvider = ({ children }: Props) => {
  const [menuTab, setState] = useState<null | MenuType>(null);

  const getIsCurrentMenu = (mode: MenuType) => mode === menuTab;

  const setMenuTab = (clickMenu: MenuType) => {
    menuTab === clickMenu ? setState(null) : setState(clickMenu);
  };

  return (
    <PersonalSideMenuContext.Provider value={{ menuTab, getIsCurrentMenu, setMenuTab }}>
      {children}
    </PersonalSideMenuContext.Provider>
  );
};
