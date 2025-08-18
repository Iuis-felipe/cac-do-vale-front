export interface ISchedule {
  id: string;
  dia: string;
  horarioStart: string;
  horarioEnd: string;
  intervalo: string;
  intervaloThreshold: string;
  isClosed?: boolean;
}