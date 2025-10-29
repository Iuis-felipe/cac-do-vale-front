import { useMemo, useState, ReactNode, FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateScheduleStatus from "@/modules/agendamento/hook/useUpdateScheduleStatus";
import { useDeleteSchedule } from "@/modules/agendamento/hook/useDeleteSchedule";
import { useNavigate } from "react-router-dom";
import { format, parseISO, differenceInMinutes, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

// Icons
import {
  ClockIcon,
  CalendarIcon,
  ListIcon,
  LayoutGridIcon,
  AlertCircle,
  CheckCircle2,
  Hourglass,
  Activity,
  Check,
  X,
  Eye,
} from "lucide-react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// Local Imports
import PageTitle from "../../../core/components/organism/PageTitle";
import useGetTodaySchedule from "../hook/useGetTodaySchedule";

// --- TYPE DEFINITIONS ---
interface ScheduleItem {
  id: string | number;
  nome_civil: string;
  dia?: string;
  horario?: string;
  status?: string;
  [key: string]: any;
}

type ViewType = "grid" | "list";

// --- CONSTANTS & CONFIGURATIONS ---
const STATUS_CONFIG: Record<string, { label: string; color: string; icon: ReactNode }> = {
  pending: {
    label: "Pendente",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Hourglass className="size-3" />,
  },
  done: {
    label: "Concluído",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <CheckCircle2 className="size-3" />,
  },
  canceled: {
    label: "Cancelado",
    color: "bg-rose-100 text-rose-700 border-rose-200",
    icon: <AlertCircle className="size-3" />,
  },
  default: {
    label: "Agendado",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Activity className="size-3" />,
  },
};

// --- HELPER & UTILITY COMPONENTS ---
const Skeleton: FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] ${className}`}
  />
);

const TimeBadge: FC<{ date: Date | null; time: string | undefined }> = ({ date, time }) => {
  const minutesUntil = useMemo(() => {
    if (!date || !time) return null;
    try {
      const [h, m] = time.split(":").map(Number);
      const appointmentDateTime = new Date(date);
      appointmentDateTime.setHours(h, m || 0, 0, 0);
      return differenceInMinutes(appointmentDateTime, new Date());
    } catch {
      return null;
    }
  }, [date, time]);

  if (minutesUntil === null) return null;

  const isLate = minutesUntil < 0;
  const isSoon = minutesUntil < 30 && !isLate;

  const badgeColor = isLate
    ? "bg-red-50 text-red-600 border-red-200"
    : isSoon
    ? "bg-amber-50 text-amber-600 border-amber-200"
    : "bg-emerald-50 text-emerald-600 border-emerald-200";

  const badgeText = isLate
    ? `${Math.abs(minutesUntil)}m atrasado`
    : minutesUntil < 60
    ? `${minutesUntil}m`
    : `${Math.floor(minutesUntil / 60)}h`;

  return <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${badgeColor}`}>{badgeText}</span>;
};

const StatusBadge: FC<{ status?: string }> = ({ status }) => {
  const { label, color, icon } = STATUS_CONFIG[status || ""] || STATUS_CONFIG.default;
  return (
    <div className={`hidden md:flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border font-medium ${color}`}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

const ViewToggleButton: FC<{ view: ViewType; setView: (view: ViewType) => void }> = ({ view, setView }) => (
  <div className="flex items-center gap-2">
    {(["grid", "list"] as const).map((v) => {
      const isActive = view === v;
      const Icon = v === "grid" ? LayoutGridIcon : ListIcon;
      return (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`h-9 w-9 flex items-center justify-center rounded-md border text-gray-600 hover:bg-gray-50 cursor-pointer ${
            isActive ? "bg-gray-100 border-gray-300" : "border-gray-200"
          }`}
          aria-label={`Visualização em ${v === "grid" ? "grade" : "lista"}`}
        >
          <Icon className="size-4" />
        </button>
      );
    })}
  </div>
);

// --- CORE COMPONENTS ---
const ScheduleCard: FC<{ schedule: ScheduleItem; variant?: ViewType }> = ({ schedule, variant = "grid" }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateScheduleStatus();
  const { deleteSchedule, isPending: isDeleting } = useDeleteSchedule();
  const appointmentDate = schedule.dia ? parseISO(schedule.dia) : null;

  const isList = variant === "list";
  const cardLayout = isList ? "flex-row items-stretch gap-4" : "flex-col gap-3";
  const infoLayout = isList ? "items-center gap-4" : "items-center gap-4 pt-1";

  const handleStatus = (status: string) => {
    if (isUpdating) return;
    updateStatus(
      { id: String(schedule.id), status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["today-schedules"] });
        },
      }
    );
  };

  const handleDelete = () => {
    if (isDeleting) return;
    deleteSchedule(String(schedule.id), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["today-schedules"] });
      },
    });
  };

  if (isList) {
    return (
      <div className="group relative w-full rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors px-3 py-3 flex items-center text-xs">
        {/* Time */}
        <div className="w-20 flex items-center gap-1 font-medium text-gray-700 text-[16px]">
          <ClockIcon className="size-5 text-gray-500" />
          <span>{schedule.horario}</span>
        </div>
        {/* Client + Date */}
        <div className="flex-1 min-w-0 pr-4">
          <p className="truncate font-semibold text-[14px] text-gray-800 leading-tight">{schedule.nome_civil}</p>
          {appointmentDate && (
            <p className="text-[12px] text-gray-500">{format(appointmentDate, "dd MMM yyyy", { locale: ptBR })}</p>
          )}
        </div>
        {/* Time badge (urgency) */}
        <div className="hidden md:block pr-4">
          <TimeBadge date={appointmentDate} time={schedule.horario} />
        </div>
        {/* Status */}
        <div className="pr-4 hidden md:block">
          <StatusBadge status={schedule.status} />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2">
          {schedule.status !== "confirmado" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStatus("confirmado");
              }}
              disabled={isUpdating}
              className={`px-2 h-7 rounded-md text-[11px] font-medium border cursor-pointer inline-flex items-center gap-1 ${
                isUpdating
                  ? "bg-emerald-50 text-emerald-400 border-emerald-200 opacity-70 cursor-not-allowed"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              {isUpdating ? (
                <span className="size-3 animate-spin border-2 border-emerald-600/40 border-t-transparent rounded-full" />
              ) : (
                <Check className="size-3" />
              )}
              <span>{isUpdating ? "" : "Confirmar"}</span>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            disabled={isDeleting}
            className={`px-2 h-7 rounded-md text-[11px] font-medium border cursor-pointer inline-flex items-center gap-1 ${
              isDeleting
                ? "bg-rose-50 text-rose-400 border-rose-200 opacity-70 cursor-not-allowed"
                : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
            }`}
          >
            {isDeleting ? (
              <span className="size-3 animate-spin border-2 border-rose-600/40 border-t-transparent rounded-full" />
            ) : (
              <X className="size-3" />
            )}
            <span>{isDeleting ? "" : "Remover"}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/agendamento/${schedule.id}`);
            }}
            className={`px-2 h-7 rounded-md text-[11px] font-medium border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer inline-flex items-center gap-1`}
          >
            <Eye className="size-3" /> <span>Abrir</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 flex ${cardLayout} h-full text-sm transition-all duration-300 bg-white group hover:shadow-lg hover:-translate-y-1`}
    >
      <div className="flex items-center gap-2 font-medium text-gray-800 w-full">
        <div className="flex items-center justify-center rounded-full bg-blue-50 text-blue-600 size-8 group-hover:scale-105 transition-transform">
          <UserCircleIcon className="size-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-[13px] font-semibold tracking-tight">{schedule.nome_civil}</p>
          {appointmentDate && (
            <p className="text-[11px] text-gray-500">{format(appointmentDate, "dd MMM yyyy", { locale: ptBR })}</p>
          )}
        </div>
        <StatusBadge status={schedule.status} />
      </div>
      <div className={`flex ${infoLayout} text-gray-600 text-[12px] font-medium`}>
        <div className="flex items-center gap-1">
          <ClockIcon className="size-4" />
          <span>{schedule.horario}</span>
        </div>
        <TimeBadge date={appointmentDate} time={schedule.horario} />
      </div>
      <div className="mt-3 flex gap-2">
        {schedule.status !== "confirmado" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatus("confirmado");
            }}
            disabled={isUpdating}
            className={`px-2 py-1 rounded-md text-[11px] font-medium border cursor-pointer inline-flex items-center gap-1 ${
              isUpdating
                ? "bg-emerald-50 text-emerald-400 border-emerald-200 opacity-70 cursor-not-allowed"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {isUpdating ? (
              <span className="size-3 animate-spin border-2 border-emerald-600/40 border-t-transparent rounded-full" />
            ) : (
              <Check className="size-3" />
            )}
            <span>{isUpdating ? "" : "Confirmar"}</span>
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          disabled={isDeleting}
          className={`px-2 py-1 rounded-md text-[11px] font-medium border cursor-pointer inline-flex items-center gap-1 ${
            isDeleting
              ? "bg-rose-50 text-rose-400 border-rose-200 opacity-70 cursor-not-allowed"
              : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
          }`}
        >
          {isDeleting ? (
            <span className="size-3 animate-spin border-2 border-rose-600/40 border-t-transparent rounded-full" />
          ) : (
            <X className="size-3" />
          )}
          <span>{isDeleting ? "" : "Remover"}</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/agendamento/${schedule.id}`);
          }}
          className={`px-2 py-1 rounded-md text-[11px] font-medium border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer inline-flex items-center gap-1`}
        >
          <Eye className="size-3" /> <span>Abrir</span>
        </button>
      </div>
    </div>
  );
};

// --- CUSTOM HOOKS ---
const useGroupedSchedules = (schedules: { today?: ScheduleItem[]; pending?: ScheduleItem[] } | undefined) => {
  return useMemo(() => {
    if (!schedules) return { orderedKeys: [], groupedMap: {} };

    const allItems = [...(schedules.today || []), ...(schedules.pending || [])];

    const groupedMap = allItems.reduce<Record<string, ScheduleItem[]>>((acc, item) => {
      if (!item.dia) return acc;
      try {
        const dateKey = parseISO(item.dia).toISOString().split("T")[0];
        acc[dateKey] = [...(acc[dateKey] || []), item];
      } catch {
        acc[item.dia] = [...(acc[item.dia] || []), item];
      }
      return acc;
    }, {});

    const orderedKeys = Object.keys(groupedMap).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    orderedKeys.forEach((key) => groupedMap[key].sort((a, b) => (a.horario || "").localeCompare(b.horario || "")));

    return { orderedKeys, groupedMap };
  }, [schedules]);
};

const useKpis = (schedules: { today?: ScheduleItem[]; pending?: ScheduleItem[] } | undefined) => {
  return useMemo(() => {
    const totalToday = schedules?.today?.length || 0;
    const totalPending = schedules?.pending?.length || 0;
    const nextAppointment = schedules?.today?.[0];

    return [
      {
        label: "Hoje",
        value: totalToday,
        icon: <CalendarIcon className="size-4" />,
        color: "from-blue-500 to-blue-600",
      },
      {
        label: "Pendentes",
        value: totalPending,
        icon: <Hourglass className="size-4" />,
        color: "from-amber-500 to-amber-600",
      },
      {
        label: "Total",
        value: totalToday + totalPending,
        icon: <Activity className="size-4" />,
        color: "from-indigo-500 to-indigo-600",
      },
      {
        label: "Próximo",
        value: nextAppointment?.horario || "--:--",
        icon: <ClockIcon className="size-4" />,
        color: "from-emerald-500 to-emerald-600",
      },
    ];
  }, [schedules]);
};

// --- PAGE SECTION COMPONENTS ---
const KpiSection: FC<{ kpis: ReturnType<typeof useKpis>; isLoading: boolean }> = ({ kpis, isLoading }) => (
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

const EmptyState: FC = () => (
  <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center bg-white">
    <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 size-12">
      <CalendarIcon className="size-6" />
    </div>
    <p className="text-sm font-medium text-gray-700">Nenhum agendamento encontrado</p>
    <p className="text-xs text-gray-500 mt-1">Os agendamentos aparecerão aqui assim que forem criados.</p>
  </div>
);

const ScheduleList: FC<{ groupedSchedules: ReturnType<typeof useGroupedSchedules>; view: ViewType }> = ({
  groupedSchedules,
  view,
}) => {
  const { orderedKeys, groupedMap } = groupedSchedules;
  return (
    <div className="flex flex-col gap-10">
      {orderedKeys.map((dateStr) => {
        const items = groupedMap[dateStr];
        const dateObj = parseISO(dateStr);
        const baseLabel = format(dateObj, "dd 'de' MMMM yyyy", { locale: ptBR });
        const label = isToday(dateObj) ? `Hoje · ${baseLabel}` : baseLabel;

        return (
          <div key={dateStr}>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-600" />
              <h3 className="text-[16px] font-semibold uppercase tracking-wide text-gray-600">{label}</h3>
              <span className="text-[10px] text-gray-400 font-medium">{items.length} agendamento(s)</span>
            </div>
            {view === "grid" ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((item) => (
                  <ScheduleCard key={item.id} schedule={item} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <ScheduleCard key={item.id} schedule={item} variant="list" />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

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

const Dashboard = () => {
  const { data: schedules, isPending } = useGetTodaySchedule();
  const [view, setView] = useState<ViewType>("grid");

  const kpis = useKpis(schedules);
  const groupedSchedules = useGroupedSchedules(schedules);

  const isEmpty = !isPending && groupedSchedules.orderedKeys.length === 0;

  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Visão geral dos agendamentos" />

      <KpiSection kpis={kpis} isLoading={isPending} />

      <header className="mt-10 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold flex items-center gap-2">
          Agendamentos
          {schedules?.today?.length ? (
            <span className="text-xs text-gray-500 font-normal">({schedules.today.length} hoje)</span>
          ) : null}
        </h2>
        <ViewToggleButton view={view} setView={setView} />
      </header>

      <main className="mt-6">
        {isPending ? (
          <LoadingScheduleGrid />
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <ScheduleList groupedSchedules={groupedSchedules} view={view} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
