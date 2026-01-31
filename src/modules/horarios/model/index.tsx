export interface ISchedule {
  id: string;
  dia: string;
  horarioStart: string;
  horarioEnd: string;
  intervalo: string;
  intervaloThreshold: string;
  isHoliday: boolean;
  isRecess: boolean;
}

export interface ICreateBulkHorarios {
  start?: string,
  end?: string,
  isHoliday?: boolean,
  isRecess?: boolean
}

export interface ICreateHorarios {
  dia: string;
  horarioStart: string;
  horarioEnd: string;
  intervalo: string;
  intervaloThreshold: string;
  isHoliday: boolean;
  isRecess: boolean;
}

export interface IUpdateHorarios {
  dia?: string;
  horarioStart?: string;
  horarioEnd?: string;
  intervalo?: string;
  intervaloThreshold?: string;
  isHoliday?: boolean;
  isRecess?: boolean;
}