import { ScheduleItem } from "../model";
import { useMemo } from "react";
import { CalendarIcon, ClockIcon, Activity, Hourglass } from "lucide-react";

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
      // {
      //   label: "Pendentes",
      //   value: totalPending,
      //   icon: <Hourglass className="size-4" />,
      //   color: "from-amber-500 to-amber-600",
      // },
      {
        label: "Total",
        value: totalToday + totalPending,
        icon: <Activity className="size-4" />,
        color: "from-indigo-500 to-indigo-600",
      },
      // {
      //   label: "Próximo",
      //   value: nextAppointment?.horario || "--:--",
      //   icon: <ClockIcon className="size-4" />,
      //   color: "from-emerald-500 to-emerald-600",
      // },
    ];
  }, [schedules]);
};

export default useKpis;
