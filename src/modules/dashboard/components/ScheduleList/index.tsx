import { FC } from "react";
import { parseISO, format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import ScheduleCard from "../ScheduleCard";

interface IScheduleList {
  groupedSchedules: any;
  view: any;
}

const ScheduleList: FC<IScheduleList> = ({ groupedSchedules, view }) => {
  const { orderedKeys, groupedMap } = groupedSchedules;
  return (
    <div className="flex flex-col gap-10">
      {orderedKeys.map((dateStr: any) => {
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
                {items.map((item: any) => (
                  <ScheduleCard key={item.id} schedule={item} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item: any) => (
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

export default ScheduleList;