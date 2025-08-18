import { useMutation } from "@tanstack/react-query";
import { updateSchedule } from "../services";

interface IUpdateHorario {
  id: string;
  body: { horarioStart?: string, horarioEnd?: string, intervalo?: string, intervaloThreshold?: string, isClosed?: boolean }
}

const useUpdateHorario = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['update-horario'],
    mutationFn: (body: IUpdateHorario) => updateSchedule(body.id, body.body)
  })

  return { mutate, isPending, data, isError }
}

export default useUpdateHorario
