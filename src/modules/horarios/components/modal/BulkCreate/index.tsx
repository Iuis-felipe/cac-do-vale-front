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

  const handleDeleteSchedule = () => {
    createSchedule({ period: periods.toString(), body: { start: inicio, end: fim } }, {
      onSuccess: () => {
        reloadData()
        toast.success("Periodo de horarios de atendimento criado com sucesso", {
          duration: 3000,
          onAutoClose: () => {
            onClose()
          }
        })
      },
      onError: (error) => {
        toast.error("Erro ao criar periodo de horarios de atendimento", {
          duration: 3000,
          description: error?.message || "Erro ao criar periodo de horarios de atendimento, procure o suporte por favor."
        })
      }
    })
  }
    
  return (
    <Modal size="w-[40%]" isOpen={isOpen} title="Gerar horarios de atendimento" onClose={onClose}>
      <div>
        <p className="text-sm font-semibold">Crie um lote de horarios de atendimento</p>
        <p className="text-xs text-gray-500">O horario de atendimento será criado a partir da data do último dia cadastrado</p>
        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          <div>
            <p>Periodo de dias</p>
            <input type="number" value={periods} onChange={(e) => setPeriods(Number(e.target.value))} className="w-full px-4 py-2 rounded-md border border-gray-200"/>
          </div>
          <div>
            <p>Inicio</p>
            <input type="time" value={inicio} onChange={(e) => setInicio(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-200"/>
          </div>
          <div>
            <p>Fim</p>
            <input type="time" value={fim} onChange={(e) => setFim(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-200"/>
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
            onClick={handleDeleteSchedule}
            className="w-fit py-2 px-4 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2"
          >
            {loadingCreate && <Loader2Icon className="size-5 animate-spin" />}
            <p className="text-sm font-semibold">Gerar horarios</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleBulkCreateModal
