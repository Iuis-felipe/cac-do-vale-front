import { useMutation } from "@tanstack/react-query";
import { buildSchedule } from "../services";

interface ICreateBulkHorarios {
  period: string;
  body: { start?: string, end?: string, isHoliday?: boolean }
}

const useCreateBulkHorarios = () => {
  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ['create-bulk-horarios'],
    mutationFn: (body: ICreateBulkHorarios) => buildSchedule(body.period, body.body)
  })

  return { mutate, isPending, data, isError }
}

export default useCreateBulkHorarios
