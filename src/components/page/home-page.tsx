import { ClipboardList, Loader } from "lucide-react";
import { Suspense } from "react";

import ErrorBoundary from "@/components/error-boundary";
import PersonalCalendar from "@/components/home/personal-calendar";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <div>
      <div className="bg-muted sticky left-0 top-9 z-10 flex h-9 items-center justify-between border-b px-2">
        <h3 className="align-middle text-sm">개인 일정</h3>

        <Button variant="image-icon-none" size="icon-sm">
          <ClipboardList size={24} />
        </Button>
      </div>

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex h-screen flex-col items-center justify-center">
              <Loader className="size-8 animate-spin" />
            </div>
          }
        >
          <PersonalCalendar />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
