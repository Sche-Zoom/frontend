import { UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  src: string | null;
  size: 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32;
  className?: string;
}
const sizes = {
  4: "size-4" /* 16px */,
  5: "size-5" /* 20px */,
  6: "size-6" /* 24px */,
  7: "size-7" /* 28px */,
  8: "size-8" /* 32px */,
  9: "size-9" /* 36px */,
  10: "size-10" /* 40px */,
  11: "size-11" /* 44px */,
  12: "size-12" /* 48px */,
  14: "size-14" /* 56px */,
  16: "size-16" /* 64px */,
  20: "size-20" /* 80px */,
  24: "size-24" /* 96px */,
  28: "size-28" /* 112px */,
  32: "size-32" /* 128px */,
};

/**
 * 사용자 아바타 컴포넌트 사용자의 이미지가 따로 존재하지 않을 경우 기본 프로필 이미지가 적용
 * @param size 요소의 넓이와 높이(tailwind size 클래스 기준 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32 적용 가능)
 * @param src 이미지 경로
 * @param className
 * @returns
 */
export default function Sign({ src, size, className }: Props) {
  return (
    <Avatar className={`${className} ${sizes[size]}`}>
      <AvatarImage src={src ?? ""} />
      <AvatarFallback className="bg-background border">
        <UserRound className="text-muted-foreground size-1/2" />
      </AvatarFallback>
    </Avatar>
  );
}
