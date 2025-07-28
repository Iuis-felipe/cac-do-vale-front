import Modal from "@/core/components/organism/Modal";
import useDeleteHorario from "@/modules/horarios/hooks/useDeleteHorario";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

interface IDeleteModalProps {
  isOpen: boolean;
  scheduleId: string;
  reloadData: () => void;
  onClose: () => void;
}

const ScheduleDeleteModal: React.FC<IDeleteModalProps> = ({ isOpen, scheduleId, reloadData, onClose }) => {
  const { mutate: deleteSchedule, isPending: loadingDelete } = useDeleteHorario()

  const handleDeleteSchedule = () => {
    deleteSchedule(scheduleId, {
      onSuccess: () => {
        reloadData()
        toast.success("Horário deletado com sucesso", {
          duration: 3000,
          onAutoClose: () => {
            onClose()
          }
        })
      },
      onError: (error) => {
        toast.error("Erro ao deletar horário", {
          duration: 3000,
          description: error?.message || "Erro ao deletar horário, procure o suporte por favor."
        })
      }
    })
  }
    
  return (
    <Modal size="w-[40%]" isOpen={isOpen} title="Deletar horário" onClose={onClose}>
      <div>
        <p>Tem certeza que deseja deletar este horário?</p>
        <div className="flex flex-row items-center justify-end gap-4 mt-10">
          <button
            onClick={onClose}
            className="cursor-pointer text-red-600 text-sm"
          >
            Cancelar
          </button>
          <button
            disabled={loadingDelete}
            onClick={handleDeleteSchedule}
            className="w-fit py-2 px-4 cursor-pointer bg-red-800 text-white rounded-md flex flex-row items-center justify-center gap-2"
          >
            {loadingDelete && <Loader2Icon className="size-5 animate-spin" />}
            <p className="text-sm font-semibold">Deletar</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleDeleteModal
