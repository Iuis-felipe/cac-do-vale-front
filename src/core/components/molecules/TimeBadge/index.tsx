import { FC, useMemo } from "react";
import { differenceInMinutes } from "date-fns";
import { TimeBadgeRoot } from "./TimeBadge.styled";

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

  const status = isLate ? 'late' : isSoon ? 'soon' : 'ok';

  const badgeText = isLate
    ? `${Math.abs(minutesUntil)}m atrasado`
    : minutesUntil < 60
    ? `${minutesUntil}m`
    : `${Math.floor(minutesUntil / 60)}h`;

  return <TimeBadgeRoot status={status}>{badgeText}</TimeBadgeRoot>;
};

export default TimeBadge;