import Skeleton from "@/core/components/Atoms/Skeleton";
import { FC } from "react";

const LoadingScheduleGrid: FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 h-full bg-white">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    ))}
  </div>
);

export default LoadingScheduleGrid