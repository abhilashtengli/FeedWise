"use client";

import { ReportItemSkeleton } from "./reportItemSkeleton";

interface ReportListSkeletonProps {
  todayCount?: number;
  pastCount?: number;
}

export function ReportListSkeleton({
  todayCount = 3,
  pastCount = 2
}: ReportListSkeletonProps) {
  return (
    <div className="flex flex-col gap-2 pb-2  w-full overflow-hidden">
      <div className="text-xs uppercase text-muted-foreground font-medium tracking-wider px-2 pt-4 pb-2 overflow-hidden">
        Today
      </div>
      {Array.from({ length: todayCount }).map((_, index) =>
        <ReportItemSkeleton key={`skeleton-today-${index}`} />
      )}

      <div className="text-xs uppercase text-muted-foreground font-medium tracking-wider px-2 pt-4 pb-2 overflow-hidden">
        Past
      </div>
      {Array.from({ length: pastCount }).map((_, index) =>
        <ReportItemSkeleton key={`skeleton-past-${index}`} />
      )}
    </div>
  );
}
