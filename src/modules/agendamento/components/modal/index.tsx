import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Modal from "@/core/components/organism/Modal";
import useUpdateScheduleStatus from "../../hook/useUpdateScheduleStatus";
import { Eye, Loader2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useEffect } from "react";

interface IActionModalProps {
  scheduleId: string | undefined;
  isOpen: boolean;
  handleCloseModalActions: () => void;
  reloadData: () => void;
}

const ActionModal: React.FC<IActionModalProps> = ({ scheduleId, isOpen, handleCloseModalActions, reloadData }) => {
  const navigate = useNavigate()
  const { mutate, isPending, isError, error, isSuccess } = useUpdateScheduleStatus()

  const handleConfirmAgendamento = () => {
    if (!scheduleId) return

    mutate({ id: scheduleId, status: "confirmado" })
  }

  const handleCancelAgendamento = () => {
    if (!scheduleId) return

    mutate({ id: scheduleId, status: "cancelado" })
  }

  const handleEditAgendamento = () => {
    navigate(`/agendamento/update/${scheduleId}`)
  }

  const handleVisualizarAgendamento = () => {
    navigate(`/agendamento/${scheduleId}`)
  }

  useEffect(() => {
    if (isSuccess) {
      reloadData()
      toast.success("Status do agendamento atualizado com sucesso", {
        onAutoClose: () => {
          handleCloseModalActions()
        }
      })
    }
  }, [isSuccess])

  useEffect(() => { 
    if (isError) {
      toast.error("Erro ao atualizar status do agendamento", {
        description: error?.message || "Erro ao atualizar o status do agendamento, procure o suporte por favor."
      })
    }
  }, [isError, error])

  return (
    <Modal isOpen={isOpen} title="Ações do Agendamento" onClose={handleCloseModalActions}>
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Status do agendamento</AccordionTrigger>
            <AccordionContent className="flex flex-row items-center gap-2">
              <button 
                disabled={isPending}
                onClick={handleConfirmAgendamento}
                className="w-1/3 py-2 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2"
              >
                {isPending ? <Loader2Icon className="size-5 animate-spin" /> : "Confirmar"}
              </button>
              <button 
                disabled={isPending}
                onClick={handleCancelAgendamento}
                className="w-1/3 py-2 cursor-pointer bg-red-400 text-white rounded-md flex flex-row items-center justify-center gap-2"
              >
                {isPending ? <Loader2Icon className="size-5 animate-spin" /> : "Cancelar"}
              </button>
              <button 
                disabled={isPending}
                onClick={handleEditAgendamento}
                className="w-1/3 py-2 cursor-pointer bg-blue-400 text-white rounded-md flex flex-row items-center justify-center gap-2"
              >
                {isPending ? <Loader2Icon className="size-5 animate-spin" /> : "Editar"}
              </button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Adicionar prontuário</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row items-center gap-2">
                <input type="file" className="hidden" />
                <label htmlFor="file" className="py-2 px-4 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center gap-2">
                  <PlusIcon className="size-5"/>
                  <p className="text-sm font-semibold">Adicionar prontuário</p>
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button 
          onClick={handleVisualizarAgendamento}
          className="w-full py-2 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2 mt-4"
        >
          <Eye className="size-5"/>
          <p className="text-sm font-semibold">Visualizar agendamento</p>
        </button>
      </div>
    </Modal>
  )
}

export default ActionModal;