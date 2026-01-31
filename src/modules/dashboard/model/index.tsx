export interface ScheduleItem {
  id: string | number;
  nome_civil: string;
  dia?: string;
  horario?: string;
  status?: string;
  [key: string]: any;
}

export type ViewType = "grid" | "list";
