"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, LogOut, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { logout } from "@/actions";
import Sign from "@/components/sign";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import apiRequest from "@/lib/api";

export default function Header() {
  return (
    <header className="bg-muted flex h-12 items-center justify-between border-b px-4">
      {/* 로고 */}
      <h1 className="font-medium">Rich Calendar</h1>

      {/* 사용자 정보(클릭시 상세 정보 및 기타 기능 제공) */}
      <Suspense
        fallback={
          <div className="flex items-center gap-x-1">
            <Skeleton className="bg-muted-foreground size-9 rounded-full" />
            <Skeleton className="bg-muted-foreground h-6 w-24" />
          </div>
        }
      >
        <UserPopover />
      </Suspense>
    </header>
  );
}

const UserPopover = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { data: user } = useSuspenseQuery({
    queryKey: ["my", "info"],
    queryFn: () => apiRequest("getMyInfo"),
  });

  const { mutate: withdrawMutate } = useMutation({
    mutationFn: () => apiRequest("withdrawMember"),
    onSuccess: () => logout(),
    onError: () =>
      toast({
        title: "회원 탈퇴가 정상적으로 처리되지 않았습니다 잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      }),
  });

  const onClickLogOut = () => logout();
  const onClickWithdraw = () => withdrawMutate();

  return (
    <>
      <Popover>
        {/* 사용자 아바타 */}
        <PopoverTrigger className="flex items-center gap-x-2">
          <Sign size="xs" />
          <span>{user.id}</span>
          <ChevronDown size={18} />
        </PopoverTrigger>

        {/* 아바타 클릭시 노출되는 사용자 정보 popover */}
        <PopoverContent side="bottom" className="w-60 space-y-2 p-4">
          <div className="flex items-center space-x-6">
            {/* 사용자 썸네일 이미지 */}
            <Sign size="sm" />

            {/* 사용자 정보 */}
            <div>
              <p className="text-base font-medium">{user.id}</p>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>

          <Separator />

          <Button type="button" className="w-full justify-start space-x-4" variant="ghost" onClick={() => logout()}>
            <LogOut size="14" />
            <span>로그아웃</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" className="w-full justify-start space-x-4" variant="destructive">
                <Trash2 size="14" />
                <span>회원 탈퇴</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>취소</AlertDialogTitle>
                <AlertDialogDescription>정말로 회원탈퇴를 진행하시겠습니까?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={buttonVariants({ variant: "outline", size: "lg" })}>
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => withdrawMutate()}
                  className={buttonVariants({ variant: "destructive", size: "lg" })}
                >
                  탈퇴
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>
    </>
  );
};
