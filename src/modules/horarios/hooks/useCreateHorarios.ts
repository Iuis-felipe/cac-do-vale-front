import { useMutation } from "@tanstack/react-query";
import { createSchedule } from "../services";

interface ICreateHorarios {
  dia: string;
  horarioStart: string;
  horarioEnd: string;
  intervalo: string;
  intervaloThreshold: string;
  isHoliday: boolean;
}

const useCreateHorarios = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['create-horarios'],
    mutationFn: (body: ICreateHorarios) => createSchedule(body)
  })

  return { mutate, isPending, data, isError }
}

export default useCreateHorarios
