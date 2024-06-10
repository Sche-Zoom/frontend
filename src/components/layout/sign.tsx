import { UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  src: string | null;
  size: "sm" | "md";
  className?: string;
}
const sizes = {
  sm: "size-12" /* 48px */,
  md: "size-16" /* 64px */,
};

/**
 * 사용자 아바타 컴포넌트 사용자의 이미지가 따로 존재하지 않을 경우 기본 프로필 이미지가 적용
 * @param size 요소의 넓이와 높이(sm: 48px, md: 64px)
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
