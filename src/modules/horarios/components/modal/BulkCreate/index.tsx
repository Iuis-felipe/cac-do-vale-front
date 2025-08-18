import Modal from "@/core/components/organism/Modal";
import useCreateBulkHorarios from "@/modules/horarios/hooks/useCreateBulkHorarios";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface IBulkCreateModalProps {
  isOpen: boolean;
  reloadData: () => void;
  onClose: () => void;
}

const ScheduleBulkCreateModal: React.FC<IBulkCreateModalProps> = ({ isOpen, reloadData, onClose }) => {
  const { mutate: createSchedule, isPending: loadingCreate } = useCreateBulkHorarios()

  const [periods, setPeriods] = useState<number>(1)
  const [inicio, setInicio] = useState<string>("08:00")
  const [fim, setFim] = useState<string>("18:00")
  const [isClosed, setIsClosed] = useState<boolean>(false)

  const handleCreateSchedule = () => {
    if (isClosed) {
      createSchedule({ period: periods.toString(), body: { start: "00:00", end: "00:00" } }, {
        onSuccess: () => {
          reloadData()
          toast.success("Período de dias fechados criado com sucesso", {
            onAutoClose: () => {
              onClose()
            }
          })
        },
        onError: (error: any) => {
          console.error("Erro ao criar período de dias fechados:", error)
          toast.error("Erro ao criar período de dias fechados", {
            description: error?.response?.data?.message || error?.message || "Erro ao criar período de dias fechados, procure o suporte por favor."
          })
        }
      })
    } else {
      createSchedule({ period: periods.toString(), body: { start: inicio, end: fim } }, {
        onSuccess: () => {
          reloadData()
          toast.success("Período de horários de atendimento criado com sucesso", {
            onAutoClose: () => {
              onClose()
            }
          })
        },
        onError: (error: any) => {
          console.error("Erro ao criar período de horários:", error)
          toast.error("Erro ao criar período de horários de atendimento", {
            description: error?.response?.data?.message || error?.message || "Erro ao criar período de horários de atendimento, procure o suporte por favor."
          })
        }
      })
    }
  }
    
  return (
    <Modal size="w-[40%]" isOpen={isOpen} title="Gerar horários de atendimento" onClose={onClose}>
      <div>
        <p className="text-sm font-semibold">Crie um lote de horários de atendimento</p>
        <p className="text-xs text-gray-500">O horário de atendimento será criado a partir da data do último dia cadastrado</p>
        
        <div className="mt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isClosed}
              onChange={(e) => setIsClosed(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-semibold text-red-600">Marcar como dias sem expediente</span>
          </label>
          {isClosed && (
            <p className="text-xs text-gray-500 mt-1">
              Quando marcado, todos os dias do período serão marcados como fechados.
            </p>
          )}
        </div>

        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <div>
            <p>Período de dias</p>
            <input type="number" value={periods} onChange={(e) => setPeriods(Number(e.target.value))} className="w-full px-4 py-2 rounded-md border border-gray-200"/>
          </div>
          <div>
            <p>Inicio</p>
            <input 
              type="time" 
              value={inicio} 
              onChange={(e) => setInicio(e.target.value)} 
              className="w-full px-4 py-2 rounded-md border border-gray-200"
              disabled={isClosed}
            />
          </div>
          <div>
            <p>Fim</p>
            <input 
              type="time" 
              value={fim} 
              onChange={(e) => setFim(e.target.value)} 
              className="w-full px-4 py-2 rounded-md border border-gray-200"
              disabled={isClosed}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-4 mt-10">
          <button
            onClick={onClose}
            className="cursor-pointer text-blue-600 text-sm"
          >
            Cancelar
          </button>
          <button
            disabled={loadingCreate}
            onClick={handleCreateSchedule}
            className="w-fit py-2 px-4 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2"
          >
            {loadingCreate && <Loader2Icon className="size-5 animate-spin" />}
            <p className="text-sm font-semibold">{isClosed ? "Gerar dias fechados" : "Gerar horários"}</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleBulkCreateModal
