import Link from "next/link";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  open: boolean;
  menuPosition: { x: number; y: number };
  onOpenChange: (open: boolean) => void;
}

export function CalendarContextMenu({ menuPosition, open, onOpenChange }: Props) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div />
      </PopoverTrigger>
      <PopoverContent
        className="w-40 p-0 py-1 text-sm"
        style={{ position: "absolute", top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
      >
        <Link href="/add-schedule" className="block  w-full px-4 py-2">
          새 일정 생성
        </Link>
      </PopoverContent>
    </Popover>
  );
}
