import { FC } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

const EmptyState: FC = () => (
  <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center bg-white">
    <div className="mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 size-12">
      <CalendarIcon className="size-6" />
    </div>
    <p className="text-sm font-medium text-gray-700">Nenhum agendamento encontrado</p>
    <p className="text-xs text-gray-500 mt-1">Os agendamentos aparecerão aqui assim que forem criados.</p>
  </div>
);

export default EmptyState;
