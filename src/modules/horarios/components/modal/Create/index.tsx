import Modal from "@/core/components/organism/Modal";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useCreateHorarios from "@/modules/horarios/hooks/useCreateHorarios";
import useUpdateHorario from "@/modules/horarios/hooks/useUpdateHorario";
import { InputMask } from "@react-input/mask";

interface IActionModalProps {
  schedule?: IScheduleForm;
  isOpen: boolean;
  handleCloseModalActions: () => void;
  reloadData: () => void;
}

interface IScheduleForm {
  id?: string;
  dia?: string;
  horarioStart?: string;
  horarioEnd?: string;
  intervalo?: string;
  intervaloThreshold?: string;
}

const ScheduleFormModal: React.FC<IActionModalProps> = ({ schedule, isOpen, handleCloseModalActions, reloadData }) => {
  const { mutate: createSchedule, isPending: loadingCreate } = useCreateHorarios()
  const { mutate: updateSchedule, isPending: loadingUpdate } = useUpdateHorario()

  const [form, setForm] = useState<IScheduleForm>({
    dia: "",
    horarioStart: "",
    horarioEnd: "",
    intervalo: "",
    intervaloThreshold: ""
  })

  useEffect(() => {
    if (schedule) {
      setForm({
        dia: schedule.dia,
        horarioStart: schedule.horarioStart,
        horarioEnd: schedule.horarioEnd,
        intervalo: schedule.intervalo,
        intervaloThreshold: schedule.intervaloThreshold
      })
    }
  }, [schedule])

  const handleCreateSchedule = (data: IScheduleForm) => {
    if (!data.dia || !data.horarioStart || !data.horarioEnd || !data.intervalo || !data.intervaloThreshold) {
      toast.error("Preencha todos os campos")
      return
    }

    createSchedule({
      dia: data.dia,
      horarioStart: data.horarioStart,
      horarioEnd: data.horarioEnd,
      intervalo: data.intervalo,
      intervaloThreshold: data.intervaloThreshold
    }, {
      onSuccess: () => {
        reloadData()
        toast.success("Horário criado com sucesso", {
          onAutoClose: () => {
            handleCloseModal()
          }
        })
      },
      onError: (error) => {
        toast.error("Erro ao criar horário", {
          description: error?.message || "Erro ao criar horário, procure o suporte por favor."
        })
      }
    })
  }

  const handleUpdateSchedule = (data: IScheduleForm) => {
    updateSchedule({ id: schedule?.id || "", body: {
      horarioStart: data.horarioStart,
      horarioEnd: data.horarioEnd,
      intervalo: data.intervalo,
      intervaloThreshold: data.intervaloThreshold
    } }, {
      onSuccess: () => {
        reloadData()
        toast.success("Horário atualizado com sucesso", {
          onAutoClose: () => {
            handleCloseModal()
          }
        })
      },
      onError: (error) => {
        toast.error("Erro ao atualizar horário", {
          description: error?.message || "Erro ao atualizar horário, procure o suporte por favor."
        })
      }
    })
  }

  const handleCloseModal = () => {
    setForm({
      dia: "",
      horarioStart: "",
      horarioEnd: "",
      intervalo: "",
      intervaloThreshold: ""
    })

    handleCloseModalActions()
  }

  return (
    <Modal size="w-[40%]" isOpen={isOpen} title={schedule ? "Editar horário" : "Criar horário"} onClose={handleCloseModal}>
      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 mt-2">
            <label htmlFor="dia" className="text-sm font-semibold">Dia</label>
            <input 
              type="date" 
              placeholder="Dia" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.dia ? new Date(form.dia).toISOString().split("T")[0] : ""} 
              onChange={(e) => setForm({ ...form, dia: e.target.value })}
            />
          </div>
          <div className="col-span-1 mt-2">
            <label htmlFor="horarioStart" className="text-sm font-semibold">Inicio</label>
            <InputMask
              id="horarioStart"
              mask="__:__"
              replacement={{ _: /\d/ }}
              type="time" 
              placeholder="Inicio" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.horarioStart} 
              onChange={(e) => setForm({ ...form, horarioStart: e.target.value })}
            />
          </div>
          <div className="col-span-1 mt-2">
            <label htmlFor="horarioEnd" className="text-sm font-semibold">Fim</label>
            <InputMask
              id="horarioEnd"
              mask="__:__"
              replacement={{ _: /\d/ }}
              type="time" 
              placeholder="Fim" 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={form.horarioEnd} 
              onChange={(e) => setForm({ ...form, horarioEnd: e.target.value })}
            />
          </div>
          <div className="col-span-1 mt-2">
            <label htmlFor="intervalo" className="text-sm font-semibold">Intervalo</label>
            <InputMask
              id="intervalo"
              mask="__:__"
              replacement={{ _: /\d/ }}
              type="time" 
              placeholder="Intervalo" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={form.intervalo} 
              onChange={(e) => setForm({ ...form, intervalo: e.target.value })}
            />
          </div>
          <div className="col-span-1 mt-2">
            <label htmlFor="intervaloThreshold" className="text-sm font-semibold">Duração do intervalo</label>
            <input
              type="number"
              placeholder="Duração do intervalo"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={form.intervaloThreshold}
              onChange={(e) => setForm({ ...form, intervaloThreshold: e.target.value })}
            />
          </div>
        </div>
        
        <div className="flex flex-row items-center justify-end gap-4 mt-10">
          <button 
            onClick={handleCloseModal}
            className="cursor-pointer text-red-600 text-sm"
          >
            Cancelar
          </button>
          <button   
            onClick={() => schedule ? handleUpdateSchedule(form) : handleCreateSchedule(form)}
            className="w-fit py-2 px-4 cursor-pointer bg-blue-800 text-white rounded-md flex flex-row items-center justify-center gap-2"
          >
            {loadingCreate || loadingUpdate && <Loader2Icon className="size-5 animate-spin" />}
            <p className="text-sm font-semibold">{schedule ? "Atualizar" : "Criar"}</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ScheduleFormModal;