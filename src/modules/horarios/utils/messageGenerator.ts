import { format, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { generateTimeSlots } from "@/core/utils/time";

export interface ISchedule {
  id: string;
  dia: string;
  horarioStart: string;
  horarioEnd: string;
  intervalo: string;
  intervaloThreshold: string;
  isClosed?: boolean;
}

export const generateWhatsAppMessage = async (schedule: ISchedule): Promise<string> => {
  const formattedDate = format(addHours(schedule.dia, 3), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  
  // Se o dia está fechado, retorna mensagem específica
  if (schedule.isClosed) {
    const message = `📅 *CAC do Vale - Dia Fechado*

🗓️ *Data:* ${formattedDate}
❌ *Status:* Sem expediente

📍 *Endereço:* Rua Erich Steinbach, 22 - Itoupava Seca

---
*CAC do Vale - Agendamentos*`;

    return message;
  }

  const intervalThresholdFormatted = `${schedule.intervaloThreshold}:00`;
  const availableSlots = generateTimeSlots(
    schedule.horarioStart,
    schedule.horarioEnd,
    [],
    schedule.intervalo,
    intervalThresholdFormatted
  );

  const availableHours = availableSlots
    .filter(slot => slot.available)
    .map(slot => slot.time);

  const morningHours = availableHours.filter(hour => parseInt(hour.split(':')[0]) < 12);
  const afternoonHours = availableHours.filter(hour => parseInt(hour.split(':')[0]) >= 12);

  const formatHoursList = (hours: string[]) => {
    if (hours.length === 0) return "Nenhum horário disponível";
    return hours.join(", ");
  };

  const totalAvailableHours = availableHours.length;
  const hasMorningHours = morningHours.length > 0;
  const hasAfternoonHours = afternoonHours.length > 0;

  const message = `📅 *Horários Disponíveis - CAC do Vale*

🗓️ *Data:* ${formattedDate}
⏰ *Horário de funcionamento:* ${schedule.horarioStart} às ${schedule.horarioEnd}
☕ *Intervalo:* ${schedule.intervalo}

🕐 *Horários disponíveis (${totalAvailableHours} opções):*

${hasMorningHours ? `🌅 *Manhã:* ${formatHoursList(morningHours)}` : ''}

${hasAfternoonHours ? `🌆 *Tarde:* ${formatHoursList(afternoonHours)}` : ''}
${!hasMorningHours && !hasAfternoonHours ? '❌ *Nenhum horário disponível neste dia*' : ''}

📍 *Endereço:* Rua Erich Steinbach, 22 - Itoupava Seca

---
*CAC do Vale - Agendamentos*`;

  return message;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Erro ao copiar para a área de transferência:', error);
    return false;
  }
}; 