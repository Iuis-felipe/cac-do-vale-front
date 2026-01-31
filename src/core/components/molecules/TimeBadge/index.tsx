import { FC, useMemo } from "react";
import { differenceInMinutes } from "date-fns";

interface ITimeBadge {
  date: Date | null;
  time: string | undefined;
}

const TimeBadge: FC<ITimeBadge> = ({ date, time }) => {
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

export default TimeBadge