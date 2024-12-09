import { LogOut } from "lucide-react";
import { ReactNode } from "react";

import Sign from "@/components/layout/sign";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user";

interface Props {
  children: ReactNode;
  side: "top" | "right" | "bottom" | "left";
}

export default function UserPopover({ children, side }: Props) {
  const user = useUserStore();

  return (
    <Popover>
      {/* 사용자 아바타 */}
      <PopoverTrigger>{children}</PopoverTrigger>

      {/* 아바타 클릭시 노출되는 사용자 정보 popover */}
      <PopoverContent side={side} className="w-60">
        <div className="mb-3 flex items-center space-x-6">
          {/* 사용자 썸네일 이미지 */}
          <Sign size="sm" />

          {/* 사용자 정보 */}
          <div>
            <p className="text-base font-medium">{user.id}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        <Separator className="mb-2 mt-4" />

        <ul>
          <li className="flex items-center space-x-4 p-2 text-sm font-medium">
            <LogOut size="18" />
            <p>로그아웃</p>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
