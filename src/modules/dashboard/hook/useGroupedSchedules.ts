import { parseISO } from "date-fns";
import { useMemo } from "react";
import { ScheduleItem } from "../model";

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

export default useGroupedSchedules;