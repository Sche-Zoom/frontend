import { Button } from "./ui/button";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function CalendarViewBtn({ onClick, children }: Props) {
  return (
    <Button onClick={onClick} className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm">
      {children}
    </Button>
  );
}
