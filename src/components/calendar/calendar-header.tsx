import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CalendarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mb-3 flex justify-between", className)} {...props}>
        {children}
      </div>
    );
  },
);
CalendarHeader.displayName = "CalendarHeader";

const CalendarHeaderTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn("ml-4 text-lg font-medium", className)} {...props}>
        {children}
      </h3>
    );
  },
);
CalendarHeaderTitle.displayName = "CalendarHeaderTitle";

const CalendarHeaderContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-x-1", className)} {...props}>
        {children}
      </div>
    );
  },
);
CalendarHeaderContent.displayName = "CalendarHeaderContent";

const CalendarViewButton = React.forwardRef<HTMLButtonElement, ButtonProps & { primary: boolean }>(
  ({ children, primary, ...props }, ref) => {
    return (
      <Button ref={ref} variant={primary ? "default" : "secondary"} size="icon-sm" {...props}>
        {children}
      </Button>
    );
  },
);
CalendarViewButton.displayName = "CalendarViewButton";

const CalendarPrev = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <Button ref={ref} variant="outline" size="icon-sm" {...props}>
      <ChevronLeft className="size-4" />
    </Button>
  );
});
CalendarPrev.displayName = "CalendarPrev";

const CalendarNext = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <Button ref={ref} variant="outline" size="icon-sm" {...props}>
      <ChevronRight className="size-4" />
    </Button>
  );
});
CalendarNext.displayName = "CalendarNext";

export { CalendarHeader, CalendarHeaderContent, CalendarHeaderTitle, CalendarNext, CalendarPrev, CalendarViewButton };
