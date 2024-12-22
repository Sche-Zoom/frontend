"use client";

import { ChevronDown, LogOut } from "lucide-react";

import { logout } from "@/actions";
import Sign from "@/components/sign";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user";

export default function Header() {
  return (
    <header className="bg-muted flex h-12 items-center justify-between border-b px-4">
      {/* 로고 */}
      <h1 className="font-medium">Rich Calendar</h1>

      {/* 사용자 정보(클릭시 상세 정보 및 기타 기능 제공) */}
      <UserPopover />
    </header>
  );
}

const UserPopover = () => {
  const user = useUserStore();

  return (
    <Popover>
      {/* 사용자 아바타 */}
      <PopoverTrigger className="flex items-center gap-x-2">
        <Sign size="xs" />
        <span>{user.id}</span>
        <ChevronDown size={18} />
      </PopoverTrigger>

      {/* 아바타 클릭시 노출되는 사용자 정보 popover */}
      <PopoverContent side="bottom" className="w-60">
        <div className="mb-3 flex items-center space-x-6">
          {/* 사용자 썸네일 이미지 */}
          <Sign size="sm" />

          {/* 사용자 정보 */}
          <div>
            <p className="text-base font-medium">{user.id}</p>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        <Separator className="my-2" />
        <Button
          type="button"
          className="w-full justify-start space-x-4"
          variant="ghost"
          onClick={async () => {
            await logout();
            location.replace("/auth/login");
          }}
        >
          <LogOut size="18" />
          <span>로그아웃</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
