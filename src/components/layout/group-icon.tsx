import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MyGroup } from "@/store/user";

interface Props {
  group: MyGroup;
}

export default function GroupIcon({ group }: Props) {
  return (
    // 그룹 아이콘 hover 시 그룹 이름이 tooltip 노출
    <Tooltip delayDuration={0}>
      <TooltipTrigger>
        <Link href={`/group/${group.gid}`}>
          {/* 그룹 아이콘 */}
          <Avatar className="bg-background size-12 border transition-all duration-300 ease-in-out hover:rounded-2xl hover:shadow-lg">
            <AvatarImage src={group.thumbnail ?? ""} />
            <AvatarFallback className="text-foreground justify-start truncate bg-inherit font-medium">{`${group.name}`}</AvatarFallback>
          </Avatar>
        </Link>
      </TooltipTrigger>

      {/* 그룹 이름 tooltip */}
      <TooltipContent side="right" align="center">
        <p>{group.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
