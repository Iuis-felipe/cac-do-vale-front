import Modal from "@/core/components/organism/Modal";
import useCreateBulkHorarios from "@/modules/horarios/hooks/useCreateBulkHorarios";
import { Loader2Icon, CalendarRangeIcon, ClockIcon, AlertCircleIcon, InfoIcon, SparklesIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface IBulkCreateModalProps {
  isOpen: boolean;
  reloadData: () => void;
  onClose: () => void;
}

const ScheduleBulkCreateModal: React.FC<IBulkCreateModalProps> = ({ isOpen, reloadData, onClose }) => {
  const { mutate: createSchedule, isPending: loadingCreate } = useCreateBulkHorarios();

  const [periods, setPeriods] = useState<number>(1);
  const [inicio, setInicio] = useState<string>("08:00");
  const [fim, setFim] = useState<string>("18:00");
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const handleCreateSchedule = () => {
    createSchedule(
      { period: periods.toString(), body: { start: inicio, end: fim, isHoliday: isClosed || false } },
      {
        onSuccess: () => {
          reloadData();
          onClose();
          toast.success("Período de horários de atendimento criado com sucesso", {
            dismissible: true,
          });
        },
        onError: (error: any) => {
          console.error("Erro ao criar período de horários:", error);
          toast.error("Erro ao criar período de horários de atendimento", {
            dismissible: true,
            description:
              error?.response?.data?.message ||
              error?.message ||
              "Erro ao criar período de horários de atendimento, procure o suporte por favor.",
          });
        },
      }
    );
  };

  return (
    <Modal size="w-[45%]" isOpen={isOpen} title="Gerar Horários de Atendimento" onClose={onClose}>
      <div className="space-y-6">
        {/* Informação Principal */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <SparklesIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-purple-800 mb-1">Criação em Lote</p>
              <p className="text-xs text-purple-700">
                Crie múltiplos horários de atendimento de uma só vez. Os horários serão criados sequencialmente a partir
                do último dia cadastrado.
              </p>
            </div>
          </div>
        </div>

        {/* Seção de Período */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <CalendarRangeIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-gray-700">Configuração do Período</h3>
          </div>
          <div>
            <label htmlFor="periods" className="text-sm font-medium text-gray-600 mb-1 block">
              Quantidade de dias
            </label>
            <div className="relative">
              <input
                id="periods"
                type="number"
                min="1"
                max="365"
                value={periods}
                onChange={(e) => setPeriods(Number(e.target.value))}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Ex: 30"
              />
              <CalendarRangeIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {periods === 1 ? "Será criado 1 dia de atendimento" : `Serão criados ${periods} dias de atendimento`}
            </p>
          </div>
        </div>

        {/* Seção de Horários */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <ClockIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-sm font-bold text-gray-700">Horários de Funcionamento</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="inicio" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>Início</span>
                {inicio && !isClosed && <span className="text-xs text-green-600">({inicio})</span>}
              </label>
              <div className="relative">
                <input
                  id="inicio"
                  type="time"
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isClosed}
                />
                <ClockIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label htmlFor="fim" className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>Fim</span>
                {fim && !isClosed && <span className="text-xs text-green-600">({fim})</span>}
              </label>
              <div className="relative">
                <input
                  id="fim"
                  type="time"
                  value={fim}
                  onChange={(e) => setFim(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isClosed}
                />
                <ClockIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Dica de Informação */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1">Importante</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Os horários padrão serão aplicados a todos os dias do período</li>
                <li>• Você poderá editar individualmente cada dia após a criação</li>
                <li>• O intervalo padrão será configurado automaticamente</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Opção de Dias Fechados */}
        <div
          className={`${
            isClosed ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-200" : "bg-gray-50 border-gray-200"
          } border rounded-lg p-4 transition-all duration-300`}
        >
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isClosed}
              onChange={(e) => setIsClosed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer transition-all"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <AlertCircleIcon
                  className={`w-5 h-5 ${isClosed ? "text-red-600" : "text-gray-400"} transition-colors`}
                />
                <span className={`text-sm font-bold ${isClosed ? "text-red-700" : "text-gray-600"} transition-colors`}>
                  Marcar como dias sem expediente
                </span>
              </div>
              <p className={`text-xs mt-1 ${isClosed ? "text-red-600" : "text-gray-500"} transition-colors`}>
                {isClosed
                  ? "⚠️ Todos os dias do período serão marcados como fechados e não aparecerão para agendamento"
                  : "Marque esta opção para criar um período de férias ou feriados prolongados"}
              </p>
            </div>
          </label>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateSchedule}
            disabled={loadingCreate || periods < 1}
            className={`
              px-6 py-2.5 rounded-lg font-semibold text-sm text-white
              flex items-center justify-center gap-2 min-w-[160px]
              transition-all duration-200 transform cursor-pointer
              ${
                loadingCreate || periods < 1
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {loadingCreate ? (
              <>
                <Loader2Icon className="w-4 h-4 animate-spin" />
                <span>Gerando...</span>
              </>
            ) : (
              <span>{isClosed ? "Gerar Dias Fechados" : "Gerar Horários"}</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleBulkCreateModal;
