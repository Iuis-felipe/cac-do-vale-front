import Skeleton from "@/core/components/Atoms/Skeleton";
import { FC } from "react";

interface IKpiSection {
  kpis: any[];
  isLoading: boolean;
}

const KpiSection: FC<IKpiSection> = ({ kpis, isLoading }) => (
  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
    {isLoading
      ? Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gray-200 p-4 bg-white">
          <Skeleton className="h-5 w-16 mb-3" />
          <Skeleton className="h-8 w-10" />
        </div>
      ))
    : kpis.map((kpi) => (
      <div
        key={kpi.label}
        className="relative overflow-hidden rounded-xl border border-gray-200 p-4 bg-white group"
      >
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${kpi.color} pointer-events-none`}
        />
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 group-hover:text-white">
            {kpi.icon}
            <span>{kpi.label}</span>
          </div>
          <div className="text-2xl font-bold tracking-tight group-hover:text-white">{kpi.value}</div>
          {kpi.label === "Pendentes" && typeof kpi.value === "number" && kpi.value > 0 && (
            <div className="text-[10px] font-medium text-amber-600 group-hover:text-amber-100">
              Acompanhe para evitar atrasos
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default KpiSection;