import { Suspense } from "react";

import BasicLoader from "@/components/basic-loader";
import ErrorBoundary from "@/components/error-boundary";
import FilterContents from "@/components/home/filter-contents";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CalendarFilter() {
  return (
    <Select>
      <SelectTrigger className="w-18 h-9 px-3 text-sm">
        <SelectValue placeholder="필터링" />
      </SelectTrigger>
      <SelectContent className="px-2 text-sm">
        <ErrorBoundary>
          <Suspense fallback={<BasicLoader />}>
            <FilterContents />
          </Suspense>
        </ErrorBoundary>
      </SelectContent>
    </Select>
  );
}
