import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ScheduleItem } from "../../model";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Check, ClockIcon, Eye, UserCircleIcon, X } from "lucide-react";
import useUpdateScheduleStatus from "@/modules/agendamento/hook/useUpdateScheduleStatus";
import { useDeleteSchedule } from "@/modules/agendamento/hook/useDeleteSchedule";
import TimeBadge from "@/core/components/molecules/TimeBadge";
import StatusBadge from "@/core/components/molecules/StatusBadge";

interface IScheduleCard {
  schedule: ScheduleItem;
  variant?: "grid" | "list";
}

const ScheduleCard: FC<IScheduleCard> = ({ schedule, variant = "grid" }) => {
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

export default ScheduleCard;
