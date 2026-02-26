import { ReactNode } from "react";
import { Activity, AlertCircle, CheckCircle2, Hourglass } from "lucide-react";

interface IStatusConfig {
  label: string;
  icon: ReactNode;
}

export const STATUS_CONFIG: Record<string, IStatusConfig> = {
  pending: {
    label: "Pendente",
    icon: <Hourglass size={12} />,
  },
  done: {
    label: "Concluído",
    icon: <CheckCircle2 size={12} />,
  },
  canceled: {
    label: "Cancelado",
    icon: <AlertCircle size={12} />,
  },
  default: {
    label: "Agendado",
    icon: <Activity size={12} />,
  },
};
