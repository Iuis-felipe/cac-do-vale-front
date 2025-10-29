import { useMemo } from 'react';
import { format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Schedule {
  id: string | number;
  nome_civil: string;
  dia?: string;
  horario?: string;
  status?: string;
  tipo_exame?: string;
  forma_pagamento?: string;
  origem?: string;
  categoria?: string;
  [key: string]: any;
}

export const useAnalytics = (schedules: Schedule[]) => {
  const analytics = useMemo(() => {
    if (!schedules || schedules.length === 0) {
      return {
        totalSchedules: 0,
        statusDistribution: {},
        examTypeDistribution: {},
        paymentDistribution: {},
        originDistribution: {},
        categoryDistribution: {},
        hourDistribution: {},
        weeklyTimeline: [],
        topHours: [],
        averagePerDay: 0,
      };
    }

    // Status distribution
    const statusDistribution = schedules.reduce((acc: Record<string, number>, schedule) => {
      const status = schedule.status || 'agendado';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Exam type distribution
    const examTypeDistribution = schedules.reduce((acc: Record<string, number>, schedule) => {
      if (schedule.tipo_exame) {
        acc[schedule.tipo_exame] = (acc[schedule.tipo_exame] || 0) + 1;
      }
      return acc;
    }, {});

    // Payment distribution
    const paymentDistribution = schedules.reduce((acc: Record<string, number>, schedule) => {
      if (schedule.forma_pagamento) {
        acc[schedule.forma_pagamento] = (acc[schedule.forma_pagamento] || 0) + 1;
      }
      return acc;
    }, {});

    // Origin distribution
    const originDistribution = schedules.reduce((acc: Record<string, number>, schedule) => {
      if (schedule.origem) {
        acc[schedule.origem] = (acc[schedule.origem] || 0) + 1;
      }
      return acc;
    }, {});

    // Category distribution
    const categoryDistribution = schedules.reduce((acc: Record<string, number>, schedule) => {
      if (schedule.categoria) {
        acc[schedule.categoria] = (acc[schedule.categoria] || 0) + 1;
      }
      return acc;
    }, {});

    // Hour distribution (heatmap data)
    const hourDistribution = schedules.reduce((acc: Record<string, number>, schedule) => {
      if (schedule.horario) {
        const hour = schedule.horario.split(':')[0];
        acc[hour] = (acc[hour] || 0) + 1;
      }
      return acc;
    }, {});

    // Top hours
    const topHours = Object.entries(hourDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([hour, count]) => ({ hour: `${hour}:00`, count }));

    // Weekly timeline
    const now = new Date();
    const weekStart = startOfWeek(now, { locale: ptBR });
    const weekEnd = endOfWeek(now, { locale: ptBR });
    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const weeklyTimeline = daysOfWeek.map((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const count = schedules.filter((schedule) => {
        if (!schedule.dia) return false;
        try {
          const scheduleDate = typeof schedule.dia === 'string' ? parseISO(schedule.dia) : schedule.dia;
          return format(scheduleDate, 'yyyy-MM-dd') === dayStr;
        } catch {
          return false;
        }
      }).length;

      return {
        day: format(day, 'EEE', { locale: ptBR }),
        fullDate: format(day, 'dd/MM', { locale: ptBR }),
        count,
      };
    });

    // Average per day
    const uniqueDays = new Set(
      schedules
        .filter((s) => s.dia)
        .map((s) => {
          try {
            const date = typeof s.dia === 'string' ? parseISO(s.dia) : s.dia;
            return date ? format(date, 'yyyy-MM-dd') : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    );
    const averagePerDay = uniqueDays.size > 0 ? schedules.length / uniqueDays.size : 0;

    return {
      totalSchedules: schedules.length,
      statusDistribution,
      examTypeDistribution,
      paymentDistribution,
      originDistribution,
      categoryDistribution,
      hourDistribution,
      weeklyTimeline,
      topHours,
      averagePerDay: Math.round(averagePerDay * 10) / 10,
    };
  }, [schedules]);

  return analytics;
};
