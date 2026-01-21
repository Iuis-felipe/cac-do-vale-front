import { ReactNode } from "react";
import { Activity, AlertCircle, CheckCircle2, Hourglass } from "lucide-react";

interface IStatusConfig {
  label: string;
  color: string;
  icon: ReactNode;
}

export const STATUS_CONFIG: Record<string, IStatusConfig> = {
  pending: {
    label: "Pendente",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: <Hourglass className="size-3" />,
  },
  done: {
    label: "Concluído",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    icon: <CheckCircle2 className="size-3" />,
  },
  canceled: {
    label: "Cancelado",
    color: "bg-rose-100 text-rose-700 border-rose-200",
    icon: <AlertCircle className="size-3" />,
  },
  default: {
    label: "Agendado",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: <Activity className="size-3" />,
  },
};
