import { useMutation } from "@tanstack/react-query";
import { buildSchedule, createWeekdaySchedules } from "../services";

interface ICreateBulkHorarios {
  period: string;
  body: { start?: string, end: string }
}

interface ICreateWeekdayHorarios {
  dates: string[];
  body: { start?: string, end: string }
}

const useCreateBulkHorarios = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['create-bulk-horarios'],
    mutationFn: (body: ICreateBulkHorarios) => buildSchedule(body.period, body.body)
  })

  return { mutate, isPending, data, isError }
}

export const useCreateWeekdayHorarios = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['create-weekday-horarios'],
    mutationFn: (body: ICreateWeekdayHorarios) => createWeekdaySchedules(body.dates, body.body)
  })

  return { mutate, isPending, data, isError }
}

export default useCreateBulkHorarios
