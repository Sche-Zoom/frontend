import { Separator } from "@radix-ui/react-separator";
import { LogOut, SquarePen } from "lucide-react";
import { ReactNode } from "react";

import Sign from "@/components/layout/sign";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserStore } from "@/store/user";

interface Props {
  children: ReactNode;
  user: UserStore;
  side: "top" | "right" | "bottom" | "left";
}

export default function UserPopover({ children, user, side }: Props) {
  return (
    <Popover>
      {/* 사용자 아바타 */}
      <PopoverTrigger>{children}</PopoverTrigger>

      {/* 아바타 클릭시 노출되는 사용자 정보 popover */}
      <PopoverContent side={side} className="w-80">
        <div className="mb-3 flex items-center space-x-6">
          {/* 사용자 썸네일 이미지 */}
          <Sign size={16} src={user.thumbnail} />

          {/* 사용자 정보 */}
          <div>
            <p className="text-lg font-medium">{user.nickname}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        {/* 사용자 설명 부분 */}
        <p className="bg-muted rounded-sm border p-2 text-sm">{user.description}</p>

        <Separator className="mb-2 mt-4" />

        {/* 정보 수정 및 로그아웃 메뉴 (기능은 추후 추가) */}
        <ul>
          <li className="flex items-center space-x-4 p-2 font-medium">
            <SquarePen size="18" />
            <p>정보 수정</p>
          </li>
          <li className="flex items-center space-x-4 p-2 font-medium">
            <LogOut size="18" />
            <p>로그아웃</p>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
